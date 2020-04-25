import express from 'express';
import morgan from 'morgan';

const app = express();

// Add morgan logging
app.use(morgan(":method :url :status :res[content-length] :response-time ms"));

// Use config env

app.get('/', (req, res) => {
    res.json({
        message: "Server Running fine!"
    })
});


app.listen(8000);