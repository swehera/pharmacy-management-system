// import mongoose, { Schema, model, models } from "mongoose";

// const sellSchema = new Schema({
//   customerName: {
//     type: String,
//     required: [true, "Please provide a name"],
//   },
//   phone: {
//     type: Number,
//     required: [true, "Please provide your productQuantity"],
//   },
//   products: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       productName: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       sellingPrice: {
//         type: Number,
//         required: true, // Ensure this field is required if necessary
//       },
//     },
//   ],
//   user: {
//     type: String,
//   },
// });

// const Sell = models.Sell || model("Sell", sellSchema);
// export default Sell;

import mongoose, { Schema, model, models } from "mongoose";
import Product from "./productModel";
// import Product from './Product';

const sellSchema = new Schema({
  customerName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide a phone number"],
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      sellingPrice: {
        type: Number,
        required: true,
      },
      purchasePrice: {
        type: Number,
        required: true,
      },
      profit: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update product quantities
sellSchema.pre("save", async function (next) {
  const sell = this;

  try {
    for (let item of sell.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      product.productQuantity -= item.quantity;
      if (product.productQuantity < 0) {
        throw new Error(
          `Not enough quantity for product ${product.productName}`
        );
      }
      await product.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Sell = models.Sell || model("Sell", sellSchema);
export default Sell;
