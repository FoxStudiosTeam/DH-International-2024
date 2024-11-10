import os
import subprocess
import threading

from flask import Flask, request
import sqlite3
from flask_cors import CORS
from report_service.report_service import ReportService
from report_service.neural_service_impl import NeuralServiceImpl

api = Flask(__name__)
CORS(api)
reportService = ReportService()

@api.route('/api/v1/report/all', methods=["GET"])
def get_reports():
    return reportService.get_reports()

@api.route('/api/v1/report/get/<uid>', methods=["GET"])
def get_report(uid : str):
    return reportService.get_report(uid)

@api.route('/api/v1/report/create', methods=["POST"])
def create_report():
    return reportService.create_report()

@api.route('/api/v1/report/update/<uid>', methods=["PUT"])
def update_report(uid : str):
    return reportService.update_report(uid, request.data)

@api.route('/api/v1/report/delete/<uid>', methods=["DELETE"])
def delete_report(uid : str):
    return reportService.delete_report(uid)

neuralSubscriber = NeuralServiceImpl()

@api.route('/api/v1/neural/upload_report/<uid>', methods=["POST"])
def upload_report(uid : str):
    return neuralSubscriber.upload_report(uid, request.files)

@api.route('/api/v1/neural/reports/all/<uid>', methods=["GET"])
def get_neural_report_data(uid : str):
    return neuralSubscriber.get_neural_report_data(uid)

@api.route('/api/v1/neural/reports/remove/<uid>', methods=["DELETE"])
def remove_neural_report_data(uid : str):
    return neuralSubscriber.remove_neural_report_data(uid)

@api.route('/api/v1/neural/reports/csv/<uid>', methods=["GET"])
def get_neural_report_data_csv (uid : str):
    return neuralSubscriber.get_neural_report_data_csv(uid)


def run_node():
    # Set the environment variable for the subprocess
    env = os.environ.copy()
    cwd = os.getcwd()
    env['PATH'] = f"{env['PATH']};{cwd}/node;"  # Adjust the path as necessary
    try:
        # subprocess.run([f"{cwd}/node/npm.cmd", "install", "--prefix", "./web-view"], env=env, check=True)
        # subprocess.run([f"{cwd}/node/npm.cmd", "run", "build", "--prefix", "./web-view"], env=local_env, check=True)
        subprocess.run([f"{cwd}/node/npm.cmd", "run", "start", "--prefix", "./web-view"], env=env, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while starting Next.js: {e}")
    except FileNotFoundError as e:
        print(f"File not found: {e}")

def run_flask():
    api.run(debug=False, host='0.0.0.0', port=8080)

if __name__ == '__main__':
    threads = []
    # Run the Next.js application
    node = threading.Thread(target=run_node)
    flask_local = threading.Thread(target=run_flask)
    threads.append(node)
    threads.append(flask_local)
    for thread in threads:
        thread.start()

