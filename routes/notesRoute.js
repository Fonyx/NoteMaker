const notesRouter = require('express').Router();
const { readAndAppend, promiseReadFromFile, deleteNoteFromFile } = require('../helpers/file.js');
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
            id: uuidv4(),
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

// delete route for removing a note given an id
notesRouter.delete('/:id', (req, res) => {
    console.log(req.params);

    // Check and see if there is a query parameter at all
    const hasParams = Object.keys(req.params).length > 0;

    // handle delete if hasParams
    if(hasParams){
        let id = req.params.id;
        deleteNoteFromFile(id);
        const response = {
            status: 'removed',
            body: id,
        };
        
        res.json(response);
    }else{
        res.json(`Failed to delete note`);
    }




})
  
module.exports = notesRouter;