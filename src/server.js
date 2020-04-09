require('@babel/register');

const cors = require('cors');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const parser = require('xml2js');
const path = require('path');
const { default: covid19ImpactEstimator } = require('./estimator');

const app = express();
const xmlBuilder = new parser.Builder();
const logsStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

app.use(cors());
app.use(morgan(':method  :url  :status  20ms', { stream: logsStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/v1/on-covid-19', (req, res) => res.status(200)
  .json(covid19ImpactEstimator(req.body)));

app.post('/api/v1/on-covid-19/:format', (req, res) => {
  const estimation = covid19ImpactEstimator(req.body);

  if (req.params.format === 'xml') {
    return res.contentType('application/xml')
      .status(200).send(xmlBuilder.buildObject(estimation));
  }

  return res.status(200).json(estimation);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  const streamLogs = fs.createReadStream(path.join(__dirname, 'logs.txt'));
  res.contentType('text/plain');
  streamLogs.pipe(res);
});

const port = Number.parseInt(process.env.PORT, 10) || 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});
