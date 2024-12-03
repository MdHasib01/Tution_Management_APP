import { StudentPost } from "../model/post.model.js";

const addAPost = async (req, res) => {
  const {
    name,
    subjects,
    email,
    availability,
    learningGoals,
    budget,
    teachingStyle,
    notes,
  } = req.body;
  if (
    !name ||
    !subjects ||
    !availability ||
    !learningGoals ||
    !budget ||
    !teachingStyle ||
    !notes
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const post = new StudentPost({
    name,
    subjects,
    email,
    availability,
    learningGoals,
    budget,
    teachingStyle,
    notes,
  });
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await StudentPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await StudentPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addAPost, getPosts, deletePost };
