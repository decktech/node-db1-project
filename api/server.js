const express = require("express");

const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.use((err, req, res, next) => {
    let { status = 500, message = 'internal server error' } = err;
    res.status(status).json({ message: message });
  });

server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found'})
});

module.exports = server;
