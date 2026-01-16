import Note, { INote } from "../models/note.model";
import User from "../models/user.model";
import Role from "../models/role.model";

export const findAllNotes = async () => {
  return Note.find().populate("author", "username email").lean();
}

export const createNote = async (payload: Partial<INote>, authorId: string) => {
  // 1. Δημιουργία της σημείωσης (αυτό λειτουργεί πάντα)
  const note = new Note({ ...payload, author: authorId });
  const savedNote = await note.save();

  try {
    // 2. Αναβάθμιση Ρόλου με ασφάλεια
    const user = await User.findById(authorId).populate("roles");
    const authorRole = await Role.findOne({ role: "AUTHOR" });

    if (user && authorRole) {
      // Ελέγχουμε αν οι ρόλοι είναι πίνακας και αν περιέχουν το AUTHOR
      const roles = user.roles as any[];
      const hasAuthorRole = roles.some(r => 
        (typeof r === 'object' && r.role === "AUTHOR") || 
        r.toString() === authorRole._id.toString()
      );

      if (!hasAuthorRole) {
        user.roles.push(authorRole._id as any);
        await user.save();
        console.log("User upgraded to AUTHOR successfully");
      }
    }
  } catch (err) {
    // Αν αποτύχει το κομμάτι του ρόλου, ας μην καταρρεύσει όλο το request
    console.error("Note saved, but role upgrade failed:", err);
  }

  return savedNote;
};

export const deleteNote = async (id: string, authorId: string) => {
  return Note.findOneAndDelete({_id: id, author: authorId,});
}

export const updateNote = async (id: string, payload: Partial<INote>, authorId: string) => {
  return Note.findOneAndUpdate({ _id: id, author: authorId }, payload,
    { new: true }
  );
}
