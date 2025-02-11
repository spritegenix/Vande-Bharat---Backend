# Vande Bharat

## Overview

Vande Bharat is a backend service designed for efficient and scalable data management. It provides a structured database schema, API endpoints, and authentication mechanisms to support seamless operations.

## Features

- **Structured Database**: Normalized schema for efficient data management.
- **Authentication**: Secure user authentication with JWT.
- **Admin Roles & Permissions**: Granular access control.
- **Logging & Monitoring**: Built-in support for monitoring system activities.
- **RESTful API**: Well-structured API endpoints for seamless communication.

## Tech Stack

- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **API Client**: Axios with TanStack Query (for frontend integration)

## Installation

```sh
yarn install
yarn run build
yarn run start
```

## Environment Variables

Create a `.env` file and add the following:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key
```

## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | /auth/login  | User login        |
| POST   | /auth/signup | User registration |
| GET    | /users       | Fetch all users   |
| GET    | /users/:id   | Fetch user by ID  |

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.
