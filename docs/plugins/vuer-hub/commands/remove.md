# remove

Remove an environment from environment.json.

## Usage

```bash
vuer remove <env>
```

## Description

Removes an environment from `environment.json` dependencies and runs `vuer sync` to reconcile the `vuer_environments/` directory.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `env` | string | Yes | Environment spec in format `name/version` (e.g., `some-environment/v1.2.3`) |

## Examples

```bash
# Remove an environment
vuer remove some-environment/v1.2.3
```

## Behavior

1. Checks if `environment.json` exists
2. Verifies the environment and version match what's in dependencies
3. Removes the entry from `dependencies`
4. Runs `vuer sync` to reconcile

## Notes

- The version must match exactly; if the pinned version differs, the removal is skipped
- If the environment is not found, a message is printed and sync still runs

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.remove.Remove
   :members:
   :undoc-members:
   :show-inheritance:
```
