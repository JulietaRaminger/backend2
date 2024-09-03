import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const nameCollection = "Producto";

const ProductSchema = new Schema({
  name: { type: String, required: [true, "El nombre del producto es obligatorio"] },
  description: { type: String },
  price: { type: Number, required: [true, "El precio es obligatorio"] },
  stock: { type: Number, default: 0 },
  category: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

ProductSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// Usa el modelo existente si ya ha sido compilado, o define uno nuevo si no existe
export const productModel = models[nameCollection] || model(nameCollection, ProductSchema);
