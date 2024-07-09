import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Please provide your productQuantity"],
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
    required: [true, "Please provide a brandName"],
  },
  purchasePrice: {
    type: Number,
    required: [true, "Please provide a purchasePrice"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "Please provide a sellingPrice"],
  },
  user: {
    type: String,
  },
});

const Product = models.Product || model("Product", productSchema);
export default Product;
