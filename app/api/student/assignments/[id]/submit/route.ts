import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Assignment from "@/lib/models/Assignment";
import AssignmentSubmission from "@/lib/models/AssignmentSubmission";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await connectDB();
  const { fileUrl, githubLink } = await req.json();

  const assignment = await Assignment.findById(id);
  if (!assignment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isLate = new Date() > new Date(assignment.deadline);

  const submission = await AssignmentSubmission.create({
    assignment: id,
    student: (session.user as any).id,
    fileUrl,
    githubLink,
    isLate,
  });

  return NextResponse.json(submission, { status: 201 });
}