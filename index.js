//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require('path');
const ejs = require('ejs');
//const date = require(__dirname + "/date.js");
const app = express();
require("dotenv").config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Welcome to your todo list!", "Hit the + button to add a new item.", "<-- Hit this to delete an item."];
const lists = { "Today": items };

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index', { isPlural: false, params: [] });
});

app.get('/:params/:plural', function (req, res) {
    // const customLanguage = _.capitalize(req.params.customLanguage);
    const params = req.params.params.split('/');
    const isPlural = req.params.plural === 'p' ? true : false;
    res.render('index', { params, isPlural });
});


let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 3001;
}
app.listen(PORT, function () {
    console.log(`Server started on PORT ${PORT}...`);
});
