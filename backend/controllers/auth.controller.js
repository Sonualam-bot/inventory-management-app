const User = require("../models/User.model");

async function signup(userDetails) {
  try {
    const signupUser = new User(userDetails);
    const newUser = await signupUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}


async function login(email){
    try{
        const user = await User.findOne({email});
        return user;
    }catch(error){
        throw error
    }
}




module.exports = {
    signup,
    login
}