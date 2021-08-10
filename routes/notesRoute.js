const notesRouter = require('express').Router();
const { promiseReadAndAppend, promiseReadFromFile } = require('../helpers/file.js');
const {v4: uuidv4} = require('uuid');

// GET Route for retrieving all the notes
notesRouter.get('/', (req, res) => {
    promiseReadFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
  
// POST Route for submitting feedback
notesRouter.post('/', (req, res) => {
// Log that a POST request was received
console.info(`${req.method} request received to submit feedback`);

// Destructuring assignment for the items in req.body
const { email, feedbackType, feedback } = req.body;

// If all the required properties are present
if (email && feedbackType && feedback) {
    // Variable for the object we will save
    const newFeedback = {
    email,
    feedbackType,
    feedback,
    feedback_id: uuidv4(),
    };

    promiseReadAndAppend(newFeedback, './db/feedback.json');

    const response = {
    status: 'success',
    body: newFeedback,
    };

    res.json(response);
} else {
    res.json('Error in posting feedback');
}
});
  
module.exports = notesRouter;