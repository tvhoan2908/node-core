## Descriptions
- Project Core for NodeJS System

## System Requirements
- Node 18 or higher
- Mysql 8
- MongoDB
- Typescript

## Getting started
```sh
$ Copy .env.example to .env
$ Change .env_docker, run: sudo docker compose --env-file .env_docker up -d
$ npm install
$ npm run start:dev
```

## Migrations
```sh
$ eg: npm run make:migration src/databases/migrations/user/createUsersTable
$ npm run migrate:up
```