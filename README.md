# MSYS2 Installer

## Nightly build

https://github.com/msys2/msys2-installer/releases/tag/nightly-x86_64

![screenshot](screenshot.png)

## CLI Usage examples

Installing the GUI installer via the CLI to `C:\msys64`:

```
.\msys2-x86_64-latest.exe in --confirm-command --accept-messages --root C:/msys64
```

Uninstalling an existing installation in `C:\msys64` via the CLI:

```
C:\msys64\uninstall.exe pr --confirm-command
```

Installing the self extracting archive to `C:\msys64`:

```
.\msys2-base-x86_64-latest.sfx.exe -y -oC:\
```

## Build Instructions

```bash
# Run in a MSYS2 environment
./make-msys2-installer
```