import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Notification from "@/lib/models/Notification";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const role = (session.user as any).role;

    if (role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      title,
      message,
      type = "system",
      audience = "all",
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "assignment",
      "attendance",
      "event",
      "placement",
      "system",
    ];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid notification type" },
        { status: 400 }
      );
    }

    const allowedAudiences = [
      "all",
      "student",
      "faculty",
    ];

    if (!allowedAudiences.includes(audience)) {
      return NextResponse.json(
        { error: "Invalid audience" },
        { status: 400 }
      );
    }

    await connectDB();

    let userQuery: any = {};

    if (audience === "student") {
      userQuery.role = "student";
    }

    if (audience === "faculty") {
      userQuery.role = "faculty";
    }

    const users = await User.find(userQuery).select("_id");

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No users found for this audience" },
        { status: 404 }
      );
    }

    const notifications = users.map((user) => ({
      user: user._id,
      title: title.trim(),
      message: message.trim(),
      type,
      isRead: false,
    }));

    await Notification.insertMany(notifications);

    return NextResponse.json(
      {
        success: true,
        message: "Notification sent successfully",
        count: notifications.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin notification error:", error);

    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}