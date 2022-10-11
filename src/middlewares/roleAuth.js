import { verifyToken } from '../helpers/generateToken.js'
import { pool } from '../db.js'

export const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //TODO: 231231321
        const tokenData = await verifyToken(token)
        const [rows] = await pool.query('SELECT * FROM alquiles WHERE id = ?', [tokenData._id])
        const userData = rows[0] //TODO: 696966

        //TODO ['user'].includes('user')
        if ([].concat(roles).includes(userData.rol)) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}