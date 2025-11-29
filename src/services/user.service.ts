import { Types } from 'mongoose';
import Role from '../models/role.model';
import User, {IUser} from '../models/user.model';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const findAllUsers = async() => {
  return User.find().lean();
}

export const createUser = async(payload: Partial<IUser>) => {
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hash;
  }

  // let reader = await Role.findOne({role: "READER"});
  // // let roleIds: Types.ObjectId[] = [];
  // if (!reader) {
  //   reader= await Role.create({role: "Reader", description: "Role Reader", active: true});
  // }

  // let roleIds: Types.ObjectId = [reader._id];
  // const user = new User({...payload, roles:roleIds});
  const user = new User(payload);
  return user.save();
}