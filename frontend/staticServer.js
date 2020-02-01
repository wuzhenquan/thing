const express = require('express');
const path = require('path');
const app = express();
const newPath = path.join(__dirname, '/React/build')

app.use(express.static(newPath));
app.get('/*', function(req, res) {
  res.sendFile(path.join(newPath, 'index.html'));
});
app.listen(80);