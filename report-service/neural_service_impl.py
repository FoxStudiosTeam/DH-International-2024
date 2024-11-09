import sqlite3

from db_utils import *

class NeuralServiceImpl:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)


    def upload_report(self, uid:str, data):
        cur = self.conn.cursor()
        try:
            print("")
        except sqlite3.OperationalError:
            migrate(cur)
            return self.upload(uid,data)