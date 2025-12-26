import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Config {
  #token;
  constructor() {}
  async dbConnection() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Database Connected");
    } catch (error) {
      console.log("DB Error: " + error);
    }
  }
  createJWT(res, userId) {
    this.#token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", this.#token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "none", // Prevent CSRF attacks
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
  }
}

export const config = new Config();
