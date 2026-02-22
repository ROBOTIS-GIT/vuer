# visualize

Visualize MCAP files directly with vuer.

## Usage

```bash
vuer visualize --mcap <file> [OPTIONS]
```

## Description

Opens an MCAP file and visualizes its contents directly in a vuer session without needing a separate live-server. This is the easiest way to quickly inspect MCAP files.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `--mcap` | string | Yes | Path to MCAP file |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--speed` | float | `1.0` | Playback speed multiplier |
| `--loop` | bool | `False` | Loop playback continuously |

## Examples

```bash
# Basic visualization
vuer visualize --mcap recording.mcap

# 2x speed with looping
vuer visualize --mcap recording.mcap --speed 2.0 --loop
```

## Output

The command displays:
- List of topics with their message types
- Sample of the first 10 messages with timestamps
- Total message count

## Dependencies

```bash
pip install 'vuer-ros[full]'
```

## API Reference

```{eval-rst}
.. autoclass:: vuer_ros.commands.visualize.Visualize
   :members:
   :undoc-members:
   :show-inheritance:
```
