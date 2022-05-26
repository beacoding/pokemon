var viewConfig = require('./config/view');
var errorConfig = require('./config/error');
var utilitiesConfig = require('./config/utilities');
var routesConfig = require('./config/routes');
var Sequelize = require('sequelize');

var express = require('express');

global.boxes = {};
global.party = {};
global.pokemon = {};

var app = express();

viewConfig(app);
utilitiesConfig(app);
routesConfig(app);
errorConfig(app);

module.exports = app;
