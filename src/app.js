import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import routes
import healthcheckRoute from './routes/healthcheck.routes.js'
import serviceRoutes from './routes/service.routes.js'

// routes
app.use(healthcheckRoute)
app.use(serviceRoutes)

app.get('/api/users/', (req, res) => res.send("Hello world"))

export default app;