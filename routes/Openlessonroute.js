import express from 'express';
import OpenLessons from '../models/Openlessons.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.body.firsName || !req.body.number) {
            return res.status(400).send({
                message: 'Send all required fields: firsName, phone'
            });
        }
        const newlesson = {
            firsName: req.body.firsName,
            number: req.body.number
        };
        const client = await OpenLessons.create(newlesson)
        return res.status(201).send(client)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})

export default router