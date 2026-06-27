#!/bin/bash
# usage: ./create-sfx.sh /some/path/to/msys64 installer.exe

set -e

if [ "$MSYSTEM" = "CLANGARM64" ]; then
    ARCH="arm64"
    CHECKSUM="880d663a10456e213c70107816941113a4260b167c61c79c5fe49235c33fc36e"
else
    ARCH="x64"
    CHECKSUM="e6b3728f0ed2f6fd9f18c11d793ff67a8b1553555f1f8d9b916fe2e7f748ae27"
fi

# Download and extract https://github.com/mcmilk/7-Zip-zstd
NAME="7z26.02-zstd-${ARCH}"
DIR="$( cd "$( dirname "$0" )" && pwd )"
mkdir -p "$DIR/_cache"
BASE="$DIR/_cache/$NAME"
if [ ! -f "$BASE.exe" ]; then
    curl --fail -L "https://github.com/mcmilk/7-Zip-zstd/releases/download/v26.02-v1.5.7-R1/$NAME.exe" -o "$BASE.exe"
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