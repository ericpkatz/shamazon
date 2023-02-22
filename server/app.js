const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());





app.use('/api/auth', require('./api/auth'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
