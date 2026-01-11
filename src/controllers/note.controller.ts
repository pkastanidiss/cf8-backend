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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;   // coming from authenticate middleware
    const result = await noteService.createNote(req.body, userId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
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
