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
    - `--link `_`something:something`_
      - > Let's READ MORE(...). Apparently, it isn't available in `podman`. Whatever, `podman-compose`.
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

### Sample application - voting application

voting-app with `Python` > in-memory DB with `Redis` > worker with `.NET` > db with `PostgreSQL` > result-app with `Node.js`

#### Deploy with `run` commands

- `docker run -d --name=redis redis`
- `docker run -d --name=db postgres:9.4`
- `docker run -d --name=vote -p 5000:80 voting-app`
- `docker run -d --name=result -p 5001:80 result-app`
- `docker run -d --name=worker worker`

> But it will display error, 'cause we haven't actually linked them together.

on the `voting-app` code:

```py
def get_redis():
    if not hasattr(g, "redis"):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

Mine:
> remember that host=docker container name tea, tapi.... liat lagi, wait aing poho sumpah liat aja we yang networking tea

To make it aware of the `redis` container:
`docker run -d --name=vote -p 5000:80 --link redis:redis voting-app`

Nanti teh `cat /etc/hosts` dalem `voting-app` akan seperti ini:

```
...
172.17.0.2  redis 89cd8eb563da
...
```

- The adjustments:
  - `docker run -d --name=redis redis`
  - `docker run -d --name=db postgres:9.4`
  - `docker run -d --name=vote -p 5000:80 --link redis:redis voting-app`
  - `docker run -d --name=result -p 5001:80 --link db:db result-app`
  - `docker run -d --name=worker --link db:db --link redis:redis worker`

Mine:
> Skip, 'cause deprecated and buat apa anyway
>
> Kata anakku sayang, lewat docker-swarm ajah.

#### With `docker-compose`

Let's convert it to `docker-compose.yaml`:

```yaml
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
  - 5000:80
  links:
  - redis
result:
  image: result-app
  ports:
  - 5001:80
  links:
  - db
worker:
  image: worker
  links:
  - redis
  - db
```

tinggal `docker-compose up` deh.

## Docker Compose - Build

```yaml
redis:
  image: redis
db:
  image: postgres:9.4
vote:
```
~~`  image: voting-app`~~`build: ./vote`
```yaml
  ports:
  - 5000:80
  links:
  - redis
...
```

So it will build the Dockerfile inside that `vote` folder.

The `vote` folder:
- `...`
- `static/stylesheets`
- `templates`
- `Dockerfile`
- `app.py`
- `requirements.txt`

> on 1:28:14

## Docker Compose - versions

`docker-compose.yaml`, version 1:

```yaml
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
  - 5000:80
  links:
  - redis
```

Mine:
> Hm, I need to look up proper `yaml` spacing and indent euy.

- links is deprecated btw, becoz..

`docker-compose.yaml`, version 2:

```yaml
version: 2
  redis:
    image: redis
  db:
    image: postgres:9.4
  vote:
    image: voting-app
    ports:
    - 5000:80
```
~~`    links:`~~
~~`    - redis`~~
```yaml
    depends_on:
    - redis
```

- It's already attached automatically to default bridge network.
- `depends_on` biar jadi dulu `redis` containernya baru jalan `vote` container.

`docker-compose.yaml`, version 3:

```yaml
version: 3
  redis:
    image: redis
  db:
    image: postgres:9.4
  vote:
    image: voting-app
    ports:
    - 5000:80
```

- Is `depends_on` removed?

Mine:
> Let's just read them in the [docs](...).

## Docker Compose - Networks

[7]

Let's blueprint the network design:

Front-end:
voting-app with `Python` .
result-app with `Node.js` .

Back-end:
- voting-app with `Python`, _backend part_ v
- in-memory DB with `Redis` v
- worker with `.NET` v
- db with `PostgreSQL` v
- result-app with `Node.js`, _backend part_ .

> Backend traffic, dedicated for traffic between applications.

Mine:
> And ofc, USERS won't be able to talk with back-end network.

jadi gini, `docker-compose.yaml`-nya:

```yaml
version: 2
services:
  redis:
    image: redis
    networks:
      - back-end
  db:
    image: postgres:9.4
    networks:
      - back-end
  vote:
    image: voting-app
    networks:
      - front-end
      - back-end
  result:
    image: result-app
    networks:
      - front-end
      - back-end
  worker:
    image: worker
    networks:
      - back-end
networks:
  front-end:
  back-end:
```

> excluded, the `ports` properties, but is it even necessary? hm [9].
>
> Again, let's refer to the docs!
>
> Nanti kalo udah beres vid nya.

## Docker Registry

- `docker run nginx`
  - then, it must be:
    - `image: nginx`
      - which then corrected to `image: docker.io/nginx/nginx`
        - what is it? 
          - `docker.io` is the location where the `nginx` image pulled from, it's the DNS name of Docker Hub, Docker's default registry,
            - other examples of public registries are:
              - `gcr.io` from Google, which Kubernetes, Kubernetes, related, gitu,
              - `quay.io` is the DNS name of Quay.io, a popular public registry, made by Red Hat,
            - ada juga private registries, yang disediakan oleh `AWS`, `Azure`, `GCP`,
            - tapi public registries juga da menyediakan private repositories.
          - `nginx` is the organization/user/account, 
          - `nginx` is the image/repository name.
    - ~~[10] euy.~~ just kidding anjing gak sabaran aing teh.
- login to Docker Hub with `docker login private-registry.io`
  - jadi langsung set aja `docker run private-registry.io/apps/internal-app`

### Deploy Private Registry

Docker Hub itself is a Docker container which available as `registry` image.

- `docker run -d -p 5000:5000 --name registry registry:2`
- `docker image tag my-image localhost:5000/my-image`
  - to tag the image, so it can be pushed to the registry.
- `docker push localhost:5000/my-image`
  - to push it, just like `git push`.
- `docker pull localhost:5000/my-image`
- `docker pull 192.168.56.100:5000/my-image`

## Docker Engine

Docker Engine is a client-server application with these major components:
- Docker Daemon;
  - which control and manage images, containers, etc;
- Docker REST API;
  - which serves API interfaces that programs can use to talk to Docker Daemon;
  - you could create your own tools using this REST API;
- Docker CLI;
  - which is the command line interface that talks to Docker Daemon through Docker REST API;

but you can access Docker REST API with Docker CLI on remote, for example:

```bash
docker -H=remote-docker-engine:2375
```

for example to run `nginx` container:

```bash
docker -H=10.123.2.1:2375 run nginx
```

## Containerization

...

> Sebelum 1:45:49

### cgroups - Allocate resources (CPU, memory, etc) to processes

- `docker run --cpus=.5 ubuntu`
- `docker run --memory=100m ubuntu`

Mine:
> Refer to the reference page cenah to read moreee in [here](...). Add plz.

Dari Gitjob Kolipot:
> [Resource contraints](https://docs.docker.com/config/containers/resource_constraints/).

## Docker on Windows

Mine:
> ditonton aja lah ya, soalnya dendam lama sama Windows.

## Docker on macOS

...

Mine:
> OmG, can't wait.

## Container Orchestration

Program:
> Sometimes when you feel like just want to.. you know exit lyfe.

Then, Program would be like:
> ERROR!

That's why we need to write some script, including (hm jeung sic) that create replicas across Docker host.

## Source(s)

[1]: [Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers](https://www.youtube.com/watch?v=fqMOX6JJhGo)
  - > last position, `1:39:59s`

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

Note 4:
> docker swarm?

Note 5:
> Don't ever use Arch image. Because:

w0330 (a redditor) says that:
> Arch is not used in more normal docker usecases because its rolling release nature conflicts with the whole premise of the Dockerfile being a largely consistent way to describe a container.

Mine:
> Read [more](https://www.reddit.com/r/archlinux/comments/u2he05/arch_in_docker_for_daily_use/).

Note 6:
> How to configure tab size for appropriate file type in Visual Studio Code? Soalnya goblog kok disini 2 space.

**Note [7]:** (Very, like Very Important, please move to `silk` `d_is_mine`)
> OHH jadi sebenernya biar processnya cepet teh da front end communicate dengan back end with multiple endpoint tea, misalnya Django kan backend sama frontend tuh tapi taro lah ya itu teh frontend nya nah nanti kalo ada Query API usage buat write sama read nah, nanti Django talk to an IP network misal 182.91.31.1 (capruk) yaitu PostgreSQL network. Kalo ada request banyak ya gak masalah. Apalagi nanti + ASGI/WSGI. ASGI donk pastinya soalnya ansynchronous gitu.
>
> berhubungan sama [7].

Note 8:
> Ih atuh ada gak ya git plugin yang ngecek langsung contents of the `md` file terus generate automatically commit messagenyaaa. Penting banget. atau gak aing yang nulis code nya. With Python aja. with git alias, jangan pre-commit, eh ketang gak tau nanti we
>
> ATAU GAK SEARCH AJA DULU WE BISI ADA.

Note [9]:
> What's even the point of `ports` properties, in next version of `docker-compose.yaml` anyway?

~~Note [10]:~~
~~> How podman handle it? Soalnya kan registry nya gak pake docker hub/multiple registry? Terus biar sesuai juga sama `Dockerfile`/`docker-compose.yaml` convention dari dockernya. Biar mau pake podman/docker jugak gak masalah.~~
