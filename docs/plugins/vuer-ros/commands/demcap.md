# demcap

Extract data from MCAP files to readable formats.

## Usage

```bash
vuer demcap <mcap_path> [OPTIONS]
```

## Description

Extracts and organizes data from ROS2 MCAP bag files into human-readable formats. Supports RGB images, depth images, LiDAR point clouds, IMU data, camera intrinsics, TF transforms, odometry, and joint states.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `mcap_path` | string | Yes | Path to MCAP file |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--output` | string | `extracted_data/<filename>` | Output directory |
| `--no-video` | bool | `False` | Skip video creation from RGB images |
| `--fps` | int | `30` | Frame rate for output videos |
| `--start-time` | int | `None` | Start timestamp in nanoseconds |
| `--end-time` | int | `None` | End timestamp in nanoseconds |

## Examples

```bash
# Extract to default location
vuer demcap /path/to/recording.mcap

# Custom output directory
vuer demcap /path/to/recording.mcap --output ./my_output

# Skip video generation
vuer demcap /path/to/recording.mcap --no-video

# Extract time range
vuer demcap /path/to/recording.mcap --start-time 1000000000 --end-time 5000000000
```

## Output Structure

```
<output_dir>/
├── images/           # RGB images per camera
├── depth/            # Depth images per camera
├── lidar/            # LiDAR point cloud data
├── imu/              # IMU sensor data (CSV)
├── transforms/       # TF transform data (CSV)
├── videos/           # Generated videos from images
├── camera_intrinsics.json
├── odometry.csv
└── joint_states.csv
```

## Dependencies

```bash
pip install 'vuer-ros[mcap]'
```

## API Reference

```{eval-rst}
.. autoclass:: vuer_ros.commands.demcap.Demcap
   :members:
   :undoc-members:
   :show-inheritance:
```
