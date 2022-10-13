import { Router } from "express"
import { createPurchase, getPurchases, getUserPurchases } from "../controllers/purchases.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkRoleAuth } from "../middlewares/roleAuth.js"

const router = Router()

//Rutas
router.get('/purchases/:id', checkAuth, getUserPurchases)
router.get('/purchases', checkRoleAuth, getPurchases)
router.post('/purchases', checkAuth, createPurchase)

export default router