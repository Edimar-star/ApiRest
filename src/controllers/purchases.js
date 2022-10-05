import { pool } from '../db'

export const getPurchases = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM compras')
    res.json(rows);
}

export const getPurchaseById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM compras WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createPurchase = async (req, res) => {
    const { idCliente, idDocumento, medioPago, cantidad, total, fecha } = req.body
    const [rows] = await pool.query('INSERT INTO compras (idCliente, idDocumento, medioPago, cantidad, total, fecha) VALUES (?, ?, ?, ?, ?, ?)', 
    [idCliente, idDocumento, medioPago, cantidad, total, fecha]);
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

export const deletePurchase = async (req, res) => {
    const [result] = await pool.query('DELETE FROM compras WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updatePurchase = async (req, res) => {
    const { id } = req.params
    const { idCliente, idDocumento, medioPago, cantidad, total, fecha } = req.body

    const [result] = await pool.query(`UPDATE compras SET idCliente = IFNULL(?, idCliente), 
                                idDocumento = IFNULL(?, idDocumento), medioPago = IFNULL(?, medioPago), 
                                cantidad = IFNULL(?, cantidad), total = IFNULL(?, total), 
                                fecha = IFNULL(?, fecha) WHERE id = ?`, 
    [idCliente, idDocumento, medioPago, cantidad, total, fecha, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = pool.query('SELECT * FROM compras WHERE id = ?', [id])
    res.json(rows[0])
}