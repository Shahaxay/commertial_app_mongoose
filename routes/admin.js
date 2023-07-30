const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => get
router.get('/edit-product/:productId',adminController.getEditProduct);

// /admin/edit-product =>post
router.post('/edit-product',adminController.postEditProduct);

// // /admin/delete-product => post
router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router;
