import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Assignment from "@/lib/models/Assignment";
import Attendance from "@/lib/models/Attendance";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const totalStudents = await User.countDocuments({ role: "student" });
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalAssignments = await Assignment.countDocuments();
  const totalAttendanceRecords = await Attendance.countDocuments();

  return NextResponse.json({
    totalStudents,
    totalFaculty,
    totalAdmins,
    totalAssignments,
    totalAttendanceRecords,
  });
}