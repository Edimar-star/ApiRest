import { pool } from '../db.js'

export const getUserPurchases = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM compras')
    res.json(rows);
}


export const getPurchases = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM compras WHERE idCliente = ?', [id])
    res.json(rows);
}

export const createPurchase = async (req, res) => {
    const { idCliente, idDocumento, medioPago, cantidad, total, fecha } = req.body
    const [rows] = await pool.query('INSERT INTO compras (idCliente, idDocumento, cantidad, total, fecha) VALUES (?, ?, ?, ?, ?, ?)', 
    [idCliente, idDocumento, cantidad, total, fecha]);
    res.send({
        id: rows.insertId,
        idCliente,
        idDocumento,
        medioPago,
        cantidad,
        total,
        fecha
    })
}