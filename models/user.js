const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../models/product.js');
const Order=require('../models/order.js');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [
            { productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true } }
        ]
    }
});

UserSchema.methods.addToCart = async function (prodId) {
    try {
        const product = await Product.findById(prodId);
        // console.log(this.cart);
        const productIndex = this.cart.items.findIndex(item => item.productId.toString() == product._id.toString());
        let newQuantity = 1;
        let updated_cart = [...this.cart.items];
        if (productIndex >= 0) {
            //increase the quantity count
            newQuantity = this.cart.items[productIndex].quantity + 1;
            updated_cart[productIndex].quantity = newQuantity;
        } else {
            //insert the product into cart with quantity 1
            updated_cart.push({ productId: product._id, quantity: newQuantity });
        }
        this.cart = { items: updated_cart };
        return this.save();
    }
    catch (err) {
        console.log(err);
    }
}
UserSchema.methods.deleteCartItem = function (prodId) {
    this.cart.items = this.cart.items.filter(i => i.productId.toString() != prodId.toString());
    return this.save();
}

UserSchema.methods.clearCart=function(){
    this.cart={items:[]};
    return this.save();
}

module.exports = mongoose.model('User', UserSchema);