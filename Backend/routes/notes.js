const express = require('express');
const routes = express.Router();
var fetchuser = require('../middalware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//   routes 1: get all the notes login detali, login require  


routes.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: ' internal Server error' });
    }

});

//routes 2:  all a new notes using post login detali, login require  

routes.post('/addnotes', fetchuser, [
    body('title', 'enter the valid title').isLength({ min: 3 }),
    body('description', 'descriptionmore then 5 char').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // const (title,description,tag)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const notes = new Notes({
                title, description, tag, user: req.user.id
            })
            const savenotes = await notes.save()

            res.json(savenotes)


        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: ' internal Server error' });
        }
    })

//routes 3:  update a notes using post login detali, login require  
routes.put('/notesupdata/:id', fetchuser ,async (req, res) => {
        const { title, description, tag } = req.body;

        try {
            const newNotes = {}
            if (title) { newNotes.title = title };
            if (description) { newNotes.description = description };
            if (tag) { newNotes.tag = tag };

            //find the to notes
            let notes = await Notes.findById(req.params.id);
            if (!notes) { return res.status(400).send("Not found") }

            if (notes.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
            res.json({ notes });

        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: 'internal Server error' });
        }
        //create a new notes 


    })

//routes 3:  Delete notes  
routes.delete('/deletenotes/:id', fetchuser, [
    body('title', 'enter the valid title').isLength({ min: 3 }),
    body('description', 'descriptionmore then 5 char').isLength({ min: 5 }),], async (req, res) => {
        try {
            const newNotes = {}
            //find the to notes deleted anf deledted
            let notes = await Notes.findById(req.params.id);
            if (!notes) { return res.status(400).send("Not found") }

            //allow deletion onliy id user this noted
            if (notes.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            notes = await Notes.findByIdAndDelete(req.params.id, { $set: newNotes }, { new: true })
            res.json({ "success": "notes has been deleted", noted: notes });

        } catch (error) {
            console.error(error.message);
            res.status(500).send({ message: ' internal Server error' });
        }
    })



module.exports = routes;