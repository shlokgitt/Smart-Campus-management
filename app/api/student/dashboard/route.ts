import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Attendance from "@/lib/models/Attendance";
import Assignment from "@/lib/models/Assignment";
import AssignmentSubmission from "@/lib/models/AssignmentSubmission";
import Notification from "@/lib/models/Notification";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  await connectDB();

  const attendanceRecords = await Attendance.find({ student: userId });
  const total = attendanceRecords.length;
  const present = attendanceRecords.filter((r) => r.status === "present").length;
  const attendancePercentage = total > 0 ? Math.round((present / total) * 100) : 0;

  const allAssignments = await Assignment.find();
  const mySubmissions = await AssignmentSubmission.find({ student: userId });
  const submittedIds = new Set(mySubmissions.map((s) => s.assignment.toString()));
  const pendingAssignments = allAssignments.filter((a) => !submittedIds.has(a._id.toString())).length;

  const unreadNotifications = await Notification.countDocuments({ user: userId, isRead: false });

  return NextResponse.json({
    attendancePercentage,
    totalAssignments: allAssignments.length,
    pendingAssignments,
    unreadNotifications,
  });
}