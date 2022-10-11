import { Router } from "express"
import { loginCtrl, registerCtrl } from "../controllers/auth.js"

const router = Router()

//Rutas
router.post('/login', loginCtrl)
router.post('/register', registerCtrl)

export default router