const { Router } = require('express');
const routes = Router();

    const notes = require('../controllers/note.controller.js');
    
    // Create a new note
    routes.post('/notes', notes.index);

    // Retrieve all notes
    routes.get('/notes', notes.findAll);

    // Retrive a single note with noteId
    routes.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    routes.put('/notes/:noteId', notes.update);

    // Delete a note with noteID
    routes.delete('/notes/:noteId', notes.delete);

module.exports = routes;