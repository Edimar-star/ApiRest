import { pool } from '../db.js'

export const getDocumentTypes = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM tipoDocumento')
    res.json(rows);
}