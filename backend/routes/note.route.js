import express from "express"
import { createNote, getAllNotes, deleteNote, searchNotes } from "../controller/notes.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
// import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()
router.post('/create-note', authMiddleware, createNote); 
router.get('/get-all-notes', authMiddleware, getAllNotes);
router.delete('/:id', deleteNote);
router.get('/search', authMiddleware, searchNotes)


export default router