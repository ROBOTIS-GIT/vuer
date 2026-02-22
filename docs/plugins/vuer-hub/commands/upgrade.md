# upgrade

Upgrade an environment to the latest version.

## Usage

```bash
vuer upgrade <env>
```

## Description

Upgrades a single environment in `environment.json` to the latest available version from the registry.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `env` | string | Yes | Environment name to upgrade (without version) |

## Examples

```bash
# Upgrade an environment to latest
vuer upgrade some-environment-name
```

## Requirements

- `environment.json` must exist in the current directory
- The environment must already be listed in dependencies
- Must be authenticated (run `vuer login` first)
- `VUER_HUB_URL` environment variable must be set

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.upgrade.Upgrade
   :members:
   :undoc-members:
   :show-inheritance:
```
