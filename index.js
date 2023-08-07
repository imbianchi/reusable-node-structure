const Server = require('./src/server');
const express = require('express');
const app = express;

new Server(app).init();