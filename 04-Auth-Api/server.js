import dotenv from 'dotenv'
import app from './app.js'
import connectDB from 'config/db.js'
const PORT = process.env.PORT || 3000

dotenv.config();
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at localhost://${PORT}`)
});