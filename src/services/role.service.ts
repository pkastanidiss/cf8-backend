import Role, {IRole} from '../models/role.model';

export const findAllRoles = async() => {
  return Role.find().lean();
}

export const createRole = async(payload: Partial<IRole>) => {     // κάποια πεδία μπορεί να μην υπάρχουν
  const result = new Role(payload);
  return result.save(); 
}

export const updateRole = async(id:string, payload: Partial<IRole>) => {   
  const result = new Role(payload);
  return Role.findByIdAndUpdate(id, payload, {new: true}); 
}

export const deleteRole = async(id:string) => {   
  return Role.findByIdAndDelete(id); 
}