import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Assignment from "@/lib/models/Assignment";
import AssignmentSubmission from "@/lib/models/AssignmentSubmission";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const assignments = await Assignment.find().sort({ deadline: 1 });
  const submissions = await AssignmentSubmission.find({ student: (session.user as any).id });

  const submittedIds = new Set(submissions.map((s) => s.assignment.toString()));
  const withStatus = assignments.map((a) => ({
    ...a.toObject(),
    submitted: submittedIds.has(a._id.toString()),
  }));

  return NextResponse.json(withStatus);
}