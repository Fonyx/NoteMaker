const notesRouter = require('express').Router();
const { readAndAppend, promiseReadFromFile } = require('../helpers/file.js');
const {v4: uuidv4} = require('uuid');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) => {
    promiseReadFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});
  
// POST Route for submitting note
notesRouter.post('/', (req, res) => {

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            //noteId: uuidv4(),
        };

        readAndAppend('./db/db.json', newNote);
        
        const response = {
            status: 'success',
            body: newNote,
        };
        
        res.json(response);
    } else {
        res.json('Error in posting feedback');
    }
});
  
module.exports = notesRouter;