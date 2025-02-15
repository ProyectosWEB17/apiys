 
const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

// Configurar Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST_ACCESS_TOKEN'
});

// ✅ Webpay - Generar URL de Pago (Simulación por ahora)
router.post('/webpay', async (req, res) => {
    const { monto, orden_id } = req.body;
    console.log(`🔄 Simulando pago con Webpay: Orden ${orden_id} - Monto ${monto}`);
    res.json({ url: `https://simulacion-webpay.com/pago?orden=${orden_id}&monto=${monto}` });
});

// ✅ Mercado Pago - Generar URL de Pago (Simulación por ahora)
router.post('/mercadopago', async (req, res) => {
    const { monto, descripcion, orden_id } = req.body;

    const preference = {
        items: [{
            title: descripcion,
            quantity: 1,
            currency_id: 'CLP',
            unit_price: parseInt(monto)
        }],
        back_urls: {
            success: `${process.env.BASE_URL}/pago-exitoso.html`,
            failure: `${process.env.BASE_URL}/pago-fallido.html`
        },
        auto_return: "approved",
        external_reference: orden_id
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.json({ url: response.body.init_point });
    } catch (error) {
        console.error('❌ Error en Mercado Pago:', error);
        res.status(500).json({ error: 'Error al generar pago con Mercado Pago' });
    }
});

// ✅ Confirmación de Pago (Webhook)
router.post('/webpay/confirmacion', async (req, res) => {
    console.log('📩 Webpay Confirmación:', req.body);
    res.redirect(`${process.env.BASE_URL}/pago-exitoso.html`);
});

router.post('/mercadopago/confirmacion', async (req, res) => {
    console.log('📩 Mercado Pago Confirmación:', req.body);
    res.redirect(`${process.env.BASE_URL}/pago-exitoso.html`);
});

module.exports = router;
