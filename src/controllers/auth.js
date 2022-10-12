import { encrypt, compare } from '../helpers/handleBcrypt.js'; 
import { tokenSign } from '../helpers/generateToken.js'
import { pool } from '../db.js'
import { httpError } from '../helpers/handleError.js';

export const loginCtrl = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM clientes WHERE username = ?", [username]);
        const user = rows[0];

        if (!user) {
            res.status(404)
            res.send({ error: "User not found" })
        }

        const checkPassword = await compare(password, user.userPassword);
        const tokenSession = await tokenSign(user);

        if (checkPassword) {
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: "Invalid password"
            })
            return
        }
    } catch (e) {
        httpError(res, e)
    }
}

export const registerCtrl = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { username, password } = req.body

        const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!
        const [rows] = await pool.query('INSERT INTO clientes (username, userPassword) VALUES (?, ?)', [username, passwordHash]);

        res.json({
            id: rows.insertId,
            username,
            passwordHash
        })

    } catch (e) {
        httpError(res, e)
    }
}

export const getUserById = async(req, res) => {
    const { username } = req.body;
    const [rows] = await pool.query('SELECT * FROM clientes WHERE username = ?', [username]);
    res.json(rows[0])
}

export const getUsers = async(req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows)
}