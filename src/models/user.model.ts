import {Schema, model} from "mongoose";

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
  collection: "roles",
  timestamps: true
});

export default model("User", UserSchema);