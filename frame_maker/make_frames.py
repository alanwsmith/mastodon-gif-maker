#!/usr/bin/env python3 

import glob
import os
import subprocess
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

def make_dirs():
    for video in videos:
        basename = os.path.basename(video).split('.')[0]
        output_dir = os.path.join(output_root, basename)
        Path(output_dir).mkdir(exist_ok=True)

def make_thumbnails():
    for video in videos:
        basename = os.path.basename(video).split('.')[0]
        output_path = os.path.join(output_root, basename, "_thumbnail.jpg")
        if basename in config['files']: 
            d = config['files'][basename]
            crop_string = f"crop={d['width']}:{d['height']}:{d['left']}:{d['down']}"
            cmd = [
                    "ffmpeg", 
                    "-i", 
                    video,
                    "-vframes", 
                    "1",
                    '-vf', 
                    crop_string,
                    "-y",
                    output_path
                    ]
            subprocess.run(cmd)


if __name__ == "__main__":
    make_dirs()
    make_thumbnails()

from pprint import pprint
pprint(config)








