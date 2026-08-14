import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: { type: String },

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

    // Password reset
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);