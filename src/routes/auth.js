import { Router } from "express"
import { getUserById, getUsers, loginCtrl, registerCtrl } from "../controllers/auth.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkOrigin } from "../middlewares/origin.js"

const router = Router()

//Rutas
router.post('/login', loginCtrl)
router.post('/register', registerCtrl)
router.get('/user', checkAuth, checkOrigin, getUserById)
router.get('/users', (req, res, next) => {
    checkAuth(req, res, next) 
    checkOrigin(req, res, next)
    checkRoleAuth['admin'](req, res, next)
    getUsers(req, res)
})

export default router