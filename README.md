## Development env variables

`$ touch .env`

```
CLIENT_PUBLIC_PORT=3000
CLIENT_CONTAINER_PORT=3000

SERVER_PUBLIC_PORT=3001
SERVER_CONTAINER_PORT=3001
SERVER_UPLOAD_PATH=/app/files
SERVER_TOKEN_SECRET=Sb&6Q{~eTAKBFp;@HfbFC5C.f{C7k^VvE#Y65/.y
SERVER_PASSWORD_SECRET=BF#.cz@JXFGF63T6W**Wa6~c/ZZtGSP%69-;R8V;
SERVER_DOMAIN=http://localhost:3000
SERVER_SEO_UPDATE_SCHEDULE=0 0 * * *
SERVER_ENTITY_PAYLOAD=50mb

MONGO_USERNAME=each1teach1
MONGO_PASSWORD=each1teach1

MONGO_ROOT_USERNAME=root
MONGO_ROOT_PASSWORD=example

MONGO_APP_DATABASE=each1teach1

MONGO_EXPRESS_USERNAME=admin
MONGO_EXPRESS_PASSWORD=topsecret
MONGO_EXPRESS_PUBLIC_PORT=8081
```

## Run migrations

```
docker-compose exec server migrate up
```

## Create superuser

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Jannaten",
	"lastName": "Nayem",
	"email": "jannaten.nayem@tuni.fi",
	"password": "asdf123",
	"roles": ["superuser"],
	"active": true
}'
```

## Create teacher

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Emmanuel",
	"lastName": "Abruquah",
	"email": "emmanuel.abruquah@tuni.fi",
	"password": "asdf123",
	"roles": ["teacher"],
	"active": true
}'
```

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Henri",
	"lastName": "Annala",
	"email": "henri.annala@tuni.fi",
	"password": "asdf123",
	"roles": ["teacher"],
	"active": true
}'
```

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Ulkira",
	"lastName": "Rancken",
	"email": "ulkira.rancken@tuni.fi",
	"password": "asdf123",
	"roles": ["teacher"],
	"active": true
}'
```

## Create student

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Masood",
	"lastName": "Ahmadi",
	"email": "masood.ahmadi@tuni.fi",
	"password": "asdf123",
	"roles": ["student"],
	"active": false
}'
```

```
docker-compose exec -T server node manage createUsers <<< '
{
	"firstName": "Mafruha",
	"lastName": "Nuhari",
	"email": "mafruha.nuhary@tuni.fi",
	"password": "asdf123",
	"roles": ["student"],
	"active": false
}'

## VSCode rest-client env

`$ touch requests/.env`

```

SERVER=<your dev server e.g http://localhost:3001>
TOKEN=<get token: requests/login.rest>

```

## Convert Bootstrap SCSS to CSS

### More info at `frontend/src/styleConverter/README.md`

Related: [Watch and Compile Sass in Five Quick Steps](https://webdesign.tutsplus.com/tutorials/watch-and-compile-sass-in-five-quick-steps--cms-28275)

- Go to `frontend/styleConverter`
- Copy `default.scss` to `styles.scss`
- Make changes / overwrites to `styles.scss`
- Run `npm run scss`-command in frontend container
- Move generated _CSS_ file (`styles.css`) to server container's organization upload path

## Migrations

Package docs: [migrate-mongoose](https://github.com/balmasi/migrate-mongoose)

### Install migrate-mongoose on development

```

docker-compose exec server yarn global add migrate-mongoose

```

### Create migration file

```

docker-compose exec server migrate create <migration_name>

```

### Run single migration

```

docker-compose exec server migrate up <migration_name>

```

### Run all migrations

```

docker-compose exec server migrate up

```

## Server management CLI

`docker-compose exec server node manage.js help`

```

Usage: manage.js <command>

Ella management CLI

Options:
-h, --help display help for command

Commands:
createSuperuser Create user with superuser role.
changePassword <email> Change password.
createUsers Create user(s) from json input
refreshLocalizations Fetch localizations from Lokki and update database
getLocalizationFromLokki <locale> Fetch new localizations from Lokki by locale
refreshRealizations [path] Fetch realizations from sources and update database
createOrganization Create organization from json input
getOrganization <path> Get organization by path as json output
updateOrganization <path> Update organization from json input
createRealizationType <path> Create RealizationType from json input
createRealizationSource <path> Create RealizationSource from json input
updateSeo Update search engine optimization files
help [command] display help for command

```

```

```

```
