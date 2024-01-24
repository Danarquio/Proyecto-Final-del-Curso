import { cartsModel } from '../DAO/models/carts.model.js';
import CartDao from '../DAO/classes/CartDao.js';

const cartDao= new CartDao()

class CartRepository {
  // Obtener todos los carritos
  async getAllCarts() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      throw new Error('Error al obtener carritos');
    }
  }

  // Obtener un carrito por ID
  async getCartById(cartId) {
    try {
      const cart = await cartsModel.findById(cartId);
      return cart;
    } catch (error) {
      throw new Error('Error al obtener carrito por ID');
    }
  }

  // Crear un nuevo carrito
  async createCart() {
    try {
      const newCart = new cartsModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear carrito');
    }
  }

  // Actualizar un carrito existente
  async updateCart(cartId, updatedCartData) {
    try {
      const updatedCart = await cartsModel.findByIdAndUpdate(cartId, updatedCartData, { new: true });
      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar carrito');
    }
  }

  // Eliminar un carrito por ID
  async deleteCart(cartId) {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error('Error al eliminar carrito');
    }
  }

  // Crear un nuevo carrito asociado al usuario
  async createCartForUser(userId) {
    try {
      const newCart = new cartsModel({ products: [] }); // Crea un nuevo carrito vacío para el usuario
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear carrito para el usuario');
    }
  }

  async deleteAllProductsInCart(cartId) {
    try {
        const result = await this.dao.deleteAllProductsInCart(cartId);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar todos los productos del carrito");
    }
}

  // Agregar un producto al carrito del usuario
  async addProductToUserCart(userId, productId, quantity) {
    try {
      const userCart = await cartsModel.findOneAndUpdate(
        {}, // Encuentra cualquier carrito existente (puedes agregar una condición más específica aquí para encontrar el carrito del usuario)
        {
          $push: {
            products: {
              productId: productId,
              quantity: quantity
            }
          }
        },
        { upsert: true, new: true } // Crea un carrito si no existe
      );

      return userCart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito del usuario');
    }
  }


  

}

export default CartRepository;
