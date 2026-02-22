# sync

Sync environments listed in environment.json dependencies.

## Usage

```bash
vuer sync [OPTIONS]
```

## Description

Reads `environment.json`, validates dependencies with the backend, and downloads all environments and their transitive dependencies to the `vuer_environments/` directory. This works similarly to `npm install`.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--output` | string | `vuer_environments` | Destination directory for downloaded environments |
| `--timeout` | int | `3000` | Request timeout in seconds |

## Examples

```bash
# Sync all dependencies to default directory
vuer sync

# Sync to a custom output directory
vuer sync --output ./my-envs
```

## Requirements

- `environment.json` must exist in the current directory
- Must be authenticated (run `vuer login` first)
- `VUER_HUB_URL` environment variable must be set

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.sync.Sync
   :members:
   :undoc-members:
   :show-inheritance:
```
