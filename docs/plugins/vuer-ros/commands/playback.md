# playback

Stream MCAP ROS2 bag files to a live-server.

## Usage

```bash
vuer playback --mcap <file> [OPTIONS]
```

## Description

Reads an MCAP file (ROS2 bag format) and streams the recorded data to a live-server via WebSocket for real-time visualization.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `--mcap` | string | Yes | Path to MCAP file |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--ws` | string | `ws://localhost:8013` | WebSocket URL to stream to |
| `--speed` | float | `1.0` | Playback speed multiplier |
| `--loop` | bool | `False` | Loop playback continuously |
| `--topics` | string | `""` | Comma-separated topic filter |
| `--quiet` | bool | `False` | Suppress progress output |

## Examples

```bash
# Basic playback
vuer playback --mcap recording.mcap

# 2x speed with looping
vuer playback --mcap recording.mcap --speed 2.0 --loop

# Stream to remote server
vuer playback --mcap recording.mcap --ws wss://my-server.com:8013

# Filter specific topics
vuer playback --mcap recording.mcap --topics "/camera/image,/imu/data"
```

## Supported Message Types

- RGB images (`sensor_msgs/msg/Image`, `CompressedImage`)
- Depth images (16UC1, 32FC1 encodings)
- IMU data (`sensor_msgs/msg/Imu`)
- Transforms (`tf2_msgs/msg/TFMessage`)
- Odometry (`nav_msgs/msg/Odometry`)
- Joint states (`sensor_msgs/msg/JointState`)
- LiDAR point clouds

## Dependencies

```bash
pip install 'vuer-ros[mcap]'
pip install websockets
```

## API Reference

```{eval-rst}
.. autoclass:: vuer_ros.commands.playback.Playback
   :members:
   :undoc-members:
   :show-inheritance:
```
