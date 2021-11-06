var express = require('express')
var app = express()
var bodyParser = require('body-parser')

let axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userList = new Array();


let errorResponse;

axios({
    method: "get",
    url: "http://localhost:3000/users",
  }).then(function(resp) {

    for (var i = 0; i < resp.data.length; i++){
        userList.push(resp.data[i]);
    }

});

app.route('/users')
.get(function(req, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send(userList);
})
.post(function(req, res)
{

    if (!userList.find(e => e.name == req.body.name)){
        userList.push(req.body);

    } else {
        errorResponse = {
            error : true,
            codigo : 500,
            mensaje : 'The user has been created already'
        }
        res.status(500);
    }

    if (errorResponse) {
        var tempRes = errorResponse;
        errorResponse = undefined;
        res.send(tempRes);
    }
    res.send(userList);
});

app.listen(8080)