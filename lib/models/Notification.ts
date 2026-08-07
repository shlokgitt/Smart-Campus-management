import mongoose, { Schema, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: String,
    type: {
      type: String,
      enum: ["assignment", "attendance", "event", "placement", "system"],
      default: "system",
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Notification || mongoose.model("Notification", NotificationSchema);