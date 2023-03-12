require('dotenv').config()
const express = require('express');
const cors = require("cors")
const morgan = require("morgan")
const path = require('path');

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

const router = require('./api')

app.use( express.static(path.join(__dirname, '../build')));


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../build/index.html')));

app.use('/api', router)

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
