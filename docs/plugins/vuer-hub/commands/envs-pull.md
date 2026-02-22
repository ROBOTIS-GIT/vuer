# envs-pull

Download an environment from the registry.

## Usage

```bash
vuer envs-pull <flag> [OPTIONS]
```

## Description

Downloads an environment from the registry by ID or name/version specification.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `flag` | string | Yes | Environment identifier (ID or `name/version`) |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--output` | string | `downloads` | Destination directory |
| `--filename` | string | `None` | Override saved filename |
| `--timeout` | int | `300` | Request timeout in seconds |

## Examples

```bash
# Pull by name/version
vuer envs-pull my-environment/1.0.0

# Pull to custom directory
vuer envs-pull --output ./downloads my-env/v2.0.0
```

## Requirements

- Must be authenticated (run `vuer login` first)
- `VUER_HUB_URL` environment variable must be set

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.envs_pull.EnvsPull
   :members:
   :undoc-members:
   :show-inheritance:
```
