import express from 'express';

const app = express();

app.use(express.json());

// import routes
import healthcheckRoute from './routes/healthcheck.routes.js'

// routes
app.use(healthcheckRoute)

app.get('/api/users/', (req, res) => res.send("Hello world"))

export default app;