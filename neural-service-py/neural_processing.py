from zipfile import ZipFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
import json
import cv2
import numpy as np
import time

start_time = time.time()

#output to csv
def output_to_csv() -> str:
    report: list[dict] = processing()[0]

    #print to test output
    for row in report:
        print(json.dumps(row))
    print(f"Занятое время: {(time.time()-start_time)} сек")

    #json string with {"name":"file name", "BBox": [Number x, y, w, h], "Class": "class name of bbox (0 or 1)"}
    return json.dumps(report)


#output to report
def output_to_report() -> str:
    report: list[dict] = processing()[1]

    #json string with {"name":"file name", "BBox": [Number x, y, w, h], "Class": "class name of bbox (0 or 1)"}
    return json.dumps(report)


#private func to bboxes
def parse_result(data: Results) -> list[list]:
    boxes: list[list] = []
    for box in data.boxes:
        x,y,w,h = map(float, box.xywhn.cpu().numpy().reshape(-1))
        name = data.names[int(box.cls)]
        conf = float(box.conf)
        boxes.append([name,[x,y,w,h],conf])
    return boxes

#processing zip file, returns list of dicts
def processing() -> tuple[list[dict]]:

    #colors to bboxes
    colors = {" good": [0,255,0], "bad": [0,0,255]}

    #path to zip file
    zip_path = "./neural-service-py/images1.zip"
    
    #path to model
    model_path = "./neural-service-py/best(3).pt"
    
    model : YOLO = YOLO(model_path)
    report_csv: list[dict] = []
    report: list[dict] = []
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

                    #grab img
                    file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                    if image is not None:

                        #collecting a batch of images
                        batch += 1
                        images.append(image)
                        img_names.append(file_name)
                        if batch < 10 and file_name!=zip_file.namelist()[-1]:
                            continue
                        batch = 0
                        last_time = time.time()

                        #images processing
                        results_batch = model.predict(images)
                        for img, results, img_name in zip(images,results_batch,img_names):
                            boxes = parse_result(results)
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
                                    report_csv.append({"name":f"{"/".join(img_name.split('/')[-3:])}", "BBox":box[1],"Class":"0" if box[0] == "bad" else "1" })
                                    report.append({"name":f"{"/".join(img_name.split('/')[-3:])}", "BBox":box[1],"Class":"0" if box[0] == "bad" else "1" })

                            #show img and pring file name
                            if flag:
                                print("/".join(img_name.split('/')[-3:]))
                                img = cv2.resize(img,(620,480))
                                cv2.imshow("pivo", img)
                                cv2.waitKey(0)
                                # time.sleep(2)
                                cv2.destroyAllWindows
                                flag = False

                        #print to test and cleaning lists of images
                        count+= len(images)
                        print(f"\n{int((time.time()-last_time)*1000)}мс\n\nОбработано: {count} фото")
                        images.clear()
                        img_names.clear()
                    else:
                        print(f"Нет изображения в {file_name}")

    return (report_csv, report)
#test
output_to_csv()
