const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const register = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  if (!fullname || !email || !password || !role)
    return res.status(400).send({ msg: "Missing fields" });
  //check if user already exists in the database
  try {
    const existingUser = await UserSchema.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "user already exist" });
    } else {
      //hash password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new UserSchema({
        fullname: fullname,
        email: email,
        password: hashedPassword,
        role: role,
      });
      try {
        const savedUser = await user.save();
        //create token for authentication
        let token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });
        //return json web token with user data
        res.status(200).json({ fullname, email, role, token });
      } catch (error) {
        console.log("Error while creating a user");
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "internal server error" });
  }
  
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });
    }
    try {
      const user = await UserSchema.findOne({ email: email });
      if (!user)
        return res.status(400).json({ auth: false, message: "No user found." });
      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(400)
          .json({ auth: false, message: "Invalid password." });
      // Create JWT
      let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });
      // Send response
      res.status(200).send({
        token,
        user: {
          name: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  module.exports = {register,login};
