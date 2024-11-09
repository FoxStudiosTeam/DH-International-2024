from flask import Flask, Response
import sqlite3
from report_service import ReportService

api = Flask(__name__)
reportService = ReportService()

@api.route('/api/v1/report/all')
def get_reports():
    return Response(reportService.get_reports(), content_type='application/json')


@api.route('/api/v1/report/get')
def get_report():
    return ""


if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=8080)
