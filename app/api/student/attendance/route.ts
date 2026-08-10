import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Attendance from "@/lib/models/Attendance";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const records = await Attendance.find({ student: (session.user as any).id }).sort({ date: -1 });

  const total = records.length;
  const present = records.filter((r) => r.status === "present").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return NextResponse.json({ records, percentage, total, present });
}