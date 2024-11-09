import sqlite3

from neural_service_py.neural_processing import Process
from domain.models import ReportUnit
from report_service.api_utils import wrap_answer


class NeuralServiceImpl:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)
        self.process = Process()
    def upload_report(self, uid, form_data) -> bytes:
        test = [ReportUnit("",[],"")]
        return wrap_answer(test)
