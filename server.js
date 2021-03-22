const express = require('express')
const cors = require('cors');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express()
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
var PORT = 8888;
var SSLPORT = 8889;
app.use(cors())

app.use(express.json({type: 'application/json'}))
app.use(express.static('public')); // for serving the HTML file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".mp4")
  }
})
var upload = multer({storage});
var type = upload.single('upl');

app.post('/api/test', type, function (req, res) {
   console.log(req.body);
   console.log(req.file);
   // do stuff with file
   res.send({
     url: `http://192.168.31.80:8888/uploads/${req.file.filename}`,
   })
});

app.get('/', type, function (req, res) {
  res.send('hello!')
});

// var upload = multer({ dest: __dirname + '/public/uploads/' });
// var type = upload.single('video');
// app.post('/api/test', function (req, res) {
//   console.log(req.body);
//    console.log(req.file);
//   res.send('POST request to the homepage')
// })

httpServer.listen(PORT, function() {
  console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

//创建https服务器
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});