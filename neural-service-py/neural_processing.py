from zipfile import ZipFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
import json
import cv2
import numpy as np
import time

start_time = time.time()

# output to json
def output(report: list[dict]):
    json.dumps(report)
    for row in report:
        print(json.dumps(row))
    print(f"Занятое время: {(time.time()-start_time)} сек")

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
    count = 0
    batch = 0
    images = []
    img_names = []

    #open zip
    with ZipFile(zip_path, "r") as zip_file:

        #file traversal
        for file_name in zip_file.namelist():

            #check to img
            if file_name.endswith((".png",".jpg",".jpeg")):
                with zip_file.open(file_name) as file:
                    file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                    if image is not None:
                        batch += 1
                        images.append(image)
                        img_names.append(file_name)
                        if batch < 10 and file_name!=zip_file.namelist()[-1]:
                            continue
                        batch = 0
                        # img_batch = torch.stack(images)
                        last_time = time.time()
                        results_batch = model.predict(images)
                        for img, results, img_name in zip(images,results_batch,img_names):
                            boxes = parse_result(results, img)
                            #add info to report
                            flag: bool = False
                            for box in boxes:
                                img_width = img.shape[1]
                                img_heght = img.shape[0]
                                x1, x2 = int((box[1][0]-box[1][2]/2)*img_width), int((box[1][0]+box[1][2]/2)*img_width)
                                y1, y2 = int((box[1][1]-box[1][3]/2)*img_heght), int((box[1][1]+box[1][3]/2)*img_heght)
                                if x2-x1 < 128 or y2-y1 < 128:
                                    box[0]="bad"
                                    # print("\nbad")
                                cv2.rectangle(img,[x1,y1],[x2,y2],colors[box[0]],4)
                                cv2.putText(img,box[0],(x1-10,y1-10),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),4)
                                flag = True
                                report.append({"name":f"{img_name.split('/')[-1]}", "BBox":box[1],"Class":box[0]})
                            if flag:
                                print(img_name.split('/')[-1])
                                # img = cv2.resize(img,(620,480))
                                # cv2.imshow("pivo", img)
                                # cv2.waitKey(1)
                                # time.sleep(0.01)
                                # cv2.destroyAllWindows
                                flag = False
                        count+= len(images)
                        print(f"\n{int((time.time()-last_time)*1000)}мс\n\nОбработано: {count} фото")
                        images.clear()
                        img_names.clear()
                    else:
                        print(f"Нет изображения в {file_name}")
    output(report)

#test
processing()