#!/bin/bash
# usage: ./create-sfx.sh /some/path/to/msys64 installer.exe

set -e

if [ "$MSYSTEM" = "CLANGARM64" ]; then
    ARCH="arm64"
    CHECKSUM="857a45bbdfc1b68bc32f478f438db7a5fcff3d43cc2e8512f1d4cab5195051a0"
else
    ARCH="x64"
    CHECKSUM="5a55a8b6abb09d4b5ddd64c95f22a5270cb46752fb7a5353073508922b141596"
fi

# Download and extract https://github.com/mcmilk/7-Zip-zstd
NAME="7z25.01-zstd-${ARCH}"
DIR="$( cd "$( dirname "$0" )" && pwd )"
mkdir -p "$DIR/_cache"
BASE="$DIR/_cache/$NAME"
if [ ! -f "$BASE.exe" ]; then
    curl --fail -L "https://github.com/mcmilk/7-Zip-zstd/releases/download/v25.01-v1.5.7-R4/$NAME.exe" -o "$BASE.exe"
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