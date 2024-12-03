import { Schema, model } from "mongoose";

const teacherPostSchema = new Schema({
  name: {
    type: String,
  },
  respondedUser: { type: String },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  subjectExpertise: {
    type: String,
  },
  availabilDays: {
    type: [String],
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  preferedLocation: {
    type: String,
  },
  experience: { type: String },
  response: { type: Boolean, default: false },
  rate: { type: String },
  teachingStyle: { type: String },
  notes: { type: String },
  address: { type: String },
});

export const TeacherPost = model("TeacherPost", teacherPostSchema);
