import { pool } from '../db'

export const getUsers = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes')
    res.json(rows);
}

export const getUserById = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id])
    res.json(rows[0])
}

export const createUser = async (req, res) => {
    const { nombre, contraseña } = req.body
    const [rows] = await pool.query('INSERT INTO clientes (nombre, contraseña) VALUES (?, ?)', 
    [nombre, contraseña]);
    res.send({
        id: rows.insertId,
        nombre,
        contraseña
    })
}

export const deleteUser = async (req, res) => {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id])
    res.send(result.affectedRows)
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { nombre, contraseña } = req.body

    const [result] = await pool.query(`UPDATE clientes SET nombre = IFNULL(?, nombre), 
                                contraseña = IFNULL(?, contraseña) WHERE id = ?`, 
    [nombre, contraseña, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message : "Not found"})
    }

    const [rows] = pool.query('SELECT * FROM clientes WHERE id = ?', [id])
    res.json(rows[0])
}