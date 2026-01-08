import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: [String]
});

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    education: String,
    skills: [String],
    projects: [ProjectSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
