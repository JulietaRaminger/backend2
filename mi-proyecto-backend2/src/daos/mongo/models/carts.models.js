import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const nameCollection = "Cart";

const CartSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
});

CartSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// Usa el modelo existente si ya ha sido compilado, o define uno nuevo si no existe
export const cartModel = models[nameCollection] || model(nameCollection, CartSchema);
