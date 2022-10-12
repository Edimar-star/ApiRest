import { pool } from '../db.js'

export const getDocuments = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM documentos')
    res.json(rows);
}

export const getDocumentById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM documentos WHERE id = ?', req.params.id);
    res.json(rows[0])
}

export const createDocument = async (req, res, tipo) => {
    const { nombre, autor, tipoDocumento, cantidad, precio, descripcion } = req.body
    const [rows] = await pool.query('INSERT INTO documentos (nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, autor, tipoDocumento, cantidad, precio, descripcion]);
    res.send({
        id: rows.insertId,
        nombre,
        autor,
        tipoDocumento,
        cantidad,
        precio,
        tipo,
        descripcion
    })
}

export const deleteDocument = async (req, res) => {
    const [result] = await pool.query('DELETE FROM documentos WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updateDocument = async (req, res) => {
    const { id } = req.params
    const { nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion } = req.body

    const [result] = await pool.query(`UPDATE documentos SET nombre = IFNULL(?, nombre), 
                                autor = IFNULL(?, autor), tipoDocumento = IFNULL(?, tipoDocumento), 
                                cantidad = IFNULL(?, cantidad), precio = IFNULL(?, precio),
                                tipo = IFNULL(?, tipo), descripcion = IFNULL(?, descripcion) WHERE id = ?`, 
    [nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = await pool.query('SELECT * FROM documentos WHERE id = ?', [id])
    res.json(rows[0])
}