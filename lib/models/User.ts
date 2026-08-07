import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // null if signed up via Google
    role: {
      type: String,
      enum: ["student", "faculty", "coordinator", "admin"],
      default: "student",
    },
    department: String,
    semester: Number,
    phone: String,
    bio: String,
    profilePicture: String,
    skills: [String],
    linkedin: String,
    github: String,
    resumeUrl: String,
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);