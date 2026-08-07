import mongoose, { Schema, models } from "mongoose";

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: String,
    deadline: { type: Date, required: true },
    attachmentUrl: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Assignment || mongoose.model("Assignment", AssignmentSchema);