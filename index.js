import express from "express";
const app = express()
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";
import router from "./routes/Openlessonroute.js";
import router_otkritiyUrok from './routes/otkritiyUrokRoute.js'
import router_tur from './routes/turRoute.js'
import router_review from './routes/reviewRoute.js'
import router_completed from './routes/completedRequestsRoute.js'


const PORT = process.env.PORT || 7777;
app.use(express.json())
app.use(cors({
    origin: ['https://istiqbollitalim.com', 'https://admin-panel-ashy-one.vercel.app', 'https://www.istiqbollitalim.com', 'https://web-production-340a1.up.railway.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type']
}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Hello")
})


app.use('/openlessons', router);
app.use('/otkritiyUrok', router_otkritiyUrok);
app.use('/tur', router_tur);
app.use('/review', router_review);
app.use('/completed-requests', router_completed);


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"), app.listen(process.env.PORT || 7777, () => {
        console.log(`server ok port started`);
    }))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
    