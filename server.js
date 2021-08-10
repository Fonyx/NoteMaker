const express = require('express');
const path = require('path');
const indexRouter = require('./routes/indexRoute');
const colorLog = require('./middleware/colorLog.js');

const PORT = process.env.PORT || 3001;

const app = express();

// use the middleware color logger
app.use(colorLog);

// setup app parameters for accepting json and set url encoding
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', indexRouter);

// open the public folder access
app.use(express.static('./public'));

// get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// get route for homepage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Start the app
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


