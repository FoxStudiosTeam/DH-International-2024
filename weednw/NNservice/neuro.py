from ultralytics import YOLO

model = YOLO("yolov8n.onnx")
model.export(format="onnx")
