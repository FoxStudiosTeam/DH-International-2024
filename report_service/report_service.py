import sqlite3
import uuid
from datetime import datetime

from .db_utils import *
from .api_utils import *
from domain.models import Report, Message, ReportRequest


class ReportService:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)


    def get_reports(self) -> Response:
        cur = init_cursor(self.conn)
        try:
            query = cur.execute("SELECT * FROM reports")
            prepared_data = query.fetchall()
            result: list[Report] = []
            for row in prepared_data:
                report = Report(row[0], row[1], row[2])
                result.append(report)
                cur.close()
            return wrap_answer(result)
        except sqlite3.OperationalError:
            migrate(cur)
            return self.get_reports()

    def get_report(self, uid) -> Response:
        cur = init_cursor(self.conn)
        try:
            cur.execute("SELECT * FROM reports WHERE uid=? LIMIT 1", (uid,))
            row = cur.fetchone()
            cur.close()
            return wrap_answer(Report(row[0], row[1], row[2]))
        except sqlite3.OperationalError:
            migrate(cur)
            return self.get_report(uid)
        except TypeError:
            return wrap_answer(Message("NotFound"))

    def create_report(self) -> Response:
        cur = init_cursor(self.conn)
        uid = str(uuid.uuid4())
        date = datetime.now()
        title = f"Отчёт от {date.date()}"

        try:
            cur.execute("INSERT INTO reports (uid, title, create_date) VALUES (?,?,?)", (uid, title,str(date)))
            cur.fetchone()
            cur.close()
            self.conn.commit()
            report = Report(uid, title, str(date))
            return wrap_answer(report)
        except sqlite3.OperationalError:
            migrate(cur)
            return self.create_report()

    def delete_report(self, uid) -> Response:
        cur = init_cursor(self.conn)
        try:
            cur.execute("DELETE FROM report_data where report_uid = ?", (uid,))
            cur.execute("DELETE FROM reports where uid = ?", (uid,))
            cur.fetchall()
            cur.close()
            self.conn.commit()
            message = Message(f"deleted - {uid}")
            return wrap_answer(message)
        except sqlite3.OperationalError:
            migrate(cur)
            return self.delete_report(uid)

    def update_report(self, uid, raw_data) -> Response:
        cur = init_cursor(self.conn)
        data = json.loads(raw_data)
        report = ReportRequest(title=data.get('title'))
        try:
            cur.execute("UPDATE reports SET title = ? WHERE uid = ?", (report.title,uid))
            cur.fetchone()
            cur.close()
            self.conn.commit()
            return self.get_report(uid)
        except sqlite3.OperationalError:
            migrate(cur)
            return self.update_report(uid, raw_data)
