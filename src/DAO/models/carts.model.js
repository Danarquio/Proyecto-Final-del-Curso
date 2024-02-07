import mongoose from "mongoose"

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref:`products`},
            quantity: Number,
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
})

export const cartsModel  = mongoose.model(cartsCollection, cartsSchema)

