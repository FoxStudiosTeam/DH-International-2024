import sqlite3

from adodbapi import OperationalError
from db_utils import *
from api_utils import *

class ReportService:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db',check_same_thread=False)

    def init_cursor(self) -> sqlite3.Cursor:
        return self.conn.cursor()

    def get_reports(self):
        cur = self.init_cursor()
        try:
            result = cur.execute("SELECT * FROM reports")
            result = result.fetchall()
            return wrap_answer(result)
        except sqlite3.OperationalError:
            migrate(cur)
            return self.get_reports()
