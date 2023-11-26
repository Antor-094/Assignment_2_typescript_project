import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserMethods,
  UserModel,

} from './userManagement/user.interface';
import validator from 'validator';
const TUserFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const TUserAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: TUserFullNameSchema,
    required: [true, 'Full name is requied'],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'email is required!!'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid',
    },
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: TUserAddressSchema,
    required: [true, 'Address is requied'],
  },
});

userSchema.methods.isUserExists = async function (userId: number): Promise<boolean> {
  const existingUser = await User.findOne({ userId });
  return !!existingUser; // Return true if user exists, false otherwise
};

export const User = model<TUser , UserModel>('user', userSchema);
