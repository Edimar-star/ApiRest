import { Router } from "express"
import { createAdmin, deleteAdmin, getAdminById, getAdmins, updateAdmin } from "../controllers/admins"

const router = Router()

//Rutas
router.get('/admins', getAdmins)
router.get('/admins/:id', getAdminById)
router.post('/admins', createAdmin)
router.put('/admins/:id', updateAdmin)
router.delete('/admins/:id', deleteAdmin)

export default router