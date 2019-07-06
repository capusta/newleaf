const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

var port = process.env.PORT;
var server = app.listen(port,() => {
    console.info("Listening on "+server.address().port)
})