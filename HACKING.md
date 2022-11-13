## Build Instructions

```bash
# Run in a MINGW64 environment
./make-msys2-installer
```

## New Release TODO List

* Trigger a new nightly build via https://github.com/msys2/msys2-installer/actions/workflows/build.yml or use an existing one
* Get all files with dates in their names, sign them and create checksum files (.sig and .sha256)
* Create a new git tag following format: `date -I`
* Upload the installer files to the release tag
* Update the download link and checksum for the GiHub action and verify that all tests pass: https://github.com/msys2/setup-msys2/blob/master/main.js
* Run `msys2-devtools/update-installer "$(date -I)"` on the server to copy the release from GitHub
* Update the link, name and checksum on the main website (pointing to GitHub): https://github.com/msys2/msys2.github.io/blob/source/web/index.md
