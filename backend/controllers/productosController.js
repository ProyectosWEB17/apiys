const pool = require('../db');

exports.getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos'); // 🔹 Usar `await` correctamente
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Agregar un nuevo producto
exports.addProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, stock, imagen, categoria], (error, results) => {
        if (error) {
            console.error('❌ Error al agregar producto:', error);
            res.status(500).json({ error: 'Error al agregar producto' });
        } else {
            res.json({ message: '✅ Producto agregado correctamente', id: results.insertId });
        }
    });
};

// Eliminar un producto
exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('❌ Error al eliminar producto:', error);
            res.status(500).json({ error: 'Error al eliminar producto' });
        } else {
            res.json({ message: '✅ Producto eliminado correctamente' });
        }
    });
};
