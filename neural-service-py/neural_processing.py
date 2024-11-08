from zipfile import ZipFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
import json
import cv2
import numpy as np
import math


# output to json
def output(report: list[dict]):
    print(json.dumps(report))

#func to bboxes
def parse_result(data: list[Results]):
    boxes: list[list] = []
    for box in data.boxes:
        x,y,w,h = map(float, box.xywhn.cpu().numpy().reshape(-1))
        name = data.names[int(box.cls)]
        boxes.append([name,[x,y,w,h]])
    return boxes

#processing zip file
def processing():

    #path to zip file
    zip_path = "./neural-service-py/Артём.zip"
    

    #path to model
    model_path = "./neural-service-py/best (2).pt"

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
                        # cv2.imshow("pivo", img)
                        # cv2.waitKey(0)
                        # cv2.destroyAllWindows()
                        results = model.predict(img)[0]
                        boxes = parse_result(results)

                        #add info to report
                        for box in boxes:
                            report.append({"name":f"{file_name.split('/')[-1]}", "BBox":box[1],"Class":box[0]})
                    else:
                        print(f"Нет изображения в {file_name}")
    output(report)

#test
processing()