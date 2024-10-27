import { Schema, model } from "mongoose";

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  subjects: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  learningGoals: { type: String, required: true },
  budget: { type: String },
  teachingStyle: { type: String, required: true },
  notes: { type: String },
});

export const StudentPost = model("StudentPost", postSchema);
