#include <zip.h>
#include <iostream>
#include <string>

int main() {
    const std::string zipPath = "example.zip";
    int error = 0;

    zip_t *archive = zip_open(zipPath.c_str(), ZIP_RDONLY, &error);
    if (!archive) {
        std::cerr << "Ошибка открытия архива: " << error << std::endl;
        return 1;
    }

    zip_int64_t numFiles = zip_get_num_entries(archive, ZIP_FL_UNCHANGED);
    std::cout << "Файлов в архиве: " << numFiles << std::endl;

    for (zip_int64_t i = 0; i < numFiles; ++i) {
        const char *fileName = zip_get_name(archive, i, ZIP_FL_ENC_GUESS);
        if (fileName) {
            std::cout << "Файл: " << fileName << std::endl;
        } else {
            std::cerr << "Ошибка получения имени файла в архиве" << std::endl;
        }
    }

    zip_close(archive);

    return 0;
}
