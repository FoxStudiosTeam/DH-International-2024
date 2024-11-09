import sqlite3

from neural_service_py.neural_processing import Process


class NeuralServiceImpl:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)
        self.process = Process()
    def test(self):
        print(self.process.start_time)