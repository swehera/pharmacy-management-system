import { connect } from "@/db/db";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await connect();
  try {
    const reqBody = await request.json();
    const { name, store_name, phone, pin } = reqBody;

    // User validation
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 500 }
      );
    }

    // // Password hashing
    // const salt = await bcryptjs.genSalt(10);
    // const encryptedPin = await bcryptjs.hash(pin, salt);

    const newUser = new User({
      name,
      store_name,
      phone,
      pin,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully!",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
