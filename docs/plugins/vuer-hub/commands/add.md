# add

Add an environment to environment.json and sync.

## Usage

```bash
vuer add <env>
```

## Description

Adds an environment to `environment.json` dependencies and automatically runs `vuer sync` to download it.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `env` | string | Yes | Environment spec in format `name/version` (e.g., `some-environment/v1.2.3`) |

## Examples

```bash
# Add an environment
vuer add some-environment/v1.2.3

# Add another environment
vuer add robot-arm-env/v2.0.0
```

## Behavior

1. Parses the environment spec (`name/version`)
2. Creates `environment.json` if it doesn't exist
3. Adds the environment to the `dependencies` object
4. Automatically runs `vuer sync` to download

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.add.Add
   :members:
   :undoc-members:
   :show-inheritance:
```
