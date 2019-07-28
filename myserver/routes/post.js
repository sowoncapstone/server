var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
    console.log('recieving new photo');
    fs.writeFile("input.txt", "", 'utf8', function (err) {
        if (err) throw err;
    });
    var preData;
    var inputData;

    req.on('data', (data) => {
        preData = data.toString();
        inputData = JSON.parse(preData).encodedImage;
        fs.appendFile("input.txt", inputData, 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        });
    });
    req.on('end', () => {
        fs.rename("input.json", "~/capstone/classification/input.json", function (err) {
            if (err) throw err;
            console.log('ended');
        });
    });
    res.write("OK!");
    res.end();
});

module.exports = router;
