import User from "../models/user.js";
import { createJwt } from "../utils/db.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(401).json({ message: "User already exist" });
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });
    if (user) {
      isAdmin ? createJwt(req, user._id) : null;
      user.password = undefined;
      res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user?.isActive) {
      return res.status(401).json({
        message: "User account has been deactivated, contact the administrator",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJwt(res, user._id);
      user.password = undefined;
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    console.log(err);
  }
};
