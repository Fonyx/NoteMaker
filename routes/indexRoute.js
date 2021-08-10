const express = require('express');

// Import router for notes logic
const notesRouter = require('./notesRoute');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
