import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Attendance from "@/lib/models/Attendance";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "faculty") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { studentId, subject, date, status } = await req.json();

  const record = await Attendance.create({
    student: studentId,
    subject,
    markedBy: (session.user as any).id,
    date,
    status,
  });

  return NextResponse.json(record, { status: 201 });
}