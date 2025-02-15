 
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Obtener todos los productos
router.get('/', productosController.getProductos);

// Agregar un nuevo producto
router.post('/', productosController.addProducto);

// Eliminar un producto
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
