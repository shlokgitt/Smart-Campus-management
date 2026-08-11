import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "faculty") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const students = await User.find({ role: "student" }).select("name email _id");
  return NextResponse.json(students);
}