import { Router } from "express"
import { createRent, getRents } from "../controllers/rents.js"
import { checkOrigin } from "../middlewares/origin.js"
import { checkAuth } from "../middlewares/auth.js"

const router = Router()

//Rutas
router.get('/rents/:id', checkAuth, checkOrigin, getRents)
router.post('/rents', checkAuth, checkOrigin, createRent)

export default router