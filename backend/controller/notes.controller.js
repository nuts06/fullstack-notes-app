import Note from "../models/createnote.model.js";
import {authMiddleware} from '../middlewares/authMiddleware.js';

export const createNote = async(req, res, authMiddleware) => {
    try{
        const {title, content, tags} = req.body;
        if (!title || !content || !tags) {
            return res.status(400).json({ message: "Title, content and tags are required", success: false });
        }
         // Ensure tags is an array
         if (!Array.isArray(tags)) {
            return res.status(400).json({ message: "Tags must be an array", success: false });
        }
        const newNote = new Note({
            title,
            content,
            tags,
            user: req.user.user.id,
        })
        await newNote.save();
        res.status(201).json({messgae:'Note Created Successfully', success: true, note: newNote})
    } catch(err){
        res.status(500).json({message: err.message, success: false})
    }
}
export const getAllNotes = async (req, res) => {
    try {
        // Find notes associated with the logged-in user
        const notes = await Note.find({ user: req.user.user.id });
        res.status(200).json({ notes, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// DELETE: /api/notes/:id
export const deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedNote = await Note.findByIdAndDelete(id);
  
      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found", success: false });
      }
  
      res.status(200).json({ message: "Note deleted successfully", success: true, note: deletedNote });
    } catch (err) {
      res.status(500).json({ message: err.message, success: false });
    }
  };
  