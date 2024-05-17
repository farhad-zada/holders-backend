const express = require('express');
const knex = require('./db/knex');
const bodyParser = require('body-parser');
const routes = require('./routes');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());

app.use(bodyParser.json());

app.use('/api', routes);


app.listen(port, () => {
    console.log(`\x1b[32mServer started on port ${port}\x1b[0m`);
});

