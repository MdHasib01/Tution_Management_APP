import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { fullName, phone, name, email, password, role } = req.body;
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
      fullName: fullName,
      name,
      email,
      phone,
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
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
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

const editUser = async (req, res) => {
  const { fullName, name, email, phone, password, role } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.fullName = fullName;
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.password = password;
    user.role = role;
    await user.save();
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const updateUserPaidStatus = async (req, res) => {
  const { name, paid } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.paid = paid;
    await user.save();
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUserDetails = async (req, res) => {
  const { fullName, name, email, phone, learningGoal } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.fullName = fullName;
    user.phone = phone;
    user.name = name;
    user.learningGoal = learningGoal;
    user.email = email;
    user.phone = phone;
    await user.save();
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  registerUser,
  signInUser,
  updateUserPaidStatus,
  editUser,
  getUsers,
  updateUserDetails,
};
