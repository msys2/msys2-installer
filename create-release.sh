#!/usr/bin/env bash

set -e

repo="msys2/msys2-installer"
source_release="nightly-x86_64"
tag="$(date -I)"
signing_key="0EBF782C5D53F7E5FB02A66746BD761F7A49B0EC"

date_stamp="${tag//-/}"
release_dir=$PWD/_release
rm -Rf "$release_dir"

gh release download "$source_release" --repo "$repo" --dir "$release_dir"

pushd "$release_dir" >/dev/null

sha256sum -c msys2-x86_64-checksums.txt && rm msys2-x86_64-checksums.txt
sha256sum -c msys2-arm64-checksums.txt && rm msys2-arm64-checksums.txt
rm msys2-base-arm64-*.packages.txt

downloaded=(msys2-*)
sign_targets=()
for file in "${downloaded[@]}"; do
    new_name="${file//latest/$date_stamp}"
    [[ "$new_name" != "$file" ]] && mv -- "$file" "$new_name"

    case "$new_name" in
        *.packages.txt) ;;
        *) sign_targets+=("$new_name") ;;
    esac
done
for file in "${sign_targets[@]}"; do
    gpg -u "$signing_key" -b -- "$file"
    gpg --verify "$file.sig" "$file"
    sha256sum -- "$file" > "$file.sha256"
done

upload_files=(msys2-*)
gh release create "$tag" \
    --repo "$repo" \
    --title "$tag" \
    --notes "" \
    --draft \
    "${upload_files[@]}"

popd >/dev/null
