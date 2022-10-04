import express from 'express'
//import { pool } from './db'
import documentsRoutes from './routes/documents'
import purchasesRoutes from './routes/purchases'
import rentsRoutes from './routes/rents'
import usersRoutes from './routes/users'

const app = express()

//Rutas
app.use(documentsRoutes)
app.use(purchasesRoutes)
app.use(rentsRoutes)
app.use(usersRoutes)

app.listen(300)