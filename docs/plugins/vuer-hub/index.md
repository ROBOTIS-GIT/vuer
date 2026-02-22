# Vuer Hub

Vuer Hub is a CLI plugin for managing robotics environments with npm-style dependency management.

## Installation

```bash
pip install vuer-hub
```

## Quick Start

```bash
# Authenticate with Vuer Hub
vuer login

# Add an environment to your project
vuer add my-environment/v1.0.0

# Sync all dependencies
vuer sync
```

## Environment Management

Vuer Hub uses an `environment.json` file (similar to `package.json`) to track environment dependencies:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "robot-arm-env": "v1.2.0",
    "warehouse-scene": "v0.5.0"
  }
}
```

## Commands

```{toctree}
:maxdepth: 1

commands/login
commands/sync
commands/add
commands/remove
commands/upgrade
commands/envs-publish
commands/envs-pull
```

## API Reference

```{eval-rst}
.. automodule:: vuer_hub
   :members:
   :undoc-members:
   :show-inheritance:
```
