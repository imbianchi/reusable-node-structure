const hapi = require('@hapi/hapi');
const Server = require('@src/server');


new Server(hapi).init();