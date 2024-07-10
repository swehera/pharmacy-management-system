import Product from "@/models/productModel";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await connect();
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};
