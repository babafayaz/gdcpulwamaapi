const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;


// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('https://gdcpulwama.edu.in');
})
app.get('/test', (req, res) => {
  res.redirect('https://test.edu.in');
})
app.listen(port, () => {
  
})