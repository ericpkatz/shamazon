const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());




//const router = require("./api")
//app.use('/api', router)



app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
