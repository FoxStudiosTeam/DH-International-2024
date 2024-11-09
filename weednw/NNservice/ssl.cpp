#include <opencv2/opencv.hpp>
#include <onnxruntime/core/session/onnxruntime_cxx_api.h>
#include <nlohmann/json.hpp>
#include <fstream>
#include <zip.h>
#include <vector>
#include <string>
#include <iostream>

using json = nlohmann::json;
using namespace cv;
using namespace std;

void output(const vector<json>& report) {
    cout << report.dump(4) << endl;
}


vector<pair<string, vector<float>>> parse_result(const vector<Ort::Value>& boxes, const vector<string>& class_names) {
    vector<pair<string, vector<float>>> parsed_boxes;

    for (const auto& box : boxes) {

        auto* data = box.GetTensorMutableData<float>();
        vector<float> bbox(data, data + 4);
        int class_id = static_cast<int>(data[4]);
        string name = class_names[class_id];
        parsed_boxes.emplace_back(name, bbox);
    }

    return parsed_boxes;
}

void processing() {

    const string zip_path = "Ваша зипка";
    const string model_path = "путь к моделе с расширением .onnx";

    Ort::Env env(ORT_LOGGING_LEVEL_WARNING, "YOLOModel");
    Ort::SessionOptions session_options;
    Ort::Session session(env, model_path.c_str(), session_options);

    vector<json> report;

    struct zip* zip_archive = zip_open(zip_path.c_str(), 0, NULL);
    if (!zip_archive) {
        cerr << "Не удалось открыть ZIP-файл: " << zip_path << endl;
        return;
    }
    for (int i = 0; i < zip_get_num_entries(zip_archive, 0); ++i) {
        struct zip_stat stat;
        zip_stat_index(zip_archive, i, 0, &stat);


        string file_name = stat.name;
        if (file_name.ends_with(".png") || file_name.ends_with(".jpg") || file_name.ends_with(".jpeg")) {
            struct zip_file* file = zip_fopen_index(zip_archive, i, 0);
            if (!file) {
                cerr << "Не удалось открыть файл: " << file_name << endl;
                continue;
            }
            vector<uint8_t> file_data(stat.size);
            zip_fread(file, file_data.data(), stat.size);
            zip_fclose(file);

            Mat img = imdecode(file_data, IMREAD_COLOR);
            if (img.empty()) {
                cerr << "Ошибка чтения изображения: " << file_name << endl;
                continue;
            }
            vector<Ort::Value> results = model.predict(img);
            vector<string> class_names = {"Class1", "Class2"};
            auto boxes = parse_result(results, class_names);


            for (const auto& box : boxes) {
                report.push_back({
                    {"name", file_name},
                    {"BBox", box.second},
                    {"Class", box.first}
                });
            }
        }
    }
    zip_close(zip_archive);
    output(report);
}
int main() {
    processing();
    return 0;
}
