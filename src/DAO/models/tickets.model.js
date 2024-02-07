import mongoose from 'mongoose';

const ticketsCollection = "tickets";

const productInTicketSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const ticketSchema = new mongoose.Schema(
  {
    name: { type: String, max: 100, required: true },
    email: { type: String, max: 30, required: true },
    phone: { type: Number, required: true },
    address: { type: String, max: 100, required: true },
    products: [productInTicketSchema], // Usamos el esquema de producto en ticket aquí
    totalPrice: { type: Number, required: true },
    ticketCode: { type: String, max: 100, required: true },
  },
  { timestamps: true } // Usar timestamps para createdAt y updatedAt mongoose manejara automaticamente la creacion y actualizacion del ticket
);

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketModel;
