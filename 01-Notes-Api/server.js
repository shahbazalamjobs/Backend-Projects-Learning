import express from 'express'
import app from './app.js'
const port = 3000;

app.get('/', (req, res) =>{
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})