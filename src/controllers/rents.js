import { pool } from '../db'

export const getRents = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM alquiles')
    res.json(rows);
}

export const getRentById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM alquiles WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createRent = async (req, res) => {
    const { idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile } = req.body
    const [rows] = await pool.query('INSERT INTO alquiles (idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile]);
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

export const deleteRent = async (req, res) => {
    const [result] = await pool.query('DELETE FROM alquiles WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updateRent = async (req, res) => {
    const { id } = req.params
    const { idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile } = req.body

    const [result] = await pool.query(`UPDATE alquiles SET idCliente = IFNULL(?, idCliente), 
                                idDocumento = IFNULL(?, idDocumento), medioPago = IFNULL(?, medioPago), 
                                cantidad = IFNULL(?, cantidad), total = IFNULL(?, total), 
                                fechaInicioAlquile = IFNULL(?, fechaInicioAlquile), 
                                fechaFinAlquile = IFNULL(?, fechaFinAlquile)  WHERE id = ?`, 
    [idCliente, idDocumento, medioPago, cantidad, total, fechaInicioAlquile, fechaFinAlquile, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = pool.query('SELECT * FROM alquiles WHERE id = ?', [id])
    res.json(rows[0])
}