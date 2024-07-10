import { connect } from "@/db/db";
import Sell from "@/models/sellModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await connect();
  const { id } = params;
  try {
    const singleSelledData = await Sell.findById(id);
    return NextResponse.json({
      singleSelledData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching task", error: error.message },
      { status: 500 }
    );
  }
};
