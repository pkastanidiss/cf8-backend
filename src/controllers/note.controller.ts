import { Request, Response, NextFunction } from "express";
import * as noteService from "../services/note.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await noteService.findAllNotes();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await noteService.findNoteById(req.params.id!);
    if (!result) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.user?._id || req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Στέλνουμε το body και το authorId στο service
    const note = await noteService.createNote(req.body, authorId);
    res.status(201).json(note);
  } catch (err) {
    next(err); // Χρησιμοποιούμε το next για ομοιομορφία
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not identified" });
    }

    // Το service πρέπει να ελέγχει αν ο userId είναι ο ιδιοκτήτης της σημείωσης
    const result = await noteService.updateNote(req.params.id!, req.body, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id || req.user?.id;
    
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await noteService.deleteNote(req.params.id!, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};