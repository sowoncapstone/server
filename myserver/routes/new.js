var express = require('express');
var router = express.Router();
const fs = require('fs');
var dir = '/home/ec2-user/capstone/image/';

router.post('/', function (req, res, next) {
    console.log('receiving new photo');
    var preData; // whole data received from Anroid
    var inputData; // encoding value of Image
    var userId; // user ID
    var folder;
    var filename;

    request.on('error', (err) => {
        console.error(err);
    }).on('data', (data) => {
        preData = data.toString();
        inputData = JSON.parse(preData).encodedImage;
        userId = JSON.parse(preData).loginId;

        if (!fs.existsSync(dir+userId)) {
            fs.mkdirSync(dir+userId);
        };

        fs.appendFile(dir+userId+"input.txt", inputData, 'utf8', function (err) {
            if (err) throw err;
            console.log('receiving complete');
        });
        
    }).on('end', () => {
        console.log('ended');
        res.on('error', (err) => {
            console.error(err);
        });

        res.write("OK!"); // 다시 안드로이드로 응답 전송! 파이썬 스크립트로 클래시피케이션 결과 전송시 사용 가능
        res.end();
    });
});

module.exports = router;
