import express from "express"
import { createNote, getAllNotes, deleteNote } from "../controller/notes.controller.js"

const router = express.Router()
router.post('/create-note', createNote)
router.get('/get-all-notes', getAllNotes)
router.delete('/:id', deleteNote);


export default router