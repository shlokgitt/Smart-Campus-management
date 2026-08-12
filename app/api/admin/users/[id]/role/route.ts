import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const ALLOWED_ROLES = [
  "student",
  "faculty",
  "coordinator",
  "admin",
];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { role } = await req.json();

    // Validate role
    if (!ALLOWED_ROLES.includes(role)) {
      return NextResponse.json(
        {
          error:
            "Invalid role. Allowed roles: student, faculty, coordinator, admin.",
        },
        { status: 400 }
      );
    }

    // Prevent admin from changing their own role
    if (id === (session.user as any).id) {
      return NextResponse.json(
        { error: "You cannot change your own role." },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/admin/users/[id]/role error:", error);

    return NextResponse.json(
      { error: "Failed to change user role." },
      { status: 500 }
    );
  }
}