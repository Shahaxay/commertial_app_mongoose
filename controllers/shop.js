const Product = require('../models/product');
const User=require('../models/user');
const Order=require('../models/order');

exports.getProducts = async(req, res, next) => {
  try{
    const products=await Product.find()
    // .select('title price userId -_id')
    // .populate('userId','name email')
    ;
    // console.log(products);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }
  catch(err){
    console.log(err);
  };
};

exports.getProduct = async(req, res, next) => {
  const prodId = req.params.productId;
  try{
    console.log(prodId);
    const product = await Product.findById(prodId);
    console.log(product);
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
  }
  catch(err){
    console.log(err);
  }
}

exports.getIndex = async(req, res, next) => {
  try{
    const products=await Product.find();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }
  catch(err){
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try{
    const user=await req.user.populate('cart.items.productId','title price -_id');
    const products=user.cart.items;
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products,
      totalPrice: "not calculated yet"
    });
  }
  catch(err){
    console.log(err);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try{
    const user=await req.user.addToCart(prodId);
    console.log(user.cart.items);
    console.log("added successfully");
    res.redirect('./cart');
  }catch(err){
    console.log(err);
  }

}

exports.postDeleteCartItem = async (req, res, next) => {
  const prodId = req.body.productId;
  try{
    await req.user.deleteCartItem(prodId);
    console.log("cart item removed");
    res.redirect('/cart');
}
catch(err){
  console.log(err);
}
}

exports.getOrders = async (req, res, next) => {

  try{
    let orders=await Order.find({'user.userId':req.user._id}).select('orderItem');
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
  }catch(err){
    console.log(err);
  }
};

exports.postOrder=async (req,res,next)=>{
  const user={name:req.user.name,userId:req.user._id};
  try{
    await req.user.populate('cart.items.productId');
    const product=req.user.cart.items.map(i=>{
      return {product:{...i.productId._doc},quantity:i.quantity};
    })
    const order=new Order({orderItem:product,user:user});
    await order.save();
    //clean the cart
    await req.user.clearCart();
      res.redirect('/orders');
  }
  catch(err){
    console.log(err);
  }
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
