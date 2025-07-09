import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ✅ You can set a cookie or JWT here if you want to implement auth later

    return NextResponse.json(
      { message: "Login successful!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
