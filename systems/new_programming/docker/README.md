# Docker

## Why

Tools sama libraries sama version/Komponen yang dibutuhkan pasti harus sama dan stable and static. Jadilah sebuah container yang berisi kesatuan dari specific set of that.

## How to install

Use podman instead, no enterprise segala.

[Podman Installation](https://podman.io/docs/installation)

WSL? lebok, kecuali buat si orang nyantei.

Oh iya aing pake "Arch Linux" jadi pake podman to docker, to emulate its CLI.

## Commands

- `podman run `_`image`_` `_`command`_
  - ex: `podman run docker/whalesay cowsay asyik-podman`
    - then, choose: `docker.io/docker/whalesay:latest`
  - apabila dilakukan command ini, maka ketika dijalankan `podman ps` maka container nya tidak akan terlihat (tidak running), tapi di `podman ps -a` ada and in exited state, soalnya jalannya cuman sedetik.
  - arguments:
    - `-d`
      - to run container detach from the console/in background.
    - `--name` > `--name <the name of the container>`
      - to name the container.
    - `image:tag`
      - ex: `redis:5.0` / `redis:latest` / `redis:4.0`
    - `-i`
      - interactive mode.
    - `-t`
      - pseudo-terminal mode. to output prompt to the user.(sick)
  - another ex: `docker run -d --name webapp nginx:1.14-alpine`
    - > susunannya harus kayak gitu, goblog terminal teh, di Surga enggak.
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
- `podman exec`_`running container`_` `_`command`_
  - to run process on any running container
  - ex: `docker exec ubuntu cat /etc/hosts`
    - to show hosts file on ubuntu container.
- `docker run -d `_`things`_
  - to run container detach from the console/in background.
  - to attach any running container that are detached to the current console(sick), just type `docker attach `_`things`_.
  - > move ke atas plz
- `docker stop $(docker ps -aq)`
  - to stop all running containers.
- `docker rm $(docker ps -aq)`
  - to remove all containers.
- `docker rmi $(docker images -aq)`
  - to remove all images.

## Source(s)

- [Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers](https://www.youtube.com/watch?v=fqMOX6JJhGo)
  - > last position, `27:05`
