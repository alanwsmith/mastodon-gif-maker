#!/usr/bin/env python3 

import glob
import os
import sys

from pathlib import Path
from yaml import load, SafeLoader

script_dir = sys.path[0]
source_dir = os.path.abspath(os.path.join(script_dir, "..", "videos"))
output_root = os.path.abspath(os.path.join(script_dir, "..", "site", "frames"))
config_path = os.path.join(script_dir, "config.yml")

videos = [video for video in glob.glob(f"{source_dir}/*.mp4") 
          if Path(video).is_file()]

with open(config_path) as _config:
    config = load(_config.read(), SafeLoader)
    print(config)

def mkdirs():
    for video in videos:
        basename = os.path.basename(video).split('.')[0]
        output_dir = os.path.join(output_root, basename)
        Path(output_dir).mkdir(exist_ok=True)


if __name__ == "__main__":
    mkdirs()








