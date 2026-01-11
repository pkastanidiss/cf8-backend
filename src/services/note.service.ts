import Note, { INote } from "../models/note.model";

export const findAllNotes = async () => {
  return Note.find().populate("author", "username email").lean();
}

export const createNote = async (payload: Partial<INote>, authorId: string) => {
  const note = new Note({payload, author: authorId,});
  return note.save();
}

export const deleteNote = async (id: string, authorId: string) => {
  return Note.findOneAndDelete({_id: id, author: authorId,});
}

export const updateNote = async (id: string, payload: Partial<INote>, authorId: string) => {
  return Note.findOneAndUpdate({ _id: id, author: authorId }, payload,
    { new: true }
  );
}
