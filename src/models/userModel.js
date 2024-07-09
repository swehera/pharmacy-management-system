import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  store_name: {
    type: String,
    required: [true, "Please provide your store name"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your shop number"],
    unique: true,
  },
  pin: {
    type: Number,
    required: [true, "Please provide your pin number"],
    unique: true,
  },
});

const User = models.User || model("User", userSchema);
export default User;
