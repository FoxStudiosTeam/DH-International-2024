import cv2
import os
for file in os.listdir("C:\\Msk HAck\\train_data_minprirodi\\train"):
    if file.endswith(".jpg"):
        labels = []
        a = file.replace(".jpg", '.txt')
        with open(f"C:\\Msk HAck\\train_data_minprirodi\\train/{a}") as f:
            for line in f:
                if line == "\n": break
                label = line.split()
                labels.append((int(label[0]), (float(label[1]), float(label[2]), float(label[3]), float(label[4]))))
        img = cv2.imread("C:\\Msk HAck\\train_data_minprirodi\\train\\"+file)
        for i, data in enumerate(labels):
            clss, box = data
            x, y, w, h = box
            x = int(x * img.shape[1])
            y = int(y * img.shape[0])
            w = int(w * img.shape[1])
            h = int(h * img.shape[0])
            b = file.replace('.jpg', '')
            filename = f"C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\cls\\good\\{b}_{i}.jpg"
            if clss == 0:
                filename = f"C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\cls\\bad\\{b}_{i}.jpg"
            cv2.imwrite(filename, img[y-h//2:y+h//2, x-w//2:x+w//2])
            #with open(filename.replace(".jpg", ".txt"), "w") as f:
            #    f.write(f"{clss}")