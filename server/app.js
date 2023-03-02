const express = require('express');
const cors = require("cors")
const morgan = require("morgan")

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))



const router = require('./api')
app.use('/api', router)

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
