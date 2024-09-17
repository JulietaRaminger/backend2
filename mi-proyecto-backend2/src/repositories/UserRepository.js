import UserManager from '../dao/db/user-manager-db.js';

class UserRepository {
    async createUser(userDTO) {
        return await UserManager.createUser(userDTO);
    }

    async getUsers() {
        return await UserManager.getUsers();
    }

    async getUserById(id) {
        return await UserManager.getUserById(id);
    }

    async getUserByUsername(username) {
        return await UserManager.findOne({ username });
    }

    async getUserByEmail(email) {
        return await UserManager.findOne({ email });
    }

    async getUserByCartId(cartId) {
        try {
            return await UserManager.findOne({ cart: cartId });
        } catch (error) {
            console.error("Error al obtener usuario por ID de carrito:", error);
            throw new Error("Error al obtener usuario por ID de carrito");
        }
    }
    
    async getCartByUserId(userId) {
        try {
            const user = await UserManager.getUserById(userId);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user.cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID de usuario:", error);
            throw new Error("Error al obtener el carrito por ID de usuario");
        }
    }
    
    async updateUser(id, userDTO) {
        return await UserManager.updateUser(id, userDTO);
    }

    async deleteUser(id) {
        return await UserManager.deleteUser(id);
    }
}

export default new UserRepository();
