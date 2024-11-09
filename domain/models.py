import json
import uuid
from datetime import datetime


class Report:
    def __init__(self, uid,  title, create_date):
        self.uid = uid
        self.title = title
        self.create_date = create_date

class ReportRequest:
    def __init__(self, title):
        self.title = title

class Message:
    def __init__(self, message):
        self.message = message

class ReportUnit:
    def __init__(self, file_name:str, result:list, report_uid) -> None:
        self.uid:str = str(uuid.uuid4())
        self.report_uid:str = report_uid
        self.data_upload:str = str(datetime.now())
        self.file_path:str = file_name
        self.class_num:str = "0" if result[0] == "bad" else "1"
        self.confidence:float = round(result[2],2)
        self.Name:str = file_name.split('/')[-1]
        self.BBox:list[float] = result[1]
        self.Class:str = "0" if result[0] == "bad" else "1"

class ReportRow:
    def __init__(self, uid, data_upload, file_path, class_num,confidence, report_uid):
        self.uid:str = uid
        self.data_upload:str = data_upload
        self.file_path:str = file_path
        self.class_num:str = class_num
        self.confidence:float = confidence
        self.report_uid:str = report_uid