import { Router } from "express"
import { createRent, getRents, getUserRents } from "../controllers/rents.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkRoleAuth } from "../middlewares/roleAuth.js"

const router = Router()

//Rutas
router.get('/rents/:id', checkAuth, getUserRents)
router.get('/rents', checkRoleAuth, getRents)
router.post('/rents', checkAuth, createRent)

export default router