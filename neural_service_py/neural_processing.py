import uuid
from zipfile import ZipFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
from datetime import datetime
import json
import cv2
import numpy as np
import time
from domain.models import ReportUnit

class Process():
    start_time = time.time()

    #output to csv
    def output_to_csv(self) -> str:
        report: list[ReportUnit] = self.processing("0")
        return report

    #output to report
    def output_to_report(self) -> str:
        report: list[ReportUnit] = self.processing("1")
        return report


    #private func to bboxes
    def parse_result(self, data: Results) -> list[list]:
            boxes: list[list] = []
            for box in data.boxes:
                x,y,w,h = map(float, box.xywhn.cpu().numpy().reshape(-1))
                name = data.names[int(box.cls)]
                conf = float(box.conf)
                boxes.append([name,[x,y,w,h],conf])
            return boxes

    #processing zip file, returns list of dicts
    def processing(self, report_uid:str) -> tuple[list[dict]]:

        #colors to bboxes
        colors = {" good": [0,255,0], "bad": [0,0,255]}

        #path to zip file
        zip_path = "./neural-service-py/images1.zip"

        #path to model
        model_path = "./neural-service-py/best(4).pt"
        
        model : YOLO = YOLO(model_path)
        report_csv: list[object] = []
        report: list[object] = []
        count: int = 0
        batch: int = 0
        images: list = []
        img_names: list[str] = []

        #open zip
        with ZipFile(zip_path, "r") as zip_file:

            #file traversal
            for file_name in zip_file.namelist():

                #check to img
                if file_name.endswith((".png",".jpg",".jpeg")):

                    #open img
                    with zip_file.open(file_name) as file:
                        if batch < 10:
                            batch+=1
                            file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                            image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                            images.append(image)
                            img_names.append(file_name)
                            continue
                        batch = 0
                        if image is not None:
                            last_time = time.time()

                            #images processing
                            results_batch = model.predict(images)
                            for img, results, img_name in zip(images,results_batch,img_names):
                                boxes = self.parse_result(results)
                                flag: bool = False
                                for box in boxes:

                                    #check to confidence
                                    if box[2]>0.7:
                                        img_width = img.shape[1]
                                        img_heght = img.shape[0]
                                        x1, x2 = int((box[1][0]-box[1][2]/2)*img_width), int((box[1][0]+box[1][2]/2)*img_width)
                                        y1, y2 = int((box[1][1]-box[1][3]/2)*img_heght), int((box[1][1]+box[1][3]/2)*img_heght)

                                        #image exclusion
                                        if x2-x1 < 128 or y2-y1 < 128:
                                            box[0]="bad"

                                        #box drawing
                                        cv2.rectangle(img,[x1,y1],[x2,y2],colors[box[0]],4)
                                        cv2.putText(img,f"{"0" if box[0] == "bad" else "1"} - {round(box[2],4)}",(x1+10,y1+30),cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,0),9)
                                        cv2.putText(img,f"{"0" if box[0] == "bad" else "1"} - {round(box[2],4)}",(x1+10,y1+30),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),4)

                                        #flag if boxes exist
                                        flag = True

                                        #add result dict to report list
                                        report.append({"path":f"{img_name}","class_name":"0" if box[0] == "bad" else "1","confidence":f"{round(box[2],2)}"})

                                #show img and pring file name
                                if flag:
                                    print("/".join(img_name.split('/')[-3:]))
                                    img = cv2.resize(img,(620,480))
                                    cv2.imshow("pivo", img)
                                    cv2.waitKey(1)
                                    time.sleep(2)
                                    cv2.destroyAllWindows
                                    flag = False

                            #print to test and cleaning lists of images
                            count+= len(images)
                            print(f"\n{int((time.time()-last_time)*1000)}мс\n\nОбработано: {count} фото")
                            images.clear()
                            img_names.clear()
                        else:
                            print(f"Нет изображения в {file_name}")


