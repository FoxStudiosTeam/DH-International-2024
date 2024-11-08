start-python:
	python3 -m pip ./report-service/http_service.py
build-report-block:
	cd ./report_block && python3 -m pip install build && python3 -m build
setup-project: build-report-block
	cd ./report_block && python3 -m pip install ./dist/report_block-0.0.1-py3-none-any.whl
build-release:
	cd report-service && python http_service.py