from zipfile import ZipFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
import json
import cv2
import numpy as np
import time


# output to json
def output(report: list[dict]):
    json.dumps(report)
    for row in report:
        print(json.dumps(row))

#func to bboxes
def parse_result(data: list[Results], img:cv2.typing.MatLike):
    boxes: list[list] = []
    for box in data.boxes:
        x,y,w,h = map(float, box.xywhn.cpu().numpy().reshape(-1))
        name = data.names[int(box.cls)]
        boxes.append([name,[x,y,w,h]])
    return boxes

#processing zip file
def processing():

    colors = {" good": [0,255,0], "bad": [0,0,255]}

    #path to zip file
    zip_path = "./neural-service-py/images1.zip"
    

    #path to model
    model_path = "./neural-service-py/best(2).pt"

    model : YOLO = YOLO(model_path)
    report: list[dict] = []

    #open zip
    with ZipFile(zip_path, "r") as zip_file:

        #file traversal
        for file_name in zip_file.namelist():

            #check to img
            if file_name.endswith((".png",".jpg",".jpeg")):
                with zip_file.open(file_name) as file:
                    file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                    if img is not None:
                        results = model.predict(img)[0]
                        boxes = parse_result(results, img)
                        #add info to report
                        flag: bool = False
                        for box in boxes:
                            report.append({"name":f"{file_name.split('/')[-1]}", "BBox":box[1],"Class":box[0]})
                            img_width = img.shape[1]
                            img_heght = img.shape[0]
                            x1, x2 = int((box[1][0]-box[1][2]/2)*img_width), int((box[1][0]+box[1][2]/2)*img_width)
                            y1, y2 = int((box[1][1]-box[1][3]/2)*img_heght), int((box[1][1]+box[1][3]/2)*img_heght)
                            cv2.rectangle(img,[x1,y1],[x2,y2],colors[box[0]],4)
                            cv2.putText(img,box[0],(x1-10,y1-10),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),4)
                            flag = True
                        if flag:
                            print(file_name.split('/')[-1])
                            img = cv2.resize(img,(620,480))
                            cv2.imshow("pivo", img)
                            cv2.waitKey(1)
                            time.sleep(0.5)
                            cv2.destroyAllWindows
                            flag = False
                    else:
                        print(f"Нет изображения в {file_name}")
    output(report)

#test
processing()