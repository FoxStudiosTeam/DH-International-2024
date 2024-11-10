import os
import shutil
import random

src_dir = "C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\data\\train\\bad"
dest_dir = "C:\\Users\\weednw\\PycharmProjects\\DH-International-2024\\weednw\\NNservice\\data\\validation\\bad"
percentage = 10

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

files = [f for f in os.listdir(src_dir) if os.path.isfile(os.path.join(src_dir, f)) and f.endswith("jpg") ]

num_files_to_move = max(1, int(len(files) * (percentage / 100.0)))

files_to_move = random.sample(files, num_files_to_move)

for file in files_to_move:
    shutil.move(os.path.join(src_dir, file), os.path.join(dest_dir, file))
