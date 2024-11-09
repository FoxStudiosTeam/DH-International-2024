#include <opencv2/opencv.hpp>
#include <opencv2/dnn.hpp>
#include <iostream>

int main() {

    cv::dnn::Net net = cv::dnn::readNet("yolov8n.onnx");


    cv::Mat image = cv::imread("image.jpg");
    if (image.empty()) {
        std::cerr << "Не удалось загрузить изображение!" << std::endl;
        return -1;
    }


    cv::Mat blob = cv::dnn::blobFromImage(image, 1/255.0, cv::Size(640, 640), cv::Scalar(), true, false);


    net.setInput(blob);


    cv::Mat output = net.forward();
    std::cout << "Output shape: " << output.size << std::endl;

    //доп обработка резов(извлечение координат и меток объектов) будет тута

    return 0;
}
