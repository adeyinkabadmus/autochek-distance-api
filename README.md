# autochek-distance-api

The API creates location records

# Database used
MySQL

# ORM used
Prisma

# Create database
Create a mysql database

Import the sql schema file located in the /db directory

Change mysql connection string in /prisma/.env

Example :
  DATABASE_URL="mysql://username:password@localhost:3306/database"

# import database schema 
# Installation

```bash
Run npm install

npx prisma introspect

npx prisma generate
```

# Run server

```bash
Run npm run start
```

# Query API

Find in the test.rest file in the base directory query samples for all endpoints

# Unfinished areas

User update

There is a seperate table for users so that information belongs to only entities that should own them.

An endpoint is required for user update to update the user information but was not completed due to time constraint

Unit tests were also not written due to time constraints

# Things of note

There was only dependy injection largely in use and many of the methods/functions were written with the Single responsibility principle mind.

For every HTTP response besides HttpStatus.OK (200), an exception is thrown with the appropriate status code hence the missing return statements for the methods where they were used although I do think now a wrapper exception class would have been a better choice for better readability.




