import { Router } from "express"
import { createDocument, getDocuments, updateDocument, deleteDocument, getUserDocuments } from "../controllers/documents.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkRoleAuth } from "../middlewares/roleAuth.js"
import { getDocumentTypes } from "../controllers/documentType.js"

const router = Router()

//Rutas
router.get('/documentTypes', checkAuth, getDocumentTypes)
router.get('/documents', checkAuth, getDocuments)
router.get('/documents/:id', checkAuth, getUserDocuments)
router.post('/documents', checkRoleAuth, createDocument)
router.put('/documents/:id', checkRoleAuth, updateDocument)
router.delete('/documents/:id', checkRoleAuth, deleteDocument)

export default router