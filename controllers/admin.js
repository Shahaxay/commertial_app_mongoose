const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({ title: title, price: price, description: description, imageUrl: imageUrl,userId:req.user}); //mongoose takes itself only id for reference relations
  try {
    const result = await product.save();
    console.log(result);
    console.log("element created and inserted into db")
    res.redirect('/admin/products');
  }
  catch (err) {
    console.log(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId)
    if (!product) {
      console.log("no product found with that id");
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }
  catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }
  catch (err) {
    console.log(err);
  }
};

//editing the product
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  console.log("from PostEditProduct", prodId);
  //creating new product
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  try {
    let product = await Product.findById(prodId);
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;
    await product.save();
    console.log("UPDATED PRODUCT");
    res.redirect('/admin/products');
  }
  catch (err) {
    console.log(err);
  }
}

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await Product.findByIdAndRemove(prodId);
    console.log("DELETED ELEMENT");
    res.redirect('/admin/products');
  }
  catch (err) {
    console.log(err);
  }
}
