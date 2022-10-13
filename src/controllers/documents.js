import { pool } from '../db.js'

export const getDocuments = async (req, res) => {
    const [rows] = await pool.query('SELECT d.*, td.nombreTipo FROM documentos d, tipoDocumento td WHERE d.tipoDoc = td.id')
    res.json(rows);
}

export const getUserDocuments = async (req, res) => {
    const { id } = req.params;
    const [docP] = await pool.query('SELECT d.*, td.nombreTipo FROM documentos d, compras c, clientes cl, tipoDocumento td WHERE d.tipoDoc = td.id and c.idDocumento = d.id and c.idCliente = cl.id and cl.id = ?', [id]);
    const [docA] = await pool.query('SELECT d.*, td.nombreTipo FROM documentos d, alquiles c, clientes cl, tipoDocumento td WHERE d.tipoDoc = td.id and c.idDocumento = d.id and c.idCliente = cl.id and c.fechaFinAlquile >= now() and cl.id = ?', [id]);
    const rows = docA.concat(docP);
    res.json(rows)
}

export const createDocument = async (req, res) => {
    const { nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion } = req.body
    const [rows] = await pool.query('INSERT INTO documentos (nombre, autor, tipoDoc, cantidad, precio, tipo, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion]);
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
    console.log(req.params.id)
    const [result] = await pool.query('DELETE FROM documentos WHERE id = ?', [req.params.id])
}

export const updateDocument = async (req, res) => {
    const { id } = req.params
    const { nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion } = req.body

    const [result] = await pool.query(`UPDATE documentos SET nombre = IFNULL(?, nombre), 
                                autor = IFNULL(?, autor), tipoDoc = IFNULL(?, tipoDoc), 
                                cantidad = IFNULL(?, cantidad), precio = IFNULL(?, precio),
                                tipo = IFNULL(?, tipo), descripcion = IFNULL(?, descripcion) WHERE id = ?`, 
    [nombre, autor, tipoDocumento, cantidad, precio, tipo, descripcion, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = await pool.query('SELECT * FROM documentos WHERE id = ?', [id])
    res.json(rows[0])
}