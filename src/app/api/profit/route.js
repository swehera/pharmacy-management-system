import Sell from "@/models/sellModel";
import Product from "@/models/productModel";
import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import moment from "moment";

export const GET = async (request) => {
  await connect();

  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // Fetch all sales for the current month
    const sellEntries = await Sell.find({
      user,
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).populate("products.productId"); // Populate product details

    // Calculate total profit
    let totalProfit = 0;

    sellEntries.forEach((sell) => {
      sell.products.forEach((product) => {
        const purchasePrice = product.productId.purchasePrice;
        const profitPerItem = product.sellingPrice - purchasePrice;
        totalProfit += profitPerItem * product.quantity;
      });
    });

    return NextResponse.json({
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
