import { pool } from '../db'
import { createDocument, deleteDocument, updateDocument } from "./documents"

export const getElectronicDocuments = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM documentosElectronicos')
    res.json(rows)
}

export const createElectronicDocument = async (req, res) => {
    const { nombre, autor, tipoDocumento, cantidad, precio, descripcion } = req.body
    await pool.query('INSERT INTO documentosElectronicos (nombre, autor, tipoDocumento, cantidad, precio, descripcion) VALUES (?, ?, ?, ?, ?, ?)', 
    [nombre, autor, tipoDocumento, cantidad, precio, descripcion]);
    createDocument(req, res, "Electronico")
}

export const deleteElectronicDocument = async (req, res) => {
    await pool.query('DELETE FROM documentosElectronicos WHERE id = ?', [req.params.id])
    deleteDocument(req, res)
}

export const updateElectronicDocument = async (req, res) => {
    const { id } = req.params
    const { nombre, autor, tipoDocumento, cantidad, precio, descripcion } = req.body

    await pool.query(`UPDATE documentosElectronicos SET nombre = IFNULL(?, nombre), 
                                autor = IFNULL(?, autor), tipoDocumento = IFNULL(?, tipoDocumento), 
                                cantidad = IFNULL(?, cantidad), precio = IFNULL(?, precio), 
                                descripcion = IFNULL(?, descripcion) WHERE id = ?`, 
    [nombre, autor, tipoDocumento, cantidad, precio, descripcion, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    await pool.query('SELECT * FROM documentos WHERE id = ?', [id])
    updateDocument(req, res)
}