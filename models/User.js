import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  //en amen inchy inch vor petqa partadir unena
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {//asumenq inqy iranic inch partadir saxin avelacni
    timestamps:true//xosqi es pahin asumenq vor saxin data sozdanya avelacni avtomat
  },

);


export default mongoose.model('User', UserSchema)