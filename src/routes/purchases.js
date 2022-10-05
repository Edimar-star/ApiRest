import { Router } from "express"
import { createPurchase, deletePurchase, getPurchaseById, getPurchases, updatePurchase } from "../controllers/purchases"

const router = Router()

//Rutas
router.get('/purchases', getPurchases)
router.get('/purchases/:id', getPurchaseById)
router.post('/purchases', createPurchase)
router.put('/purchases/:id', updatePurchase)
router.delete('/purchases/:id', deletePurchase)

export default router