start-python:
	python ./local/http_service.py
build-report-block:
	cd ./report-block && python -m pip install build && python3 -m build
setup-project: build-report-block
	cd ./report-block && python3 -m pip install ./dist/report_block-0.0.1-py3-none-any.whl