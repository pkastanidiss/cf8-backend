import {Types} from "mongoose";

export interface AuthPayload {
  _id: Types.ObjectId | string;
  username: string,
  email?: string,
  roles: Types.ObjectId[];
}