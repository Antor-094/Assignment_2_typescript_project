import { UserModel } from "../user.models";
import { User } from "./user.interface";



const createUserIntoDB = async (student: User) => {

    const result = await UserModel.create(student);
    return result;
  };

const getAllUserFromDB = async ()=>{
  const result = await UserModel.find()
  return result;
}

  export const userServices = {
    createUserIntoDB,
    getAllUserFromDB
  }