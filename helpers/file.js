const fs = require('fs');
const utils = require('util');

/**
 * make a promise version of fs.readFile since readFile is asynchronous but doesn't return a promise
 */
const promiseReadFromFile = utils.promisify(fs.readFile);

/**
 * Function that stringifies and writes some json data to a specified path
 * @param {string} path 
 * @param {jsonObject} content 
 */
const writeToJsonFile = (path, content) =>{
    fs.writeFile(path, JSON.stringify(content, null, 2), (err) => 
        err ? console.error(err) : console.info(`\nJson Data successfully written to ${path}`)
    );
}

/**
 * function that reads content of a json file, appends a content object to the similar list, then saves
 * @param {string} path string 
 * @param {jsonObject} content jsonObject
 */
const readAndAppend = (path, content) => {
    promiseReadFromFile(path, 'utf-8', (err, data) => {
        if(err){
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToJsonFile(path, parsedData)
        }
    })
}

/**
 * function that deletes the note with id argument
 * @param {id} id uuid v4
 */
const deleteNoteFromFile = (id) => {
    promiseReadFromFile('/db/db.json', 'w')
    .then((err, stringData) => {
        if(err){
            console.error(err);
        } else {
            const parsedData = JSON.parse(stringData);
            // filter out the note with the specific id
            let result = parsedData.filter((note) => note.id !== id);
            writeToJsonFile(result);
        }
    });
}

module.exports = {
    promiseReadFromFile,
    writeToJsonFile, 
    readAndAppend
}