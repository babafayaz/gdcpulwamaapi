const express = require('express')
const app = express()
var cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const notifications =require('./routes/notifications');
const login = require('./routes/login')
app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notifications", notifications);
app.use("/login", login)

app.get('/', (req, res) => {
  res.redirect('https://gdcpulwama.edu.in');
})

app.listen(port, () => {
  console.log(`GDC app listening at http://localhost:${port}`)
})