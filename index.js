//jshint esversion:6
const express = require("express");
const accepts = require('accepts');
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    const accept = accepts(req);
    const userLang = accept.language(['en', 'es', 'ca', 'nl', 'pt']); // List the languages you support
    switch (userLang) {
        case 'en':
            res.render('index_en', { isPlural: false, params: [] }); // Render the English version of the HTML file
            break;
        case 'ca':
            res.render('index_ca', { isPlural: false, params: [] }); // Render the Catalan version of the HTML file
            break;
        case 'nl':
            res.render('index_nl', { isPlural: false, params: [] }); // Render the Dutch version of the HTML file
            break;
        case 'pt':
            res.render('index_pt', { isPlural: false, params: [] }); // Render the Portuguese version of the HTML file
            break;
        default:
            res.render('index', { isPlural: false, params: [] }); // Render the Spanish version (default) of the HTML file
    }

});

app.get('/:params/:plural/:family', function (req, res) {
    const params = req.params.params.split('/');
    const isPlural = req.params.plural === 'p' ? true : false;
    const isFamily = req.params.family === 'f' ? true : false;
    const accept = accepts(req);
    const userLang = accept.language(['en', 'es', 'ca', 'nl', 'pt']); // List the languages you support

    switch (userLang) {
        case 'en':
            res.render('index', { params, isPlural, isFamily }); // Render the English version of the HTML file
            break;
        case 'ca':
            res.render('index', { params, isPlural, isFamily }); // Render the Catalan version of the HTML file
            break;
        case 'nl':
            res.render('index', { params, isPlural, isFamily }); // Render the Dutch version of the HTML file
            break;
        case 'pt':
            res.render('index', { params, isPlural, isFamily }); // Render the Portuguese version of the HTML file
            break;
        default:
            res.render('index', { params, isPlural, isFamily }); // Render the Spanish version (default) of the HTML file
    }
});


let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 3001;
}
app.listen(PORT, function () {
    console.log(`Server started on PORT ${PORT}...`);
});
