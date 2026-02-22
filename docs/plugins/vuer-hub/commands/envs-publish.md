# envs-publish

Publish an environment to the registry.

## Usage

```bash
vuer envs-publish [OPTIONS]
```

## Description

Reads `environment.json`, creates a tgz archive, and uploads it to the Vuer Hub registry. This works similarly to `npm publish`.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--directory` | string | `.` | Directory containing `environment.json` |
| `--timeout` | int | `300` | Request timeout in seconds |
| `--tag` | string | `latest` | Version tag |
| `--dry-run` | bool | `False` | Simulate without uploading |

## Examples

```bash
# Publish from current directory
vuer envs-publish

# Publish from a specific directory
vuer envs-publish --directory ./my-environment

# Dry run to see what would be published
vuer envs-publish --dry-run
```

## Environment.json Requirements

Your `environment.json` must contain:

```json
{
  "name": "my-environment",
  "version": "1.0.0",
  "description": "Optional description",
  "visibility": "PUBLIC"
}
```

Required fields:
- `name`: Package name
- `version`: Semantic version

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.envs_publish.EnvsPublish
   :members:
   :undoc-members:
   :show-inheritance:
```
