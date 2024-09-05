import mongoose from 'mongoose';

const nameCollection = 'Cart';

const CartSchema = new mongoose.Schema({
  products: [
    {
      id: {
        _id: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', 
      },
      quantity: {
        type: Number,
        required: [true, "La cantidad del producto es obligatoria"],
      },
    },
  ],
});

CartSchema.set('toJSON', {
  transform: function (doc, ret) {
    return ret;
  },
});


const cartModel = mongoose.models[nameCollection] || mongoose.model(nameCollection, CartSchema);

export { cartModel };
