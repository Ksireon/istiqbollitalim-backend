import express from 'express';
import Tur from '../models/tur.js'

const router_tur = express.Router();

router_tur.post('/', async (req, res) => {
    try {
        if (!req.body.firsName || !req.body.number || !req.body.urok) {
            return res.status(400).send({
                message: 'Send all required fields: firsName, phone, lesson'
            });
        }
        const newTur = {
            firsName: req.body.firsName,
            number: req.body.number,
            urok: req.body.urok
        };
        const client = await Tur.create(newTur)
        return res.status(201).send(client)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})
router_tur.get('/', async (req, res) => {
    try {
      const tasks = await Tur.find();
      res.status(200).send(tasks);
    } catch (err) {
      res.status(500).send({ error: 'Error fetching tasks' });
    }
  });

export default router_tur