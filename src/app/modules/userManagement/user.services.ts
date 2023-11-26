import { User} from "../user.models";
import { TUser } from "./user.interface";



const createUserIntoDB = async (userData: TUser) => {
   
    const result = await User.create(userData);
    return result;
  };

const getAllUserFromDB = async ()=>{
  const result = await User.find()
  return result;
}

const getSingleUserFromDB = async (userId:number)=>{
  
  const user = new User(); 
  const userExists = await user.isUserExists(userId);

  if (!userExists) {
    throw new Error('User not found');
  }
 const result = await User.findOne({userId});
 return result;
}
  export const userServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB
  }