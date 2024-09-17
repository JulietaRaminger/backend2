import CartManager from '../dao/db/cart-manager-db.js';
import CartDTO from '../dto/cart.dto.js';

class CartRepository {

    async createCart() {
        const cart = await CartManager.createCart();
        return { cartDTO: new CartDTO(cart.products), _id: cart._id };
    }

    async getCartById(id) {
        const cart = await CartManager.getCartById(id);
        if (!cart) {
            throw new Error(`Carrito con ID ${id} no encontrado`); // Nueva verificación
        }
        return new CartDTO(cart.products);
    }

    async getFullCartById(cid) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }
        return cart;
    }

    async addProductToCart(cid, pid) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }

        const updatedCart = await CartManager.addProductToCart(cid, pid);
        return new CartDTO(updatedCart.products);
    }

    async removeProductFromCart(cid, pid) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }

        const updatedCart = await CartManager.removeProductFromCart(cid, pid);
        return new CartDTO(updatedCart.products);
    }

    async updateCart(cid, products) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }

        const updatedCart = await CartManager.updateCart(cid, products);
        return new CartDTO(updatedCart.products);
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }

        const updatedCart = await CartManager.updateProductQuantity(cid, pid, quantity);
        return new CartDTO(updatedCart.products);
    }

    async clearCart(cid) {
        const cart = await CartManager.getCartById(cid);
        if (!cart) {
            throw new Error(`Carrito con ID ${cid} no encontrado`); // Nueva verificación
        }

        const updatedCart = await CartManager.clearCart(cid);
        return new CartDTO(updatedCart.products);
    }
}

export default new CartRepository();
