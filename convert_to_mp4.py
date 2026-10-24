import os
from PIL import Image, ImageSequence
import imageio
import numpy as np

def convert_webp_to_mp4(webp_path, mp4_path, fps=2):
    print(f"Reading {webp_path}...")
    img = Image.open(webp_path)
    
    frames = []
    durations = []
    for frame in ImageSequence.Iterator(img):
        # Convert to RGB
        rgb_frame = frame.convert("RGB")
        frames.append(np.array(rgb_frame))
        durations.append(frame.info.get("duration", 500))

    print(f"Extracted {len(frames)} frames from WebP.")
    if not frames:
        print("No frames found!")
        return

    # Calculate average fps if durations are present
    avg_duration = sum(durations) / len(durations) if durations else 500
    calculated_fps = max(1, round(1000 / avg_duration))
    print(f"Writing MP4 with calculated FPS: {calculated_fps}...")

    # Write MP4 using imageio-ffmpeg
    writer = imageio.get_writer(mp4_path, fps=calculated_fps, codec="libx264", quality=8)
    for f in frames:
        writer.append_data(f)
    writer.close()
    
    file_size = os.path.getsize(mp4_path)
    print(f"Successfully generated {mp4_path} ({file_size} bytes / {file_size / (1024*1024):.2f} MB)")

if __name__ == "__main__":
    root_dir = os.path.dirname(os.path.abspath(__file__))
    input_webp = os.path.join(root_dir, "demo_video.webp")
    output_mp4 = os.path.join(root_dir, "demo_video.mp4")
    convert_webp_to_mp4(input_webp, output_mp4)

    # Also copy to frontend/public/
    public_mp4 = os.path.join(root_dir, "frontend", "public", "demo_video.mp4")
    import shutil
    shutil.copyfile(output_mp4, public_mp4)
    print(f"Copied to {public_mp4}")
