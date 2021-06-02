# autochek-distance-api

The API creates location records

# Database used
MySQL

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


