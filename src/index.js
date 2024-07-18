import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
    path: './.env',
})

const PORT = process.env.PORT || 8000

connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`)))
    .catch((err) => console.log("App listening error: ", err))
