import mongoose, { Schema, models } from "mongoose";

const AssignmentSubmissionSchema = new Schema(
  {
    assignment: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: String,
    githubLink: String,
    submittedAt: { type: Date, default: Date.now },
    isLate: { type: Boolean, default: false },
    marks: Number,
    feedback: String,
  },
  { timestamps: true }
);

export default models.AssignmentSubmission ||
  mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema);