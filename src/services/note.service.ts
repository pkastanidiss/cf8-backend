import Note, { INote } from "../models/note.model";
import User from "../models/user.model";
import Role from "../models/role.model";

export const findAllNotes = async () => {
  return Note.find().populate("author", "username email").sort({ createdAt: -1 }).lean();
};

export const findNoteById = async (id: string) => {
  return Note.findById(id).populate("author", "username email").lean();
};

export const createNote = async (payload: Partial<INote>, authorId: string) => {
  const note = new Note({ ...payload, author: authorId });
  const savedNote = await note.save();

  try {
    const user = await User.findById(authorId).populate("roles");
    const authorRole = await Role.findOne({ role: "AUTHOR" });

    if (user && authorRole) {
      const roles = user.roles as any[];
      const hasAuthorRole = roles.some(r => 
        (typeof r === 'object' && r.role === "AUTHOR") || 
        r.toString() === authorRole._id.toString()
      );

      if (!hasAuthorRole) {
        user.roles.push(authorRole._id as any);
        await user.save();
        console.log("User upgraded to AUTHOR");
      }
    }
  } catch (err) {
    console.error("Role upgrade failed:", err);
  }
  return savedNote;
};

export const updateNote = async (id: string, noteData: any, userId: string) => {
  const { _id, author, createdAt, ...cleanData } = noteData;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, author: userId }, 
    { $set: cleanData }, 
    { new: true, runValidators: true } 
  ).populate("author", "username email");

  if (!updatedNote) {
    throw new Error("Note not found or user not authorized");
  }
  return updatedNote;
};

export const deleteNote = async (id: string, authorId: string) => {
  const result = await Note.findOneAndDelete({ _id: id, author: authorId });
  if (!result) {
    throw new Error("Note not found or unauthorized deletion");
  }
  return result;
};