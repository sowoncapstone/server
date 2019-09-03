const express = require('express');
const bodyParser = require('body-parser')
const app = express.Router();
const fs = require('fs');
const dir = '/home/ec2-user/capstone/image/';

app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    var preData; // whole data received from Anroid
    var inputData; // encoding value of Image
    var userId; // user ID
    var folder;
    var filename;

    req.on('error', (err) => {
        console.error(err);
    }).on('data', (data) => {
        preData = data.toString();
        console.log(data);
        inputData = JSON.parse(preData).encodedImage;
        userId = JSON.parse(preData).loginId;

        if (!fs.existsSync(dir+userId)) {
            fs.mkdirSync(dir+userId);
        };

        fs.appendFile(dir+userId+"input.txt", inputData, 'utf8', function(err) {
            if (err) throw err;
            console.log('receiving complete');
        });

    }).on('end', () => {
        console.log('ended');
        res.on('error', (err) => {
            console.error(err);
        });

        res.write("OK!");
        res.end();
    });
});

module.exports = app;
