import { Router } from "express"
import { getDocumentById, getDocuments } from "../controllers/documents"
import { createElectronicDocument, getElectronicDocuments, deleteElectronicDocument, updateElectronicDocument } from "../controllers/electronicDocuments"
import { createPhysicalDocument, getPhysicalDocuments, deletePhysicalDocument, updatePhysicalDocument } from "../controllers/physicalDocuments"

const router = Router()

//Rutas
router.get('/documents', getDocuments)
router.get('/physicalDocuments', getElectronicDocuments)
router.get('/electronicsDocuments', getPhysicalDocuments)
router.get('/documents/:id', getDocumentById)
router.post('/physicalDocuments', createPhysicalDocument)
router.post('/electronicDocuments', createElectronicDocument)
router.put('/physicalDocuments/:id', updatePhysicalDocument)
router.put('/electronicDocuments/:id', updateElectronicDocument)
router.delete('/physicalDocuments/:id', deletePhysicalDocument)
router.delete('/electronicDocuments/:id', deleteElectronicDocument)

export default router