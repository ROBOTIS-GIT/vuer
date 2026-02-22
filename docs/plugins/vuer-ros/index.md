# Vuer ROS

Vuer ROS is a CLI plugin for visualizing ROS2 data and MCAP bag files with vuer.

## Installation

```bash
# Core package
pip install vuer-ros

# With visualization support
pip install 'vuer-ros[viz]'

# With MCAP support
pip install 'vuer-ros[mcap]'

# Full installation
pip install 'vuer-ros[full]'
```

## Quick Start

```bash
# Visualize an MCAP file directly
vuer visualize --mcap recording.mcap

# Start a live visualization server
vuer live-server

# Stream MCAP playback to live-server
vuer playback --mcap recording.mcap

# Extract data from MCAP files
vuer demcap /path/to/recording.mcap
```

## Supported Message Types

- **RGB Images:** `sensor_msgs/msg/Image`, `sensor_msgs/msg/CompressedImage`
- **Depth Images:** 16UC1, 32FC1 encodings
- **IMU Data:** `sensor_msgs/msg/Imu`
- **Transforms:** `tf2_msgs/msg/TFMessage`
- **Odometry:** `nav_msgs/msg/Odometry`
- **Joint States:** `sensor_msgs/msg/JointState`
- **LiDAR:** Point cloud data

## Commands

```{toctree}
:maxdepth: 1

commands/live-server
commands/ros-bridge
commands/playback
commands/visualize
commands/demcap
```

## API Reference

```{eval-rst}
.. automodule:: vuer_ros
   :members:
   :undoc-members:
   :show-inheritance:
```
