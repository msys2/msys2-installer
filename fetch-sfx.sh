#!/bin/bash

set -e

# Fetch 7zCon.sfx from upstream 7-zip
curl "https://www.7-zip.org/a/7z1900.exe" -o 7z1900.exe
echo "759aa04d5b03ebeee13ba01df554e8c962ca339c74f56627c8bed6984bb7ef80 7z1900.exe" | sha256sum --check
7z x -o7zout 7z1900.exe
cp 7zout/7zCon.sfx .
rm -Rf 7zout 7z1900.exe