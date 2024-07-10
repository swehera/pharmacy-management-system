import Product from "@/models/productModel";
import { connect } from "@/db/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await connect();
  try {
    const reqBody = await request.json();
    const {
      productName,
      productQuantity,
      expireDate,
      purchaseDate,
      brandName,
      purchasePrice,
      sellingPrice,
      user,
    } = reqBody;

    const existingProduct = await Product.findOne({ productName, user });
    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Product already exists in store",
        },
        { status: 409 }
      );
    }

    const productData = new Product({
      productName,
      productQuantity,
      expireDate,
      purchaseDate,
      brandName,
      purchasePrice,
      sellingPrice,
      user,
    });

    const saveProduct = await productData.save();

    return NextResponse.json({
      message: "Product added successfully",
      success: true,
      product: saveProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  await connect();
  try {
    const products = await Product.find();
    return NextResponse.json({
      data: products,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};
