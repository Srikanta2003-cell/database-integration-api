# Database Integration REST API

A simple REST API built with **Node.js, Express.js, and MySQL** to manage user data.

## Features

- Create users
- Get all users
- Get user by ID
- Update users
- Delete users
- MySQL database integration
- REST API testing with Postman

## Tech Stack

- Node.js
- Express.js
- MySQL
- SQL
- Postman

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check API status |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

## Run Locally

```bash
npm install
node server.js