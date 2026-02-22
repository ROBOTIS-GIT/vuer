# login

Authenticate with Vuer Hub using OAuth Device Flow.

## Usage

```bash
vuer login [OPTIONS]
```

## Description

Opens a browser for user authentication and saves credentials locally. Uses the OAuth Device Flow, which is ideal for CLI applications.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--env` | string | `dev` | Environment to authenticate with (`dev` or `production`) |

## Examples

```bash
# Authenticate with dev environment (default)
vuer login

# Authenticate with production
vuer login --env production
```

## Authentication Flow

1. Run `vuer login`
2. A verification URL and code are displayed
3. Open the URL in your browser
4. Enter the code to authenticate
5. Credentials are saved locally

## API Reference

```{eval-rst}
.. autoclass:: vuer_hub.commands.login.Login
   :members:
   :undoc-members:
   :show-inheritance:
```
