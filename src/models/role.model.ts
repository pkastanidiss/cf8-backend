import {Schema, model, Document} from "mongoose";

export interface IRole extends Document{
  role: string;
  description?: string;     // μπορεί και να μην έχει τιμή
  active: boolean;
}

const RoleSchema = new Schema<IRole>({
  role: {type: String, required: true, unique:true}, 
  description: {type: String},
  active: {type: Boolean, default: true}
}, {
  collection: "roles",
  timestamps: true
});

export default model<IRole>("Role", RoleSchema);