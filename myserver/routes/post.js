const express = require('express');
const app = express.Router();
const fs = require('fs');
const dir = '/home/ec2-user/capstone/image/';
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post('/', (req, res, next) => {
   var body;
   var preData;
   var inputData;
   var totalData = "";
   var userId;

   // totalData = req.body;
   totalData = JSON.stringify(req.body);
   inputData = JSON.parse(totalData).encodedImage;
   userId = JSON.parse(totalData).loginId;
   
   if (!fs.existsSync(dir+userId)) {
        fs.mkdirSync(dir+userId);
   };

   fs.writeFile(dir+userId+"/input.txt", totalData, 'utf8', function(err){
        if (err) throw err;
        console.log('complete');
   });

   res.write("OK!");
   res.end();
});

module.exports = app;
