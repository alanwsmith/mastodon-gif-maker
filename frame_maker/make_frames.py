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
            # Don't crop thumbnails so you can use them to size
            # the output frames
            # crop_string = f"crop={d['width']}:{d['height']}:{d['left']}:{d['down']}"
            cmd = [
                    "ffmpeg", 
                    "-i", 
                    video,
                    "-vframes", 
                    "1",
                    # '-vf', 
                    # crop_string,
                    "-y",
                    output_path
                    ]
            subprocess.run(cmd)


def make_frames():
    for video in videos:
        basename = os.path.basename(video).split('.')[0]
        output_path = os.path.join(output_root, basename, "%d.jpg")
        if basename in config['files'] and config['files'][basename]['make'] == "y":
            d = config['files'][basename]
            filters = []
            filters.append(f"crop={d['width']}:{d['height']}:{d['left']}:{d['down']}")
            filters.append("scale=480:-2")
            filters.append("fps=30")
            cmd = [
                    "ffmpeg", 
                    "-ss",
                    str(d['start']),
                    "-t",
                    "6",
                    "-i", 
                    video,
                    '-vf', 
                    ",".join(filters),
                    "-y",
                    output_path
                    ]
            subprocess.run(cmd)

def make_preview_gifs():
    for video in videos:
        basename = os.path.basename(video).split('.')[0]
        output_path = os.path.join(output_root, basename, "_example.gif")
        if basename in config['files']: 
            d = config['files'][basename]
            filters = []
            filters.append(f"crop={d['width']}:{d['height']}:{d['left']}:{d['down']}")
            filters.append("fps=10")
            filters.append("scale=120:-2:flags=lanczos")
            filters.append("split[s0][s1];[s0]palettegen=max_colors=64:reserve_transparent=0[p];[s1][p]paletteuse")
            cmd = [
                    "ffmpeg", 
                    "-ss", 
                    "0",
                    "-t",
                    "5",
                    "-i", 
                    video,
                    '-vf', 
                    ",".join(filters),
                    "-y",
                    output_path
                    ]
            subprocess.run(cmd)


if __name__ == "__main__":
    make_dirs()
    make_thumbnails()
    make_frames()
    make_preview_gifs()


