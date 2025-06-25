import express from 'express';
import Tur from '../models/tur.js'

const router_tur = express.Router();

router_tur.post('/', async (req, res) => {
    try {
        if (!req.body.firsName || !req.body.number) {
            return res.status(400).send({
                message: 'Send all required fields: firsName, phone, lesson'
            });
        }
        const newTur = {
            firsName: req.body.firsName,
            number: req.body.number,
            // urok: req.body.urok
        };
        const client = await Tur.create(newTur)
        return res.status(201).send({ message: 'Запись успешно создана', client })
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



  router_tur.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Tur.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Request not found' });
      }
      return res.status(200).json({ message: 'успешно удалена', deleted });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  });



export default router_tur