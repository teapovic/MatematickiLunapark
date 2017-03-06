var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

// view engine setup
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname)));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home');
});
var temaUcimoBrojeve = 'more';
var nextTemaUcimoBrojeve = 'svemir';
var temaLaganoOduzimanje = 'more';
var nextTemaLaganoOduzimanje = 'svemir';
var temaLaganoZbrajanje = 'more';
var nextTemaLaganoZbrajanje = 'svemir';
var temaTeskoZbrajanje = 'police';
var nextTemaTeskoZbrajanje = 'ploca';
var temaTeskoOduzimanje = 'police';
var nextTemaTeskoOduzimanje = 'ploca';


app.get(['/ucimo-brojeve', '/ucimo-brojeve/:tema'], function (req, res) {
    if (req.params.tema != undefined) {
        if ('svemir' == req.params.tema) {
            temaUcimoBrojeve = 'svemir';
            nextTemaUcimoBrojeve = 'suma';
        } else if ('suma' == req.params.tema) {
            temaUcimoBrojeve = 'suma';
            nextTemaUcimoBrojeve = 'more';
        } else {
            temaUcimoBrojeve = 'more';
            nextTemaUcimoBrojeve = 'svemir';
        }
    }
    res.render("ucimo_brojeve", {tema: temaUcimoBrojeve, sljedecaTema: nextTemaUcimoBrojeve});
});

app.get(['/lagano-zbrajanje', '/lagano-zbrajanje/:tema'], function (req, res) {
    if (req.params.tema != undefined) {
        if ('svemir' == req.params.tema) {
            temaLaganoZbrajanje = 'svemir';
            nextTemaLaganoZbrajanje = 'suma';
        } else if ('suma' == req.params.tema) {
            temaLaganoZbrajanje = 'suma';
            nextTemaLaganoZbrajanje = 'more'
        } else {
            temaLaganoZbrajanje = 'more';
            nextTemaLaganoZbrajanje = 'svemir'
        }
    }
    res.render("lagano_zbrajanje", {tema: temaLaganoZbrajanje, sljedecaTema: nextTemaLaganoZbrajanje});
});

app.get(['/lagano-oduzimanje', '/lagano-oduzimanje/:tema'], function (req, res) {
    if (req.params.tema != undefined) {
        if ('svemir' == req.params.tema) {
            temaLaganoOduzimanje = 'svemir';
            nextTemaLaganoOduzimanje = 'suma';
        } else if ('suma' == req.params.tema) {
            temaLaganoOduzimanje = 'suma';
            nextTemaLaganoOduzimanje = 'more'
        } else {
            temaLaganoOduzimanje = 'more';
            nextTemaLaganoOduzimanje = 'svemir'
        }
    }
    res.render("lagano_oduzimanje", {tema: temaLaganoOduzimanje, sljedecaTema: nextTemaLaganoOduzimanje});
});

app.get(['/tesko-zbrajanje', '/tesko-zbrajanje/:tema'], function (req, res) {
    if (req.params.tema != undefined) {
        if ('ploca' == req.params.tema) {
            temaTeskoZbrajanje = 'ploca';
            nextTemaTeskoZbrajanje = 'police'
        } else {
            temaTeskoZbrajanje = 'police';
            nextTemaTeskoZbrajanje = 'ploca';
        }
    }
    res.render("tesko_zbrajanje", {tema: temaTeskoZbrajanje, sljedecaTema: nextTemaTeskoZbrajanje});
});

app.get(['/tesko-oduzimanje', '/tesko-oduzimanje/:tema'], function (req, res) {
    if (req.params.tema != undefined) {
        if ('ploca' == req.params.tema) {
            temaTeskoOduzimanje = 'ploca';
            nextTemaTeskoOduzimanje = 'police'
        } else {
            temaTeskoOduzimanje = 'police';
            nextTemaTeskoOduzimanje = 'ploca';
        }
    }
    res.render("tesko_oduzimanje", {tema: temaTeskoOduzimanje, sljedecaTema: nextTemaTeskoOduzimanje});
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
