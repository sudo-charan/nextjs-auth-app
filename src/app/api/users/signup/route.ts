import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connect();

  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}
