#!/bin/bash
# usage: ./create-sfx.sh /some/path/to/msys64 installer.exe

set -e

if [ "$MSYSTEM" = "CLANGARM64" ]; then
    ARCH="arm64"
    CHECKSUM="d5bed0dde5bbe67699883341400bbd833d1f966864aa0748fd0d59e6be5e1dd2"
else
    ARCH="x64"
    CHECKSUM="a13b22a8b9e3009509cfc876f70d973424f901cac7c2432d0d049568569ee967"
fi

# Download and extract https://github.com/mcmilk/7-Zip-zstd
NAME="7z25.01-zstd-${ARCH}"
DIR="$( cd "$( dirname "$0" )" && pwd )"
mkdir -p "$DIR/_cache"
BASE="$DIR/_cache/$NAME"
if [ ! -f "$BASE.exe" ]; then
    curl --fail -L "https://github.com/mcmilk/7-Zip-zstd/releases/download/v25.01-v1.5.7-R2/$NAME.exe" -o "$BASE.exe"
fi
echo "$CHECKSUM $BASE.exe" | sha256sum --quiet --check
if [ ! -d "$BASE" ]; then
    7z e -o"$BASE" "$DIR/_cache/$NAME.exe"
fi

# Create SFX installer
INPUT="$1"
OUTPUT="$2"
TEMP="$OUTPUT.payload"

rm -f "$TEMP"
"$BASE/7z" a "$TEMP" -ms1T -m0=zstd -mx22 "$INPUT"
cat "$BASE/7zCon.sfx" "$TEMP" > "$OUTPUT"
rm "$TEMP"