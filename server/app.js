require('dotenv').config()
const express = require('express');
const morgan = require("morgan")
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'))

const router = require('./api')

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/images', express.static(path.join(__dirname, '../public', 'images')));
app.use( express.static(path.join(__dirname, '../public')));


app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api', router)

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
