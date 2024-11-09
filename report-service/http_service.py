from flask import Flask, Response, request
import sqlite3
from report_service import ReportService
from neural_service_impl import NeuralServiceImpl

api = Flask(__name__)
reportService = ReportService()

@api.route('/api/v1/report/all', methods=["GET"])
def get_reports():
    return Response(reportService.get_reports(), content_type='application/json')

@api.route('/api/v1/report/get/<uid>', methods=["GET"])
def get_report(uid : str):
    return Response(reportService.get_report(uid), content_type='application/json')

@api.route('/api/v1/report/create', methods=["POST"])
def create_report():
    return Response(reportService.create_report(), content_type='application/json')

@api.route('/api/v1/report/update/<uid>', methods=["PUT"])
def update_report(uid : str):
    return Response(reportService.update_report(uid, request.data), content_type='application/json')

@api.route('/api/v1/report/delete/<uid>', methods=["DELETE"])
def delete_report(uid : str):
    return Response(reportService.delete_report(uid), content_type='application/json')

#NeuralServiceImpl
neuralServiceImpl = NeuralServiceImpl()

@api.route('/api/v1/report-data/upload/<uid>', methods=["POST"])
def upload_report(uid : str):
    return Response(neuralServiceImpl.upload_report(uid, request.form), content_type='application/json')

if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=8080)
