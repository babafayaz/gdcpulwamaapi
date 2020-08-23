
const express = require('express')
const app = express()
const path = require('path');
var cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
app.use(cors({
  origin: '*'
}));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const multer  = require('multer');
app.use('uploads', express.static(path.join(__dirname, '/attachments')));
const notifications =require('./routes/notifications');
const login = require('./routes/login')
app.use("/notifications", notifications);
app.use("/login", login)
app.get('/', (req, res) => {
  res.redirect('https://gdcpulwama.edu.in');

})

//multer file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'attachments');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
     
  }

});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg'|| file.mimetype =='image/png' || file.mimetype == 'application/pdf') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('file1'), (req, res, next) => {
  try {
   
  console.log(res.req.file.filename)
      return res.status(201).json({
          fileName: res.req.file.filename,
          message: 'File uploded successfully'
      });
  } catch (error) {
      console.error(error);
  }
});

app.listen(port, () => {
  console.log(`GDC app listening at http://localhost:${port}`)
})