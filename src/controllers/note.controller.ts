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

export const create = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body); // Θα δούμε τι στέλνει η Angular
    console.log("User from Token:", req.user); // Θα δούμε αν το middleware δουλεύει

    
  const authorId = req.user?._id || req.user?.id;

    if (!authorId) {
      console.log("Error: No authorId found in request");
      return res.status(401).json({ message: "User not authenticated" });
    }

    const note = await noteService.createNote(req.body, authorId);
    res.status(201).json(note);
  } catch (error: any) {
    console.error("DETAILED ERROR IN CONTROLLER:", error); // ΑΥΤΟ ΘΑ ΜΑΣ ΠΕΙ ΤΗΝ ΑΛΗΘΕΙΑ
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const result = await noteService.updateNote(req.params.id!, req.body, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const result = await noteService.deleteNote(req.params.id!, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
