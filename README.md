<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


# NestJS Controllers and Main Application Setup
This is a project for practice, that I used Nestjs, Docker, PostgreSQL running on Docker, Adminer also on docker for database access and TypeORM.

This repository contains the code snippets for various controllers and the `main.ts` file that configure and run a NestJS application and will be running on port 3000.



## Files

### Training.controller.ts

Controller handling school-related training actions.

**Endpoints:**

- `POST /school/create`: Create and save relations between subjects and teachers.
- `POST /school/remove`: Update subjects by setting their name to 'Confidential'.

### Events.controller.ts

Controller managing event-related actions, including creation, updating, and deletion.

**Endpoints:**

- `GET /events`: Get a list of all events.
- `GET /events/:id`: Get a specific event by ID.
- `POST /events`: Create a new event (authentication required).
- `PATCH /events/:id`: Update an event's details.
- `DELETE /events/:id`: Delete an event by ID (returns status code 204).


### User.controller.ts

Controller responsible for user-related actions, such as user registration.

**Endpoints:**

- `POST /users`: Create a new user. Validates and saves user data, returning a token upon successful registration.

### Auth.controller.ts

Controller handling authentication-related actions like login and user profile retrieval.

**Endpoints:**

- `POST /auth/login`: Log in with user credentials and receive a token.
- `GET /auth/profile`: Get the user's profile information using a valid token.

### main.ts

Main application entry point where the NestJS application is created and run.

## How to Use

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the application: `npm run start:dev`

Make sure to configure any environment variables or additional setup required by the application.

Examples of usage:
- `POST /users`:

```json
{
	"username":"M.A",
	"password":"StrongPassword",
	"retypePassword":"StrongPassword",
	"firstName":"M.A",
	"lastName":"M.A",
	"email":"M.A@email.com"
}
```
response:
```json
statuscode:200
{
	"username": "M.ALogin",
	"password": "$2b$10$8dMqK3VnKRn.aYHU1KWiSOy/8Ag4fgEmFqSv462c3N7PLxa/22ngm",
	"email": "M.A@email.com",
	"firstName": "M.A",
	"lastName": "M.A",
	"id": 4,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik0uQUxvZ2luIiwic3ViIjo0LCJpYXQiOjE2OTE3NTAwMjMsImV4cCI6MTY5MTc1MzYyM30.MK2qraPme32zmrCPaDLIW7GQk0J8_sOPKCMB8M8i5jg"
}
```

<br>

- `POST /auth/login`: Log in with user credentials and receive a token.
using:
```json
{
	"username":"M.ALogin",
	"password":"StrongPassword"
}
```

response:

```json
{
	"userId": 4,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik0uQUxvZ2luIiwic3ViIjo0LCJpYXQiOjE2OTE3NTAyNzgsImV4cCI6MTY5MTc1Mzg3OH0.ImQiQdz4yS7VH5KF-cupARQGiIg9C5Qr9KC6yX9tgjM"
}
```

- `GET /auth/profile`: Get the user's profile information using a valid token.
Using the previously generated token as Bearer we can access this endpoint

response:
```json
{
	"id": 4,
	"username": "M.ALogin",
	"password": "$2b$10$8dMqK3VnKRn.aYHU1KWiSOy/8Ag4fgEmFqSv462c3N7PLxa/22ngm",
	"email": "M.A@email.com",
	"firstName": "M.A",
	"lastName": "M.A"
}
```

Events:

- `POST /events`: Create a new event (authentication required).
After loging in, use the token and

```json
{ 
  "name": "Event's name",
  "description": "Event's description",
  "when": "2023-03-30T01:00:00.000Z",
  "address": "XXXXXXXXXXXXX-XXXX"
}
```

response:
```json
{
	"name": "Event's name",
	"description": "Event's description",
	"when": "2023-03-30T01:00:00.000Z",
	"address": "XXXXXXXXXXXXX-XXXX",
	"organizer": {
		"id": 4,
		"username": "M.ALogin",
		"password": "$2b$10$8dMqK3VnKRn.aYHU1KWiSOy/8Ag4fgEmFqSv462c3N7PLxa/22ngm",
		"email": "M.A@email.com",
		"firstName": "M.A",
		"lastName": "M.A"
	},
	"id": 17
}
```
- `GET /events`: Get a list of all events.
response:
```json
	{
		"id": 17,
		"name": "Event's name",
		"description": "Event's description",
		"when": "2023-03-30T01:00:00.000Z",
		"address": "XXXXXXXXXXXXX-XXXX"
	}
```
- `GET /events/:id`: Get a specific event by ID.
id: 17
```json
{
	"id": 17,
	"name": "Event's name",
	"description": "Event's description",
	"when": "2023-03-30T01:00:00.000Z",
	"address": "XXXXXXXXXXXXX-XXXX"
}
```

- `PATCH /events/:id`: Update an event's details.
input:

```json
{ 
	"name": "Event's name Patched",
	"description": "Event's description",
	"when": "2023-03-30T01:00:00.000Z",
	"address": "XXXXXXXXXXXXX-XXXX"
}
```
response:
```json
{
	"id": 17,
	"name": "Event's name Patched",
	"description": "Event's description",
	"when": "2023-03-30T01:00:00.000Z",
	"address": "XXXXXXXXXXXXX-XXXX"
}
```
- `DELETE /events/:id`: Delete an event by ID (returns status code 204).
  events/17 
```json
response 204 No Content
```

## Contributing

Contributions are welcome! If you find any issues or improvements, please create a pull request or open an issue.

###Next Steps
- Authenticate all routes that needs to, right now only create event is authenticated
- Use events.service instead of repository on controller
- Better relations and use of TypeORM
- Implement a way of don't showing the user's password on get and responses

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
