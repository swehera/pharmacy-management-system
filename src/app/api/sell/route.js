import { connect } from "@/db/db";
import Product from "@/models/productModel";
import Sell from "@/models/sellModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await connect();
  try {
    const reqBody = await request.json();
    const { customerName, phone, products, user } = reqBody;

    const updatedProducts = await Promise.all(
      products.map(async (item) => {
        const productData = await Product.findById(item.productId);
        if (!productData) {
          throw new Error(`Product with id ${item.productId} not found`);
        }
        return {
          ...item,
          purchasePrice: productData.purchasePrice,
          profit:
            (item.sellingPrice - productData.purchasePrice) * item.quantity,
        };
      })
    );

    const newSellData = new Sell({
      customerName,
      phone,
      products: updatedProducts,
      user,
    });

    const saveSellData = await newSellData.save();
    return NextResponse.json({
      message: "Product sold successfully",
      success: true,
      sellData: saveSellData,
    });
  } catch (error) {
    console.error("Error saving sell data:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  await connect();
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const query = userId ? { user: userId } : {};

    const sellData = await Sell.find(query);

    const totalProfit = sellData.reduce((acc, sell) => {
      const profit = sell.products.reduce(
        (productAcc, product) => productAcc + product.profit,
        0
      );
      return acc + profit;
    }, 0);

    return NextResponse.json({
      data: sellData,
      totalProfit,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};
