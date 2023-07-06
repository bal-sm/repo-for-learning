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
    - `-p `_`port:port`_
      - to map port from the container to the host.
      - ex: `docker run -p 80:5000`
        - to map port 5000 from container to port 80 on host.
          - So, it will be accessible by typing `0.0.0.0:80` on the browser.
      - > 36:36 of [1].
    - `-v `_`(dir of host):(dir of the docker container) `__`docker-app-name`_
      - to map volume from the host to the container.
      - ex: `docker run -v /opt/datadir:/var/lib/mysql mysql`
        - to map `/opt/datadir` from host to `/var/lib/mysql` on the container.
    - `-e `_`key=value `__`docker-app-name`_
      - to set environment variable on the container.
      - ex: `docker run -e APP_COLOR=blue simple-webapp-color`
        - to set environment variable `APP_COLOR` to `blue` on the container.
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
- `docker inspect `_`docker-app-name`_
  - to inspect the container with `json` formatted output.
- `docker logs `_`docker-app-name`_
  - to show logs of the container.

## How to create your own image

> OmG, this v important. ma silk.

- Why?
  - Because, I want to dockerize my own app that I built with love.
  - Because, my preferred set of tools doesn't exist on docker hub yet.

### Example

#### Manual instructions example

1. Use `Ubuntu` image as a base
2. Update `apt` repo
3. Install dependencies using `apt`
4. Install `Python` dependencies using `pip`
5. Copy our app source code to `/opt` directory
6. Run the web server using `flask` command

#### The `Dockerfile` example

```Dockerfile
FROM ubuntu:latest

# kenapa ya dikasih tau sama gitjob kolipot nya harus pake `-y`?
RUN apt-get update -y 
RUN apt-get install -y python3 python3-pip python3-dev build-essential
# dari vid nya -> RUN apt-get install python

RUN pip install flask
RUN pip install flask-mysql

# [2] kalo dari git, apa COPY juga? atau mending git clone aja eh wait da dockerfile nya kan dimasukkin source code jugak
COPY . /opt/the_source_code

ENTRYPOINT FLASK_APP=/opt/the_source_code/app.py flask run
# liat we di django gimana biar gak pake `manage.py` barina ge salah da yah kalo ngandelin `manage.py`
```

### The `Dockerfile` explanation

- `Dockerfile`
  - terdiri dari dua bagian:
    - `INSTRUCTION`, such as `FROM`, `RUN`, `COPY`, `ENTRYPOINT`, etc.
    - `ARGUMENT`, such as `ubuntu:latest`, `apt-get update -y`, `pip install flask`, etc.
  - must start with `FROM` instruction.
  - `FROM` instruction
    - to specify the base image.
    - ex: `FROM ubuntu:latest`
      - > of course, `fedora` is the best donk, y g.

## Source(s)

[1]: [Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers](https://www.youtube.com/watch?v=fqMOX6JJhGo)
  - > last position, `27:05`

## Learning in Progress

Note 1:
> How to apply things like `-v` volume mapping, `-p` port mapping, etc, while the container isn't running without using `docker run` command?

[2]
