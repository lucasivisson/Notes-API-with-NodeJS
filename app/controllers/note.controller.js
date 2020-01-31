const Note = require('../models/note.model.js');

module.exports = {
index(req, res) {
    if(req.body.content == null){
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    })
},

findAll (req, res) {
    Note.find().then((notes) => {
        res.send(notes)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error ocurred while retrieving notes."  
        })
    })
},

findOne (req, res) {
     Note.findById(req.params.noteId).then(note => {
         if(note == null){
             return res.status(400).send({
                 message: "Note not found with id "+ req.params.noteId
             });
         }
         res.send(note);
     }).catch(err => {
         if(err.kind === 'ObjectID'){
             return res.status(404).send({
                 message: "Note not found with id "+ req.params.noteId
             });
         }
         return res.status(500).send({
             message: "Error retrieving note with id " +req.params.noteId
         })
     })
},

update (req, res) {
    if(req.body.content == null){
        return res.status(200).send({
            message: "Note content can not be empty"
        });
    }

    Note.findOneAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content,
    }, {new: true}).then(note => {
        if(note == null){
            return res.status(404).send({
                message: "Note not found with id "+ req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(400).send({
                message: "Note not found with id "+ req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id "+ req.params.noteId
        });
    })
},

delete (req, res) {
    Note.findOneAndDelete(req.params.noteId).then(note => {
        if(note == null){
            return res.status(400).send({
                message: "Note not found with id "+ req.params.noteId
            });
        }
        res.send({ message: "Note deleted successfully" });
    }).catch(err => {
        if(err.kind == 'ObjectId' || err.name == 'NotFound'){
            return res.status(404).send({
                message: "Note not found with id "+req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete with id "+req.params.noteId
        });
    });
    }
}