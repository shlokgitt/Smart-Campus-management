import mongoose, { Schema, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent"], required: true },
  },
  { timestamps: true }
);

export default models.Attendance || mongoose.model("Attendance", AttendanceSchema);