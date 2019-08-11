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

router.post('/', function (req, res, next) {
    console.log(req.url);
    console.log(req.body.id.toString());
    console.log(req.body.pw.toString());

    var id = req.body.id.toString();
    var password = req.body.pw.toString();

    var user = {
        "id": id,
        "pw": password
    }

    connection.query('INSERT INTO app_user SET ?', user, function (error, results, fields) {
        if (error) {
            console.log("Query Error!", error);
            res.send("failed, error ocurred");
        } else {
            console.log("Response From Database", results);
            res.status(200).send("success, user registered sucessfully");
        }
    });
});

module.exports = router;