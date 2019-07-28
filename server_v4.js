const express = require('express');
const fs = require('fs');
const app = express();

let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]


app.get('/users', (req, res) => {
   console.log('who get in here/users');
   res.json(users)
});

app.post('/post', (req, res) => {
   console.log('who get in here post /users');
   fs.writeFile("input.txt", "", 'utf8', function(err){
      if (err) throw err;
   });
   var body;
   var preData;
   var inputData;

   req.on('data', (data) => {
     preData = data.toString();
     inputData = JSON.parse(preData).encodedImage;
     fs.appendFile("input.txt", inputData, 'utf8', function(err){
        if (err) throw err;
        console.log('complete');
     });
   });
   req.on('end', () => {
    fs.rename("input.json", "~/capstone/classification/input.json", function(err){
       if (err) throw err;
       console.log('ended');
    });
  });

  res.write("OK!");
  res.end();
});

app.listen(3000, () => {
 console.log('Example app listening on port 3000!');
});
