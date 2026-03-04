
import { notes } from "../data/note";

// 01 create notes

export const createNote = (req, res, next) => {
    try {
        const { title, content } = req.body;

        if(!title || !content) {
            return res.status(400).json({
                Message: "Title and content are both required",
            });
        }

        const newNote = {
            id: Date.now(),
            title,
            content,
        };

        notes.push(newNote);
        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}


// 02 Get all notes

export const getAllNotes = (req, res) => {
    res.json(notes);
}


// 03 Get notes by id

export const getNotesById = (req, res) => {
    const id = Number(req.params.id);

    const note  = notes.find(n => n.id === id);

    if(!notes) {
        return res.status(404).json(
            {
                message: "Notes not found",
            }
        )
    }

    res.json(note);
};


// 04 update note

export const updateNote = (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    const note = notes.find(n => n.id === id);

    if(!note) {
        res.status(404).json({
            message: "Note not found"
        })
    }

    note.title = title || note.title;
    note.content = content || note.content
    
    res.json(note);
}

// 05 delete note

export const deleteNote = (req, res) => {
    const id = Number(req.params.id);
    const index = notes.findIndex(n => n.id === id)

    if(index = -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes = notes.splice(index, 1);

    res.json({
        message: "Note deleted successfully",
    })
}