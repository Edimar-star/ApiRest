import express from 'express'
import authRutes from './routes/auth.js'
import documentRoutes from './routes/documents.js'
import purchaseRoutes from './routes/purchases.js'
import rentRoutes from './routes/rents.js'

const app = express()

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Rutas
app.use(authRutes)
app.use(documentRoutes)
app.use(purchaseRoutes)
app.use(rentRoutes)

//Route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint nod found'
    })
})

export default app