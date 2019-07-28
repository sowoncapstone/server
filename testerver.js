const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1103',
        database : 'test'
});

connection.connect(function(err){
        if(!err) {
                console.log("Database is connected ... nn");
        } else {
                console.log("Error connecting database ... nn");
        }
});


app.post('/login', function (req, res) {
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

                        if(results.length > 0) {
                                if(results[0].pw == password) {
                                        res.status(200).send("success, login sucessfull");
                                } else {
                                        res.send("fail, Email and password does not match");
                                }
                        } else {
                                res.send("fail, Email does not exists");
                        }
                }
        });

})
app.post('/register', function (req, res) {
        console.log(req.url);
        console.log(req.body.id.toString());
        console.log(req.body.pw.toString());

        var id = req.body.id.toString();
        var password = req.body.pw.toString();

        var user = {
                "id": id,
                "pw": password
        }

        connection.query('INSERT INTO app_user SET ?' , user, function (error, results, fields) {
                if (error) {
                        console.log("Query Error!", error);
                        res.send("failed, error ocurred");
                } else {
                        console.log("Response From Database", results);
                        res.status(200).send("success, user registered sucessfully");
                }
        });

})


app.listen(PORT, () => console.log('Express server currently running on port 3000'));
