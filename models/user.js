const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = require('../models/product.js');

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




// const database=require('../util/database');
// const Product=require('../models/product');

// class OS_user{
//     constructor(name,email,cart,id){
//         this.name=name,
//         this.email=email,
//         this.cart=cart,
//         this._id=id?new mongoDb.ObjectId(id):null;
//     }
//     save(){
//         const db=database.getDb();
//         return db.collection('User').insertOne(this);
//     }
//     static findUserByID(userId){
//         const db=database.getDb();
//         return db.collection('User').findOne({_id:new mongoDb.ObjectId(userId)});
//     }
//     async addToCart(prodId){
//         try{
//             const product=await Product.findByPk(prodId);
//             // console.log(this.cart);
//             const productIndex=this.cart.items.findIndex(item=>item.productId.toString()==product._id.toString());
//             let newQuantity=1;
//             let updated_cart=[...this.cart.items];
//             if(productIndex>=0){
//                 //increase the quantity count
//                 newQuantity=this.cart.items[productIndex].quantity+1;
//                 updated_cart[productIndex].quantity=newQuantity;
//             }else{
//                 //insert the product into cart with quantity 1
//                 updated_cart.push({productId:product._id,quantity:newQuantity});
//             }
//             updated_cart={items:updated_cart};
//             const db=database.getDb();
//             return db.collection('User').updateOne({_id:this._id},{$set:{cart:updated_cart}});
//         }
//         catch(err){
//             console.log(err);
//         } 
//     }

//     async getCart(){
//         const productIds=this.cart.items.map(i=>{
//             return i.productId;
//         })
//         try{
//             const db=database.getDb();

//             const products=await db.collection('Product').find({_id:{$in:productIds}}).toArray();
//             const requiredProductData=products.map(i=>{
//                 return {
//                     productId:i._id,
//                     title:i.title,
//                     quantity:this.cart.items.find(cart_i=>cart_i.productId.toString()==i._id.toString()).quantity
//                 };
//             })
//             return new Promise(res=>res(requiredProductData));
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

//     deleteCartItem(prodId){
//         let updated_cart=this.cart.items.filter(i=>i.productId.toString()!=prodId.toString());
//         updated_cart={items:updated_cart};
//         const db=database.getDb();
//         return db.collection('User').updateOne({_id:this._id},{$set:{cart:updated_cart}});
//     }

//     async makeOrder(){
//         try{
//             const order={
//                 orderItem:await this.getCart(),
//                 user:{
//                     _id:new mongoDb.ObjectId(this._id),
//                     name:this.name   
//                 }
//             }
//             //make the cart empty
//             this.cart={items:[]};
//             const db=database.getDb();
//             //update db
//             await db.collection('User').updateOne({_id:this._id},{$set:{cart:this.cart}});
//             return db.collection('Order').insertOne(order);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

//     getOrders(){
//         const db=database.getDb();
//         return db.collection('Order').find({'user._id':this._id}).toArray();
//     }
// }

module.exports = mongoose.model('User', UserSchema);