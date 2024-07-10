import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Please provide the product quantity"],
  },
  expireDate: {
    type: Date,
    required: [true, "Please provide the expire date"],
  },
  purchaseDate: {
    type: Date,
    required: [true, "Please provide the purchase date"],
  },
  brandName: {
    type: String,
    required: [true, "Please provide a brand name"],
  },
  purchasePrice: {
    type: Number,
    required: [true, "Please provide the purchase price"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "Please provide the selling price"],
  },
  user: {
    type: String,
  },
});

productSchema.virtual("perPieceProfit").get(function () {
  return this.sellingPrice - this.purchasePrice;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = models.Product || model("Product", productSchema);
export default Product;
