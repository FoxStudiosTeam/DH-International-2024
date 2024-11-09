from flask import Flask

api = Flask(__name__)

@api.route('/api/v1/report/generate')
def get_report():
    return ""

@api.route('/api/v1/report/get')
def get_report():
    return ""

@api.route('/api/v1/report/get')
def get_report():
    return ""


if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=8080)