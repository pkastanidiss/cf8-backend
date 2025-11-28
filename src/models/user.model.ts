import {Schema, model, Document} from "mongoose";

export interface IPhone{type: string, number: string};

export interface IUser extends Document {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?:string;
    municipality?: string;
  },
   phone?: IPhone[];
}

const PhoneSchema = new Schema({
  typer: String,
  number: String
})
//  {+id:false};     inserts id or not

const AdressSchema = new Schema({
  are: String,
  street:String,
  number: String,
  po: String,
  municipality:String
})

const UserSchema = new Schema ({
  username: {
    type: String, 
    required:[true, "Username is a required field"], 
    unique: true,
    max: 100,
    trim: true,
    lowercase:true
  },
  password: {type:String, required: true},
  firstname: {type: String},
  lastname: {type: String},
  email: {type:String, index: true},
  adress: [AdressSchema],
  phone: {type: [PhoneSchema], null: true}
 }, {
  collection: "users",
  timestamps: true
});

export default model("User", UserSchema);