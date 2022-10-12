import { Router } from "express"
import { createDocument, getDocuments, updateDocument, deleteDocument } from "../controllers/documents.js"
import { checkOrigin } from "../middlewares/origin.js"
import { checkAuth } from "../middlewares/auth.js"
import { checkRoleAuth } from "../middlewares/roleAuth.js"
import { getDocumentTypes } from "../controllers/documentType.js"

const router = Router()

//Rutas
router.get('/documentTypes', checkAuth, checkOrigin, getDocumentTypes)
router.get('/documents', checkAuth, checkOrigin, getDocuments)
router.post('/documents', (req, res, next) => {
    checkAuth(req, res, next) 
    checkOrigin(req, res, next)
    checkRoleAuth['admin'](req, res, next)
    createDocument(req, res)
})
router.put('/documents/:id', (req, res, next) => {
    checkAuth(req, res, next) 
    checkOrigin(req, res, next)
    checkRoleAuth['admin'](req, res, next)
    updateDocument(req, res)
})
router.delete('/documents/:id', (req, res, next) => {
    checkAuth(req, res, next) 
    checkOrigin(req, res, next)
    checkRoleAuth['admin'](req, res, next)
    deleteDocument(req, res)
})

export default router