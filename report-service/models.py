import json


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