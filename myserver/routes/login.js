var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1103',
    database: 'test'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // render()는 views/index.pug(Jade) 로 title 변수 내용 전달.
    // 여기서 우리는 view를 사용할 것이 아니기 때문에 render() 사용 안함.
    
    console.log(req.url);
    console.log(req.body.id.toString());
    console.log(req.body.pw.toString());

    var id = req.body.id.toString();
    var password = req.body.pw.toString();

    connection.query('SELECT * FROM app_user WHERE id = ?', [id], function (error, results, fields) {
        if (error) {
            console.log("Query Error!", error);
            res.send("failed, error ocurred");
        } else {
            console.log("Response From Database", results);

            if (results.length > 0) {
                if (results[0].pw == password) {
                    res.status(200).send("success, login sucessfull");
                } else {
                    res.send("fail, Email and password does not match");
                }
            } else {
                res.send("fail, Email does not exists");
            }
        }
    });
});

module.exports = router;