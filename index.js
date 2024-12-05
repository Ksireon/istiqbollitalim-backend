import express from "express";
const app = express()
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";
import router from "./routes/Openlessonroute.js";
import router_otkritiyUrok from './routes/otkritiyUrokRoute.js'
import router_tur from './routes/turRoute.js'
import router_review from './routes/reviewRoute.js'


const PORT = process.env.PORT || 7777;
app.use(express.json())
app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type']
})
)
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Hello")
})


app.use('/openlessons', router);
app.use('/otkritiyUrok', router_otkritiyUrok);
app.use('/tur', router_tur);
app.use('/review', router_review);


mongoose
    .connect("mongodb+srv://dominik:GbqCE2VOSqfKrlCs@istiqbollitalim.rz8wr.mongodb.net/openlessons?retryWrites=true&w=majority&appName=Istiqbollitalim")
    .then(() => console.log("Connected to MongoDB"), app.listen(PORT, () => {
        console.log(`server ok ${PORT} port started`);
    }))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
