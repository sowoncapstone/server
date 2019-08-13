var express = require('express');
var router = express.Router();
const fs = require('fs');

// the top directory of all user-named folers are going to be stored
var dir = './tmp';

// how to use python script in node
// Example 1
// const spawn = require('child_process').spawn;
// const pythonProcess = spawn('python',["path/to/script.py", arg1, arg2]);

// pythonProcess.stdout.on('data', (data) => {
// Do something with the data returned from python script
// });

// Example 2
// app.get('/example', (req, res) => {
//     const { spawn } = require('child_process');
//     const pyProg = spawn('python', ['./../pypy.py']);

//     pyProg.stdout.on('data', function(data) {
//         console.log(data.toString());
//         res.write(data);
//         res.end('end');
//     });
// })

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

        // 폴더는 여기서 만들어도 되고 파이썬 스크립트에서 만들어도 상관 없을 듯 합니다?
        // if there is no folder with userID, create the folder
        if (!fs.existsSync(dir+userId)) {
            fs.mkdirSync(dir+userId);
        };

        fs.writeFile(dir += "/input.txt", "", 'utf8', function (err) {
            if (err) throw err;
        });

        // input.txt only stores encoding value
        fs.appendFile(dir, inputData, 'utf8', function (err) {
            if (err) throw err;
            console.log('receiving complete');
        });

        // create new child process for python script
        const spawn = require('child_process').spawn;

        // BASE64 -> PNG
        // hand both encoding value & user ID to the python script
        const pythonProcess = spawn('python', ["./decode.py", inputData, userId]);
        pythonProcess.stdout.on('data', (chunk) => {
            // python script will send a string "decoding complete"
            console.log(chunk);
        });

        // PNG -> EMBEDDING(PICKLE)
        const pythonProcess2 = spawn('python', ["./embedding.py", dir, userId]);
        pythonProcess2.stdout.on('data', (chunk) => {
            // python script should create pickle file
            // or do something else
            console.log(chunk);
        });

        // PICKLE -> CLASSIFICATION

    }).on('end', () => {
        // fs.rename("input.json", "~/capstone/classification/input.json", function (err) {
        //     if (err) throw err;
        // });
        console.log('ended');
        res.on('error', (err) => {
            console.error(err);
        });

        // 긴 내용 전송해야한다면,
        // res.writeHead(200, {'Content-Type': 'application/json'})
        // const responseBody = { headers, method, url, body };
        // res.end(JSON.stringify(responseBody))

        res.write("OK!"); // 다시 안드로이드로 응답 전송! 파이썬 스크립트로 클래시피케이션 결과 전송시 사용 가능
        res.end();
    });
});

module.exports = router;
