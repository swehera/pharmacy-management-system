import { connect } from "@/db/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { phone, pin } = await reqBody;

    //user validation
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exists",
        },
        { status: 500 }
      );
    }

    //Generate JWT token
    const token = jwt.sign(
      { userId: user._id, pin: user.pin },
      process.env.JWT_SECRET
    );

    // logged data
    const loggedData = {
      user: user._id,
      name: user.name,
      store_name: user.store_name,
      phone: user.phone,
      pin: user.pin,
    };

    return NextResponse.json({
      message: "Logged in successfully!",
      success: true,
      loggedData,
      token, // Include the token in the loggedData
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
