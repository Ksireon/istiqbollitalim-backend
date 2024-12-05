import express from 'express';
import OtkritiyUrok from '../models/otkritiyUrok.js'

const router_otkritiyUrok = express.Router();

router_otkritiyUrok.post('/', async (req, res) => {
    try {
        if (!req.body.firsName || !req.body.number || !req.body.urok) {
            return res.status(400).send({
                message: 'Send all required fields: firsName, phone, lesson'
            });
        }
        const newUrok = {
            firsName: req.body.firsName,
            number: req.body.number,
            urok: req.body.urok
        };
        const client = await OtkritiyUrok.create(newUrok)
        return res.status(201).send(client)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})

export default router_otkritiyUrok