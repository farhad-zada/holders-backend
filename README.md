# Holders Collaborators Backend

Instruction to run the project:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Set up the environment variables in a `.env` file (see `.env.example` for reference)
4. Run `npx knex migrate:latest` to run the migrations if you are using a local database
5. Run `npx knex seed:run` to seed the database if you want example data
6. Run `npm start` to start the server