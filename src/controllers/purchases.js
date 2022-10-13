import { pool } from '../db.js'

export const getPurchases = async (req, res) => {
    const [rows] = await pool.query('SELECT c.id, d.nombre, cl.username, c.total, c.fecha FROM compras c, clientes cl, documentos d WHERE c.idCliente = cl.id and c.idDocumento = d.id')
    res.json(rows);
}


export const getUserPurchases = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT d.nombre, td.nombreTipo, d.tipo, c.total, c.fecha FROM compras c, documentos d, tipoDocumento td, clientes cl WHERE td.id = d.tipoDoc and c.idDocumento = d.id and cl.id = c.idCliente and cl.id = ?', [id])
    res.json(rows);
}

export const createPurchase = async (req, res) => {
    const { idCliente, idDocumento, total } = req.body
    const [rows] = await pool.query('INSERT INTO compras (idCliente, idDocumento, total) VALUES (?, ?, ?)', 
    [idCliente, idDocumento, total]);
    await pool.query('UPDATE documentos SET cantidad = cantidad - 1')
    res.send({
        id: rows.insertId,
        idCliente,
        idDocumento,
        total
    })
}