import { pool } from '../db.js'

export const getDocumentTypes = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM tipoDocumento')
    res.json(rows);
}

export const createDocumentType = async (req, res, tipo) => {
    const { nombre } = req.body
    const [rows] = await pool.query('INSERT INTO documentos (nombreTipo) VALUES (?)', 
    [nombre]);
    res.send({
        id: rows.insertId,
        nombreTipo: nombre,
    })
}