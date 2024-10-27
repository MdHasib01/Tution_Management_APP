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

export { addTeacherPost, getTeacherPosts, getPostsByLocation };
