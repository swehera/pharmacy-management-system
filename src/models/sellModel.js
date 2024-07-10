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

const Sell = models.Sell || model("Sell", sellSchema);
export default Sell;
