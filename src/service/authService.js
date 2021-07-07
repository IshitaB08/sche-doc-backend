const bcrypt = require("bcryptjs");
// Importing utils
const jwtModule = require("../utils/jwtModule");
// Load User Model
const User = require("../models/User");
// import logger

// import Custom Error
// const { EmailExisted, EmailOrPasswordIncorrect } = require('../utils/customError');

class AuthService {

  Register = async (userInput, dispatcher) => {
    const { email, password } = userInput;
    // hash the password
    console.log(userInput,dispatcher)
    userInput.password = bcrypt.hashSync(password, 8);

    try {
      // Check if email exists
      // let user = await User.findOne({ email }).exec();
      // if (user) {
      //   throw new EmailExisted(`Email ${email} already existed`);
      // }
      // Create New User mongoose create
      let newUser = await User.create({ ...userInput, createdBy: dispatcher.displayName });
      // Log create user event 
      const message = "Create User";
      const metadata = { issuer: dispatcher.displayName, action: "register: create user", payload: newUser };
      // logger.info({ message, metadata });
      console.log({message, metadata})
      // return data to controller
      return { newUser }

    } catch (error) {
      // Log error event
      const message = error.message;
      const metadata = { issuer: dispatcher.displayName, action: "register", payload: userInput };
      console.log({ message, metadata });
    
      throw error;
    }
  }

  Login = async (userInput) => {
    const { inputEmail, inputPassword } = userInput;

    try {
      // Check if email exists
      let user = await User.findOne({ email: inputEmail }).exec();
      if (!user) {
        throw new EmailOrPasswordIncorrect(`Email or password incorrect`);
      };

      const { _id, email, password, nickname, firstChangeOfPassword, lastName, userType, avatar } = user;
      // compare the password with hashed password
      const passwordMatch = bcrypt.compareSync(inputPassword, password);
      // check if password match
      if (!passwordMatch) {
        throw new EmailOrPasswordIncorrect(`Email or password incorrect`);
      }
      // JWT signature
      const payload = { id: _id, userType: userType, email: email, displayName: nickname + " " + lastName, avatar: avatar, firstChangeOfPassword: firstChangeOfPassword };
      const signingOptions = { subject: email, };
      const signedToken = jwtModule.sign(payload, signingOptions);

      // Log create user event 
      const message = "User Login Success";
      const metadata = { issuer: nickname + " " + lastName, action: "user login" };
      logger.info({ message, metadata });
      // return data to controller
      return { signedToken }

    } catch (error) {
      // Log error event
      const message = error.message;
      const metadata = { issuer: "unknown", action: "user attempt login", payload: { email: inputEmail } };
      logger.error({ message, metadata });
      // throw error to controller
      throw error;
    }
  }
}
module.exports = AuthService;