# Docker

## Why

Tools sama libraries sama version/Komponen yang dibutuhkan pasti harus sama dan stable and static. Jadilah sebuah container yang berisi kesatuan dari specific set of that.

## How to install

Use podman instead, no enterprise segala.

[Podman Installation](https://podman.io/docs/installation)

WSL? lebok, kecuali buat si orang nyantei.

Oh iya aing pake "Arch Linux" jadi pake podman to docker, to emulate its CLI.

## Commands

- `podman run `_`things`_
  - ex: `podman run docker/whalesay cowsay asyik-podman`
    - then, choose: `docker.io/docker/whalesay:latest`
- `podman ps`
  - to list all containers.
- `podman ps -a`
  - to list running containers.
- `podman stop`_`things`_
  - to stop any container,
  - _`things`_, such as:
    - container name
    - ...
  - ex: `podman stop my-archie`
- `podman rm`_`things`_
  - to remove any container.
  - dangerous.
  - ex: `podman rm my-archie`
    > who the frick wants to delete archie, he's national treasure. It's a TV show guys, it's not cringe.
- > Now, aku tulis tulis aja dulu, bisi gak ada di podman sebenernya.
- `docker images`
  - to list all images.
- `docker rmi`_`things`_
  - to remove any image.
- `docker pull`_`image`_
  - to pull any image.
