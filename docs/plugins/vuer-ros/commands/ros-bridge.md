# ros-bridge

Bridge ROS topics to a remote vuer live-server.

## Usage

```bash
vuer ros-bridge [OPTIONS]
```

## Description

Connects to a ROS2 environment and bridges selected topics to a remote vuer live-server via WebSocket. This allows visualizing ROS data in real-time on a remote machine.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--config` | string | `""` | Path to YAML configuration file for topic mappings |
| `--ws` | string | `ws://localhost:8013` | WebSocket URL to stream to |

## Examples

```bash
# Bridge with config file
vuer ros-bridge --config vuer-ros-bridge.yaml --ws wss://server:port
```

## Configuration File

The YAML config file specifies which ROS topics to bridge:

```yaml
topics:
  - name: /camera/image_raw
    type: sensor_msgs/msg/Image
  - name: /imu/data
    type: sensor_msgs/msg/Imu
  - name: /tf
    type: tf2_msgs/msg/TFMessage
```

## Dependencies

Requires:
- ROS2 environment
- Full installation: `pip install 'vuer-ros[full]'`

## Status

This command is currently in development.

## API Reference

```{eval-rst}
.. autoclass:: vuer_ros.commands.ros_bridge.RosBridge
   :members:
   :undoc-members:
   :show-inheritance:
```
