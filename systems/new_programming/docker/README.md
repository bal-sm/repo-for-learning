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
    - `--entrypoint `_`things`_
      - to override the default entrypoint of the container.
      - ex: below [4]
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
- `docker build `_`path/to/Dockerfile`__`-t`__`my-docker-account/slick-nextjs`_
  - to build image from Dockerfile.
  - what is `-t`?
- `docker history `_`docker-container-name`_

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
  - `RUN` instruction
    - to specify which any command that should be ran.
    - ex: `RUN apt-get update -y`
      - to update `apt` repo.
  - `ENTRYPOINT` instruction
    - to specify a command that will be run when the image is run as a container.
    - ex: `ENTRYPOINT FLASK_APP=/opt/the_source_code/app.py flask run`
      - to run the web server using `flask` command.
  - `CMD instruction`
    - ...
    - > Please add.
    - `CMD `_`command `__`param1`_
    - `CMD `_`["command", "param1",...]`_
    - ex:
      - `CMD sleep 5`
      - ~~`CMD ["sleep 5"]`~~ `CMD ["sleep", "5"]`
  - `ENTRYPOINT instruction`
    - something selanjut dari `docker run some-app` jadi seperti ini (append)
    - ex: `ENTRYPOINT ["sleep"]` di `ubuntu-sleeper` `Dockerfile`
      - maka saat di run lewat terminal `docker run ubuntu-sleeper 10`
      - tapi kalo di `docker run ubuntu-sleeper` aja tanpa argument, maka error.
        - `sleep: missing operand` jadinya
      - maka liat bawah [3]


## Layers

[5]

Jadi gini:

```Dockerfile
# Layer 1, Base image, 120 MB
FROM ubuntu

# Layer 2, Changes in `apt` packages
RUN apt-get update && apt-get -y install python

# Layer 3, Changes in `pip` packages
RUN pip install flask flask-mysql

# Layer 4, Copy source code
COPY . /opt/the_source_code

# Layer 5, Update Entrypoint with `flask` command
ENTRYPOINT FLASK_APP=/opt/the_source_code/app.py flask run
```

> Liat geura docker history nya di menit ke 49:32
>
> sama docker build nya di menit ke 49:34

- Jadi apabila pada layer tertentu gagal, maka ketika di repair `Dockerfile` nya tapi instruksi di atas nya sama maka akan diambil dari cache.
  - Dan berguna pisan buat source code yang terus terupdate.

## CMD vs ENTRYPOINT

[3]

```Dockerfile
FROM Ubuntu

ENTRYPOINT ["sleep"]

CMD ["5"]
```

Penting pisan:
> `ENTRYPOINT` and `CMD` must be in `JSON` format.

to override argument of `5` tea:

```bash
docker run ubuntu-sleeper 7
```

> jadi `7`.

[4]
to override entrypoint:

```bash
docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

## Default networks

> 59:38, please add euy, pake graphic soalnya and very important.
>
> Masukin yang tentang network isolation, and very penting -> Embedded DNS

## Unwritten

...

## Storage

### Layered Architecture

Refer to [5].

When the image is used, then the container will be like this:

Layer 5   x
Layer 4   |
Layer 3   | Read-Only
Layer 2   |
Layer 1   ^

But if changes are made, then the container will be like this:

Layer 6   <--- Read-Write
Layer 5   x
Layer 4   |
Layer 3   | Read-Only
Layer 2   |
Layer 1   ^

### Volume

- `docker volume create data_volume`
- `docker run -v data_volume:/var/lib/mysql mysql`
  - > `data_volume` is the name of the volume.
  - > `/var/lib/mysql` is the path inside the container.
  - > You don't need to create volume first.

jadi directory-nya kayak gini:

```
/var/lib/docker
  - volumes
    - data_volume
```

- `docker run -v /data/mysql:/var/lib/mysql mysql`
  - If you want to use `bind mount` instead.
  - So the data in `/var/lib/mysql` will be stored in `/data/mysql` in the host.

New way of mounting volume:

```bash
docker run \
--mount type=bind,source=/data/mysql,target=/var/lib/mysql mysql
```

> Read [more](?) about Storage Drivers, such as AUFS, ZFS, Btrfs, Device Mapper, Overlay, Overlay2, etc.

Mine:
> Hm dimana ya linknya

## Docker Compose

From this:

```bash
docker run mmushad/simple-webapp
```

```bash
docker run mongodb
```

```bash
docker run redis:alpine
```

```bash
docker run ansible
```

To this:

`docker-compose.yaml`:

```yaml
services:
  web:
    image: "mmushad/simple-webapp"
  database:
    image: "mongodb"
  messaging:
    image: "redis:alpine"
  orchestration:
    image: "ansible"
```

then, to bring up the entire application stack, just run:
`docker-compose up`

## Source(s)

[1]: [Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers](https://www.youtube.com/watch?v=fqMOX6JJhGo)
  - > last position, `1:06:14`

## Learning in Progress

Note 1:
> How to apply things like `-v` volume mapping, `-p` port mapping, etc, while the container isn't running without using `docker run` command?

[2]

Note 2:
> gimana ya PostgreSQL nya? apa image nya terpisah? atau gimana ya? terus kan ada binary pyscopg2. terus ada network mode tea.

Jawaban:
> iya dipisah aja.

Note 3:
> hm pake redis gak ya? soalnya bayar lagi euyy, tapi takut bikin lemot kalo enggak pake, belajar dulu aja django + redis cache.
