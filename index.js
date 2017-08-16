const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const participants = [{
  name: 'John Doe',
  age: '25',
  siblings: 'no',
  geneticMutations: '1',
  environmentalExposures: '1',
  reviewed: 'Reviewed -- Not Accepted'
},
{
  name: 'Jane Doe',
  age: '20',
  siblings: 'yes',
  geneticMutations: '2',
  environmentalExposures: '2',
  reviewed: 'Not Reviewed'
}]

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '.', 'build')));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route('/api/participants')
  .get((req, res, err) => {
    res.send(participants);
  })
  .post((req, res, err) => {
    participants.push(req.body);
    res.send(req.body);
  })
  .put((req, res, err) => {
    const participant = participants[req.body.idx];
    participant.reviewed = req.body.reviewed;
    res.send({participant, idx: req.body.idx});
  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});