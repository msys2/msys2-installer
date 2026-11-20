#!/bin/bash
# usage: ./create-sfx.sh /some/path/to/msys64 installer.exe

set -e

if [ "$MSYSTEM" = "CLANGARM64" ]; then
    ARCH="arm64"
    CHECKSUM="e28445094c97327c3e4a0734dc1f04176e24612b5f84d8032aa269c8934720e9"
else
    ARCH="x64"
    CHECKSUM="430e398037520a52a35dedf45472eb3ea62073b7bf53bfdd37d2b663f50f5530"
fi

# Download and extract https://github.com/mcmilk/7-Zip-zstd
NAME="7z26.05-zstd-${ARCH}"
DIR="$( cd "$( dirname "$0" )" && pwd )"
mkdir -p "$DIR/_cache"
BASE="$DIR/_cache/$NAME"
if [ ! -f "$BASE.exe" ]; then
    curl --fail -L "https://github.com/mcmilk/7-Zip-zstd/releases/download/v26.05-v1.5.7-R1/$NAME.exe" -o "$BASE.exe"
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