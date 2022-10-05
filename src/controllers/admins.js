import { pool } from '../db'

export const getAdmins = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM admininstradores')
    res.json(rows);
}

export const getAdminById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM admininstradores WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createAdmin = async (req, res) => {
    const { nombre, contraseña } = req.body
    const [rows] = await pool.query('INSERT INTO admininstradores (nombre, contraseña) VALUES (?, ?)', 
    [nombre, contraseña]);
    res.send({
        id: rows.insertId,
        nombre,
        contraseña
    })
}

export const deleteAdmin = async (req, res) => {
    const [result] = await pool.query('DELETE FROM admininstradores WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params
    const { nombre, contraseña } = req.body

    const [result] = await pool.query(`UPDATE admininstradores SET nombre = IFNULL(?, nombre), 
                                contraseña = IFNULL(?, contraseña) WHERE id = ?`, 
    [nombre, contraseña, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = pool.query('SELECT * FROM admininstradores WHERE id = ?', [id])
    res.json(rows[0])
}