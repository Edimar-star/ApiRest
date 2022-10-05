import express from 'express'
import documentsRoutes from './routes/documents'
import purchasesRoutes from './routes/purchases'
import rentsRoutes from './routes/rents'
import usersRoutes from './routes/users'

const app = express()

app.use(express.json())

//Rutas
app.use(documentsRoutes)
app.use(purchasesRoutes)
app.use(rentsRoutes)
app.use(usersRoutes)

//Route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint nod found'
    })
})