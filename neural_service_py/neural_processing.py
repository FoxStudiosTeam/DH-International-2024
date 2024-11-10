import io
from zipfile import ZipFile
from rarfile import RarFile
from ultralytics import YOLO
from ultralytics.engine.results import Results
from domain.models import ReportUnit
import cv2
import numpy as np
import time


class Process:
    start_time = time.time()

    # private func to bboxes
    def parse_result(self, data: Results) -> list[list]:
        boxes: list[list] = []
        for box in data.boxes:
            x, y, w, h = map(float, box.xywhn.cpu().numpy().reshape(-1))
            name = data.names[int(box.cls)]
            conf = float(box.conf)
            boxes.append([name, [x, y, w, h], conf])
        return boxes

    # processing zip file, returns list of objects
    def processing_zip(self, report_uid: str, zip_file) -> list[object]:

        # colors to bboxes
        colors = {" good": [0, 255, 0], "bad": [0, 0, 255]}

        # path to zip file (in-memory)
        zip_path = io.BytesIO(zip_file)

        # path to model
        model_path = "./neural_service_py/14best.pt"

        model: YOLO = YOLO(model_path)
        report: list[ReportUnit] = []
        # count: int = 0
        batch: int = 0
        images: list = []
        img_names: list[str] = []

        # open zip
        with ZipFile(zip_path) as zip_file:
            # file traversal
            for file_name in zip_file.namelist():
                # check to img

                if file_name.endswith((".png", ".jpg", ".jpeg")):

                    # open img
                    with zip_file.open(file_name) as file:
                        batch += 1
                        file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                        images.append(image)
                        img_names.append(file_name)
                        if batch < 10 and file_name != zip_file.namelist()[-1]:
                            continue
                        batch = 0
                        if image is not None:
                            # last_time = time.time()

                            # images processing
                            results_batch = model.predict(images)
                            for img, results, img_name in zip(images, results_batch, img_names):
                                boxes = self.parse_result(results)
                                # flag: bool = False
                                for box in boxes:

                                    # check to confidence
                                    if box[2] >= 0.6:
                                        img_width = img.shape[1]
                                        img_heght = img.shape[0]
                                        x1, x2 = int((box[1][0] - box[1][2] / 2) * img_width), int(
                                            (box[1][0] + box[1][2] / 2) * img_width)
                                        y1, y2 = int((box[1][1] - box[1][3] / 2) * img_heght), int(
                                            (box[1][1] + box[1][3] / 2) * img_heght)

                                        # image exclusion
                                        if x2 - x1 < 128 or y2 - y1 < 128:
                                            box[0] = "bad"

                                        # box drawing
                                        if box[0] == 'bad':
                                            box_name = '0'
                                        else:
                                            box_name = '1'
                                        cv2.rectangle(img, [x1, y1], [x2, y2], colors[box[0]], 4)
                                        cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 9)
                                        cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 4)

                                        # flag if boxes exist
                                        # flag = True

                                        new_str = img_name
                                        # try:
                                        #     new_str = img_name.encode('cp437').decode('cp866')
                                        # except UnicodeDecodeError:
                                        #     new_str = img_name
                                        # add result dict to report list
                                        report.append(ReportUnit(new_str, box, report_uid))
                                        new_str = ""
                                # show img and pring file name
                                # if flag:
                                    # print("/".join(img_name.split('/')[-3:]))
                                    # img = cv2.resize(img, (620, 480))
                                    # cv2.imshow("pivo", img)
                                    # cv2.waitKey(1)
                                    # time.sleep(2)
                                    # cv2.destroyAllWindows()
                                    # flag = False

                            # print to test and cleaning lists of images
                            # count += len(images)
                            # print(f"\n{int((time.time() - last_time) * 1000)}мс\n\nОбработано: {count} фото")
                            images.clear()
                            img_names.clear()
                        else:
                            print(f"Нет изображения в {file_name}")
        return report

    # processing rar file, returns list of objects
    def processing_rar(self, report_uid: str, rar_file) -> list[object]:

        # colors to bboxes
        colors = {" good": [0, 255, 0], "bad": [0, 0, 255]}

        # path to rar file (in-memory)
        rar_path = io.BytesIO(rar_file)

        # path to model
        model_path = "./neural_service_py/best_23_54.pt"

        model: YOLO = YOLO(model_path)
        report: list[ReportUnit] = []
        # count: int = 0
        batch: int = 0
        images: list = []
        img_names: list[str] = []

        # open rar
        with RarFile(rar_path) as rar_file:

            # file traversal
            for file_name in rar_file.namelist():

                # check to img
                if file_name.endswith((".png", ".jpg", ".jpeg")):

                    # open img
                    with rar_file.open(file_name) as file:
                        batch += 1
                        file_bytes = np.asanyarray(bytearray(file.read()), dtype=np.uint8)
                        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
                        images.append(image)
                        img_names.append(file_name)
                        if batch < 10 and file_name != rar_file.namelist()[-1]:
                            continue
                        batch = 0
                        if image is not None:
                            # last_time = time.time()

                            # images processing
                            results_batch = model.predict(images)
                            for img, results, img_name in zip(images, results_batch, img_names):
                                boxes = self.parse_result(results)
                                # flag: bool = False
                                for box in boxes:

                                    # check to confidence
                                    if box[2] > 0.7:
                                        img_width = img.shape[1]
                                        img_heght = img.shape[0]
                                        x1, x2 = int((box[1][0] - box[1][2] / 2) * img_width), int(
                                            (box[1][0] + box[1][2] / 2) * img_width)
                                        y1, y2 = int((box[1][1] - box[1][3] / 2) * img_heght), int(
                                            (box[1][1] + box[1][3] / 2) * img_heght)

                                        # image exclusion
                                        if x2 - x1 < 128 or y2 - y1 < 128:
                                            box[0] = "bad"

                                        # box drawing
                                        if box[0] == 'bad':
                                            box_name = '0'
                                        else:
                                            box_name = '1'
                                        cv2.rectangle(img, [x1, y1], [x2, y2], colors[box[0]], 4)
                                        cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 9)
                                        cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 4)

                                        # flag if boxes exist
                                        # flag = True

                                        new_str = img_name
                                        # try:
                                        #     new_str = img_name.encode('cp437').decode('cp866')
                                        # except UnicodeDecodeError:
                                        #     new_str = img_name
                                        # add result dict to report list
                                        report.append(ReportUnit(new_str, box, report_uid))
                                        new_str = ""

                                # show img and pring file name
                                # if flag:
                                #     print("/".join(img_name.split('/')[-3:]))
                                    # img = cv2.resize(img, (620, 480))
                                    # cv2.imshow("pivo", img)
                                    # cv2.waitKey(1)
                                    # time.sleep(2)
                                    # cv2.destroyAllWindows()
                                    # flag = False

                            # print to test and cleaning lists of images
                            # count += len(images)
                            # print(f"\n{int((time.time() - last_time) * 1000)}мс\n\nОбработано: {count} фото")
                            images.clear()
                            img_names.clear()
                        else:
                            print(f"Нет изображения в {file_name}")
        return report

    def processing_img(self, report_uid: str, file, img_name) -> list[object]:

        # colors to bboxes
        colors = {" good": [0, 255, 0], "bad": [0, 0, 255]}

        # path to model
        model_path = "./neural_service_py/best_23_54.pt"

        model: YOLO = YOLO(model_path)
        report: list[ReportUnit] = []

        # open file

        file_bytes = np.fromstring(file,np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if img is not None:

            # images processing
            result = model.predict(img)[0]
            boxes = self.parse_result(result)
            # flag: bool = False
            for box in boxes:

                # check to confidence
                if box[2] > 0.7:
                    img_width = img.shape[1]
                    img_heght = img.shape[0]
                    x1, x2 = int((box[1][0] - box[1][2] / 2) * img_width), int(
                        (box[1][0] + box[1][2] / 2) * img_width)
                    y1, y2 = int((box[1][1] - box[1][3] / 2) * img_heght), int(
                        (box[1][1] + box[1][3] / 2) * img_heght)

                    # image exclusion
                    if x2 - x1 < 128 or y2 - y1 < 128:
                        box[0] = "bad"

                    # box drawing
                    if box[0] == 'bad':
                        box_name = '0'
                    else:
                        box_name = '1'
                    cv2.rectangle(img, [x1, y1], [x2, y2], colors[box[0]], 4)
                    cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 9)
                    cv2.putText(img, f"{box_name} - {round(box[2], 4)}", (x1 + 10, y1 + 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 4)

                    # flag if boxes exist
                    # flag = True

                    new_str = img_name
                    # try:
                    #     new_str = img_name.encode('cp437').decode('cp866')
                    # except UnicodeDecodeError:
                    #     new_str = img_name
                    # add result dict to report list
                    report.append(ReportUnit(new_str, box, report_uid))
                    new_str = ""

                # show img and pring file name
                # if flag:
                #     print(img_name)
                    # img = cv2.resize(img, (620, 480))
                    # cv2.imshow("pivo", img)
                    # cv2.waitKey(1)
                    # time.sleep(2)
                    # cv2.destroyAllWindows()
                    # flag = False
        else:
            print(f"Нет изображения в {img_name}")
        return report
