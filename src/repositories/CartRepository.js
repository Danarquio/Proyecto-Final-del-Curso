import { cartsModel } from '../DAO/models/carts.model.js';
import { productsModel } from '../DAO/models/products.model.js'; 
import CartDao from '../DAO/classes/CartDao.js';


const cartDao = new CartDao()

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
  async addProductToUserCart(cartId, productId, quantity) {
    try {
      // Primero, verifica si el producto existe
      const productExists = await productsModel.findById(productId);
      if (!productExists) {
        throw new Error('El producto no existe');
      }
  
      // Encuentra el carrito y agrega el producto
      const updatedCart = await cartsModel.findOneAndUpdate(
        { _id: cartId }, // Buscar por cartId
        {
          $push: {
            products: {
              productId: productId,
              quantity: quantity
            }
          }
        },
        { new: true }
      );
  
      return updatedCart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito del usuario: ' + error.message);
    }
  }

  // Método para obtener un carrito por el ID del usuario
  async getCartByUserId(userId) {
    try {
      const cart = await cartsModel.findOne({ user: userId });
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito del usuario');
    }
  }

  // Método para crear un carrito asociado a un usuario
  async createCartForUser(userId) {
    try {
      const newCart = new cartsModel({ products: [], user: userId });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear carrito para el usuario');
    }
  }




}

export default CartRepository;
