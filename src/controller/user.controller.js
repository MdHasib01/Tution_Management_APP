import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).send({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const signInUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    res.status(200).send({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

export { registerUser, signInUser };