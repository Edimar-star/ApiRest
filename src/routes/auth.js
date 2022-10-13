import { Router } from "express"
import { getUserById, getUsers, loginCtrl, registerCtrl } from "../controllers/auth.js"
import { checkRoleAuth } from "../middlewares/roleAuth.js"
import { checkAuth } from "../middlewares/auth.js"

const router = Router()

//Rutas
router.post('/login', loginCtrl)
router.post('/register', registerCtrl)
router.get('/user', checkAuth, getUserById)
router.get('/users', checkRoleAuth, getUsers)

export default router