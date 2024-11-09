import sqlite3

from domain import Message
from .api_utils import wrap_answer
from neural_service_py import neural_processing

class NeuralServiceImpl:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)
        self.process = neural_processing.Process()
    def upload_report(self, uid, form_data) -> bytes:
        if form_data['file'] is not None:
            result = self.process.processing(uid, form_data['file'].read())
            return wrap_answer(result)
        else:
            return wrap_answer(Message("NoFileFound"))