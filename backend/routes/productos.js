 
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Obtener productos destacados
router.get('/destacados', (req, res) => {
    db.query('SELECT * FROM productos WHERE destacado = 1 LIMIT 6', (err, resultados) => {
        if (err) {
            console.error('Error al obtener productos destacados:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json(resultados);
        }
    });
});

module.exports = router;
