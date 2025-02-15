 
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const productosRoutes = require('./routes/products');
app.use('/api/productos', productosRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('🚀 API funcionando, esperando conexión con MySQL...');
});

// Servidor corriendo
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// ✅ **Ruta para obtener todos los productos**
app.get('/api/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ✅ **Ruta para filtrar productos por categoría o búsqueda**
app.get('/api/productos', async (req, res) => {
    const { categoria, buscar } = req.query;
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params = [];

    if (categoria) {
        query += ' AND categoria = ?';
        params.push(categoria);
    }

    if (buscar) {
        query += ' AND nombre LIKE ?';
        params.push(`%${buscar}%`);
    }

    try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error en la búsqueda de productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
