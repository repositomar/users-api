## Description
API for users

## Requirements
* Docker
* NVM

## First steps
> **Create `.env` file at the root project with the environment variables:**

The connection to mysql was made in a Linux environment, for another operating system it may be different.
```sh
DATABASE_URL='mysql://root:password@localhost:3306/users-db'
API_KEY='e9ed7e43-5ce9-91d6-a9ff9-6bf934e16srtfa8a'
GHIBLI_API='https://ghibliapi.vercel.app/'
```
> **Run the following command to run MySQL in docker container:**
```bash
$ docker-compose up -d
```
> **Run the following commands to setup node environment:**

This will install the node version required for this project.
```bash
$ nvm install 
```

This will set as current node version the required version for this project.
```bash
$ nvm use 
```

This will install the project dependencies.
```bash
$ npm install
```

This will create the corresponding tables in the database.
```bash
$ npx prisma migrate dev --name init 
```

## Running the app
This command will start the server, the application will run on `port 3000`

```bash
# development
$ npm run start
```

## Getting started

> Is required to send the value of the API_KEY environment variable in the authorization header of each request, if not sent it will respond as unauthorized.

> A `banPay.postman_collection.json` file with a postman collection is attached to the root project, showing the operation of each endpoint.



### Create user
> It is necessary to send Json body in the request with the name, email and role of the user.

```bash
Verb: POST
http://localhost:3000/users
```

### Get all users
> It is optional to send Query Param `limit`, `page` and `order` (1 = asc, -1 = desc) to return data paginated and ordered by name.

```bash
Verb: GET
http://localhost:3000/users?limit=10&page=0&order=1
```

### Get user
> It is necessary to send Path Variable `userId`.

```bash
Verb: GET
http://localhost:3000/:userId
```

### Update user
> It is necessary to send Path Variable `userId` and Json body with the data to update

```bash
Verb: PUT
http://localhost:3000/:userId
```

### Delete user
> It is necessary to send Path Variable `userId`.

```bash
Verb: DELETE
http://localhost:3000/:userId
```

## Further work
* Do integration tests.
* Cache the API response to improve performance and have faster response times.
* Implement rate limited to protect access to resources.