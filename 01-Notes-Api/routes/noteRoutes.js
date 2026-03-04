import express from 'express'
import { 
    deleteNote,
    updateNote, 
    getNotesById, 
    getAllNotes, 
    createNote 
} from "../controller/notesController"

const router = express.Router;

router.post("/", createNote)
router.get("/", getAllNotes)
router.get("/:id", getNotesById)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router;