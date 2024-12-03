import { TeacherPost } from "../model/teacherPost.model.js";

const addTeacherPost = async (req, res) => {
  try {
    const post = new TeacherPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacherPosts = async (req, res) => {
  try {
    const posts = await TeacherPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    const pipeline = [
      {
        $search: {
          index: "search",
          text: {
            query: location,
            path: "preferedLocation",
          },
        },
      },
    ];

    const posts = await TeacherPost.aggregate(pipeline);
    res.json(posts);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateResponse = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await TeacherPost.findById(id);
    post.response = true;
    post.respondedUser = req.body.respondedUser;
    post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findResponseTure = async (req, res) => {
  try {
    const query = TeacherPost.where({ response: true });
    const posts = await query.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await TeacherPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  deletePost,
  addTeacherPost,
  getTeacherPosts,
  getPostsByLocation,
  updateResponse,
  findResponseTure,
};
