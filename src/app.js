import express from 'express'
import documentsRoutes from './routes/documents'
import purchasesRoutes from './routes/purchases'
import rentsRoutes from './routes/rents'
import usersRoutes from './routes/users'
import adminsRoutes from './routes/admins'
import { getUserById } from './controllers/users' 

const app = express()

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Rutas
app.use(documentsRoutes)
app.use(purchasesRoutes)
app.use(rentsRoutes)
app.use(usersRoutes)
app.use(adminsRoutes)

//Route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint nod found'
    })
})