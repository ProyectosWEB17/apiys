const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '64.176.8.174',  // 🔵 Cloudways MySQL Host
    user: 'ppzawhyrwv',
    password: 'jn7GA53tMT',  // 🔴 Contraseña de la base de datos
    database: 'ppzawhyrwv',
    port: 3306,  // 🔵 Puerto MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Error de conexión con MySQL:", err);
    } else {
        console.log("✅ Conectado a MySQL en Cloudways");
        connection.release(); // Liberar la conexión
    }
});

module.exports = pool.promise();
