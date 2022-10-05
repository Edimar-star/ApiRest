import { pool } from '../db'

export const getDocumentTypes = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM tipoDocumento')
    res.json(rows);
}

export const getDocumentTypeById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM tipoDocumento WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createDocumentType = async (req, res, tipo) => {
    const { nombre } = req.body
    const [rows] = await pool.query('INSERT INTO tipoDocumento (nombre) VALUES (?)', 
    [nombre]);
    res.send({
        id: rows.insertId,
        nombre
    })
}

export const deleteDocumentType = async (req, res) => {
    const [result] = await pool.query('DELETE FROM tipoDocumento WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updateDocumentType = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body

    const [result] = await pool.query(`UPDATE tipoDocumento SET nombre = IFNULL(?, nombre) WHERE id = ?`, 
    [nombre, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = await pool.query('SELECT * FROM tipoDocumento WHERE id = ?', [id])
    res.json(rows[0])
}