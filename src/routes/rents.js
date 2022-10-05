import { Router } from "express"
import { createRent, deleteRent, getRentById, getRents, updateRent } from "../controllers/rents"

const router = Router()

//Rutas
router.get('/rents', getRents)
router.get('/rents/:id', getRentById)
router.post('/rents', createRent)
router.put('/rents/:id', updateRent)
router.delete('/rents/:id', deleteRent)

export default router