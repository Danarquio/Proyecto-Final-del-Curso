import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import { isAuthenticated } from '../config/middlewares.js';
import CartRepository from "../repositories/CartRepository.js";
import CartController from "../controllers/CartController.js";
import passport from "../config/middlewares.js";
import { productsModel } from "../DAO/models/products.model.js";
import { sendEmail } from '../config/nodemailer.js';
import ticketModel from '../DAO/models/tickets.model.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router()
const cartManager = new CartManager()
const cartRepository = new CartRepository();
const cartController = new CartController()


//GESTION DE CARRITO
//obtener todos los carritos
router.get("/", async (req, res) => {
    try {
      const carts = await cartManager.getAllCarts();
      res.send({ result: "success", payload: carts });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al obtener carritos" });
    }
  });

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
      const result = await cartManager.addCart();
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al crear carrito" });
    }
  });

// put
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCart = req.body;
      const result = await cartManager.updateCart(id, updatedCart);
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al actualizar carrito" });
    }
  });

// Eliminar un carrito por ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await cartManager.deleteCart(id);
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", error: "Error al eliminar carrito" });
    }
  });




//GESTION DE PRODUCTOS DENTRO DE CARRITO
// Verificar si un producto está en el carrito
router.get("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;  // Obtener cartId de los parámetros de la URL
    const prodId = req.params.pid;  // Obtener prodId de los parámetros de la URL
  
    try {
      const result = await carts.existProductInCart(cartId, prodId);
  
      res.send({ result: "success", payload: result });
    } catch (error) {
      console.error("Error al verificar el producto en el carrito:", error);
      res.status(500).send({ status: "error", error: "Error al verificar el producto en el carrito" });
    }
  });
  
// Agregar productos a un carrito -- :cid es el id del carrito y :pid es el id del producto
router.post("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    let { product_id, quantity } = req.body; 

    try {
        const result = await cartManager.addProductInCart(cartId, prodId, product_id, quantity);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al agregar productos al carrito:", error);
        res.status(500).send({ status: "error", error: "Error al agregar productos al carrito" });
    }
});

// Modificar productos de un carrito
router.put("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    let { product_id, quantity } = req.body;

    try {
        const result = await cartManager.updateProductInCart(cartId, prodId, product_id, quantity);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al modificar productos en el carrito:", error);
        res.status(500).send({ status: "error", error: "Error al modificar productos en el carrito" });
    }
});

// Eliminar productos de un carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;

    try {
        const result = await cartManager.removeProductFromCart(cartId, prodId);

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar productos del carrito:", error);
        res.status(500).send({ status: "error", error: "Error al eliminar productos del carrito" });
    }
});



//Population
//Traemos todos los carritos con http://localhost:8080/api/carts con get
router.get("/population/:cid", async (req,res)=>{
    let cartId = req.params.cid
    res.send(await cartManager.getCartWithProducts(cartId))
})



router.post("/create-cart", isAuthenticated, async (req, res) => {
  try {
    // Obtener el ID del usuario logueado desde la sesión
    const userId = req.user._id; // Asumiendo que puedes obtener el ID del usuario de la sesión

    // Lógica para crear un carrito asociado al usuario
    const result = await cartRepository.createCartForUser(userId);

    res.status(200).json({ status: "success", message: "Nuevo carrito creado", cart: result });
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).json({ status: "error", message: "Error al crear el carrito" });
  }
});


router.post("/add-to-cart/:productId", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Obtener el ID del usuario logueado desde la sesión
    const productId = req.params.productId; // Obtener el ID del producto a agregar

    // Asumiendo que la cantidad del producto a agregar viene en el body de la solicitud
    const { quantity } = req.body;

    // Obtén o crea el carrito del usuario o crea uno nuevo si no existe
    let userCart = await cartRepository.getCartByUserId(userId);
    if (!userCart) {
      userCart = await cartRepository.createCartForUser(userId);
    }

    // Agrega el producto al carrito
    const updatedCart = await cartRepository.addProductToUserCart(userCart._id, productId, quantity);

    res.status(200).json({ status: "success", message: "Producto agregado al carrito", cart: updatedCart });
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito" });
  }
});


router.post('/product-details', async (req, res) => {
  const productIds = req.body.productIds; // Asume un array de IDs
  try {
    const products = await productsModel.find({
      '_id': { $in: productIds }
    });
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener detalles de productos', error: error });
  }
});

router.delete("/api/deleteproductcarts/:cid", cartController.deleteAllProductsInCart); // borrar todos los productos del un carrito


router.get("/api/carts/:cid/purchase", passport.authenticate('current', { session: false }), isAuthenticated, cartController.purchaseProducts); 
// realizar la compra total de los productos del carrito


// Endpoint para crear un ticket y enviar por email
router.post("/ticket", async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { name, email, phone, address, products } = req.body;

    // Verifica que products es un arreglo y tiene elementos
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "El campo products debe ser un arreglo con al menos un elemento." });
    }

    // Obtener detalles completos de los productos
    const productsDetails = await Promise.all(products.map(async (item) => {
      const product = await productsModel.findById(item.productId); // Asegúrate de que este es el nombre correcto de tu modelo de productos
      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }
      
      const finalPrice = (item.quantity * product.price) / (product.minimo)
      return {
        productId: item.productId, // Mantenemos el ID del producto
        quantity: item.quantity, // La cantidad específica del producto en el ticket
        price: finalPrice, // El precio del producto desde la base de datos
        title: product.title // El título del producto para usar en el correo electrónico
      };
    }));

    console.log( productsDetails )
    // Crear un código único para el ticket
    const ticketCod = uuidv4();

    const totaly = productsDetails.reduce((acc, item) => acc + item.price, 0); // Suma los precios finales

    // Crear un nuevo ticket en la base de datos con la estructura actualizada
    const newTicket = new ticketModel({
      name,
      email,
      phone,
      address,
      products: productsDetails, // Ahora guardamos la estructura completa de cada producto
      totalPrice: totaly,
      ticketCode: ticketCod
    });

    // Guardar el ticket en la base de datos
    const savedTicket = await newTicket.save();

    
    // Preparar el correo electrónico
    const emailOptions = {
      from: 'tu-email@example.com',
      to: email,
      subject: 'Confirmación de pedido',
      html: `<p>Hola ${name}, aquí está la confirmación de tu pedido con el código: ${ticketCod}</p>
             <p>Detalles del pedido:</p>
             ${productsDetails.map(item => `<p>${item.title}: ${item.quantity}gr x $${item.price}</p>`).join('')}
             <p>Total a pagar: $${totaly.toFixed(0)}</p>`,
    };

    // Enviar el correo electrónico
    await sendEmail(emailOptions);

    res.json({ redirectUrl: `/ticket/${savedTicket._id}` });
  } catch (error) {
    console.error("Error al crear el ticket y enviar email:", error);
    res.status(500).json({ error: "Error al crear el ticket y enviar email" });
  }
});



export default router;