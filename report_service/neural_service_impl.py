import sqlite3
from io import StringIO

from flask import Response

from domain import Message, ReportUnit
from domain.models import ReportRow
from .api_utils import wrap_answer
from neural_service_py import neural_processing
from .db_utils import *

import io
import csv


class NeuralServiceImpl:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)
        self.process = neural_processing.Process()

    def upload_report(self, uid, form_data) -> Response:
        files = form_data.getlist("file")
        response = None
        for file in files:
            if file.filename.endswith('.zip'):
                result = self.process.processing_zip(uid, file.read())
                response = self.write_report(result, uid)
            elif file.filename.endswith('.rar'):
                result = self.process.processing_rar(uid, file.read())
                response = self.write_report(result, uid)
            elif file.filename.endswith('.png') or file.filename.endswith('.jpg') or file.filename.endswith(
                    '.jpeg'):
                result = self.process.processing_img(uid, file.read(), file.filename)
                response = self.write_report(result, uid)

        if response is None:
            return self.send_response("File or files have incorrect extension.", 500)
        else:
            return response

    def list_to_str(self, in_list : list[object]) -> str:
        buff = ""
        for elem in in_list:
            buff += str(elem) + " "
        return buff



    def write_report(self, report_data: list[ReportUnit], uid: str) -> Response:
        cur = init_cursor(self.conn)
        try:
            for report_row in report_data:
                cur.execute(
                    "INSERT INTO report_data (uid, data_upload, file_path, class_num, confidence, report_uid, file_name, bbox) VALUES (?,?,?,?,?,?,?,?)",
                    (report_row.uid, report_row.data_upload, report_row.file_path, report_row.class_num,
                     report_row.confidence, uid, report_row.Name, self.list_to_str(report_row.BBox)))
                cur.fetchone()

            cur.close()
            self.conn.commit()
            return self.send_response("ok")

        except sqlite3.OperationalError:
            migrate(cur)
            return self.write_report(report_data, uid)

    def send_response(self, message, status_code=200) -> Response:
        response = Message(message)
        response = wrap_answer(response)
        response.status_code = status_code
        return response

    def get_neural_report_data_csv(self, uid) -> Response:
        data: list[ReportUnit] = self.get_neural_report_data_content(uid)
        fieldnames = ["Name", "BBox", "Class"]
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        writer.writeheader()

        for row in data:
            writer.writerow({"Name": row.Name, "BBox": "'"+row.BBox+"'", "Class": row.Class})

        csv_file.seek(0)  # Reset the StringIO cursor to the beginning
        return Response(csv_file.getvalue(), mimetype='text/csv')

    def get_neural_report_data(self, uid) -> Response:
        return wrap_answer(self.get_neural_report_data_content(uid))

    def get_neural_report_data_content(self, uid) -> list[ReportUnit]:
        cur = init_cursor(self.conn)
        try:
            cur.execute("SELECT * FROM report_data WHERE report_uid=?", (uid,))
            rows = cur.fetchall()
            result: list[ReportUnit] = []
            name = "bad"
            for row in rows:
                if row[3] == 0:
                    name = "bad"
                elif row[3] == 1:
                    name = "good"
                bbox_row = row[7]
                result.append(ReportUnit(row[2], [name,bbox_row,float(row[4]),], row[5]))
            cur.close()
            return result
        except sqlite3.OperationalError:
            migrate(cur)
            return self.get_neural_report_data_content(uid)

    def remove_neural_report_data(self, uid) -> Response:
        cur = init_cursor(self.conn)
        try:
            cur.execute("DELETE FROM report_data WHERE uid=?", (uid,))
            cur.fetchone()
            cur.close()
            self.conn.commit()
            return self.send_response(f"ok - {uid}")
        except sqlite3.OperationalError:
            migrate(cur)
            return self.remove_neural_report_data(uid)

