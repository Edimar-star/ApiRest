import { Router } from "express"
import { createPurchase, getPurchases } from "../controllers/purchases.js"
import { checkOrigin } from "../middlewares/origin.js"
import { checkAuth } from "../middlewares/auth.js"

const router = Router()

//Rutas
router.get('/purchases/:id', checkAuth, checkOrigin, getPurchases)
router.post('/purchases', checkAuth, checkOrigin, createPurchase)

export default router