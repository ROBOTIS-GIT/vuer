# live-server

Start a live visualization server for remote vuer clients.

## Usage

```bash
vuer live-server [OPTIONS]
```

## Description

Launches a WebSocket server that accepts connections from vuer Python clients or the `ros-bridge` command. Incoming data streams (images, point clouds, transforms, etc.) are visualized in real-time using vuer.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--port` | int | `8012` | Server port for visualization |
| `--host` | string | `0.0.0.0` | Bind address |
| `--ws-port` | int | `8013` | WebSocket server port for client connections |
| `--config` | string | `""` | Optional config file for visualization layout |
| `--update-rate` | float | `30.0` | Visualization update rate (FPS) |

## Examples

```bash
# Start on default ports
vuer live-server

# Custom visualization port
vuer live-server --port 9000

# Custom bind address (localhost only)
vuer live-server --host 127.0.0.1

# With custom update rate
vuer live-server --update-rate 60.0
```

## Dependencies

Requires the `viz` extra:

```bash
pip install 'vuer-ros[viz]'
# Also requires: pip install websockets
```

## Architecture

The live-server runs two services:
1. **HTTP Server** (default port 8012): Serves the vuer visualization UI
2. **WebSocket Server** (default port 8013): Accepts data streams from clients

## API Reference

```{eval-rst}
.. autoclass:: vuer_ros.commands.live_server.LiveServer
   :members:
   :undoc-members:
   :show-inheritance:
```
