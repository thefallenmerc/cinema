import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();

// Add morgan logging
app.use(morgan(":method :url :status :res[content-length] :response-time ms"));

// Use config env
dotenv.config();

app.get('/', (req, res) => {
    res.json({
        message: "Server Running fine!"
    })
});

// listen to .env port or 3000
app.listen(process.env.PORT || '3000');