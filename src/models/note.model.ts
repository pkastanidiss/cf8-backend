import { Schema, model, Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true,
  collection: "notes"
});

export default model<INote>("Note", NoteSchema);