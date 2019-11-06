const express = require('express');
const Sequalize = require('sequelize');

var user = require('./models/user')

var path = require('path');
var bodyParser = require('body-parser');

const app = express()
const port = 8001;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.post('/register', function(req, res){
    console.log(req);
    // For get method use the req.query.names for getting the parameter in the get method
    var names = req.body.names;
    var bios = req.body.bios;
    var pass = req.body.pass;
    console.log(names);
    console.log(bios);
    console.log(pass);
    user.create({
        name: names,
        bio: bios,
        password: pass
    })
    res.send("Data inserted into the database")
})

app.post('/login', function(req, res){
    user.findAll({
        where: {
            name: "Ritesh",
            password: "qwerty"
        }
    })
    .then((result) => res.json(result))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))