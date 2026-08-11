import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Assignment from "@/lib/models/Assignment";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "faculty") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { title, description, subject, deadline, attachmentUrl } = await req.json();

  const assignment = await Assignment.create({
    title,
    description,
    subject,
    deadline,
    attachmentUrl,
    createdBy: (session.user as any).id,
  });

  return NextResponse.json(assignment, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "faculty") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const assignments = await Assignment.find({ createdBy: (session.user as any).id }).sort({ deadline: 1 });
  return NextResponse.json(assignments);
}