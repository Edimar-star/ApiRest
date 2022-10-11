import { pool } from '../db.js'

export const getRents = async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM alquiles WHERE idCliente = ?', [id])
    res.json(rows);
}

export const createRent = async (req, res) => {
    const { idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile } = req.body
    const [rows] = await pool.query('INSERT INTO alquiles (idCliente, idDocumento, cantidad, total, fechaInicioAlquile, fechaFinAlquile) VALUES (?, ?, ?, ?, ?, ?)', 
    [idCliente, idDocumento, cantidad, total, fechaInicioAlquile, fechaFinAlquile]);
    res.send({
        id: rows.insertId,
        idCliente,
        idDocumento,
        medioPago,
        cantidad,
        total,
        fechaInicioAlquile,
        fechaFinAlquile
    })
}