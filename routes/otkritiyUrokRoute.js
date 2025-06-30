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
        return res.status(201).send({ message: 'Запись успешно создана', client })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})

router_otkritiyUrok.get('/', async (req, res) => {
    try {
      const tasks = await OtkritiyUrok.find();
      res.status(200).send(tasks);
    } catch (err) {
      res.status(500).send({ error: 'Error fetching tasks' });
    }
  });

  // Update status of a urok request
  router_otkritiyUrok.put('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['pending', 'done'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending or done' });
      }
      
      const updated = await OtkritiyUrok.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Request not found' });
      }
      return res.status(200).json({ message: 'Статус успешно обновлен', updated });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  });

  router_otkritiyUrok.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await OtkritiyUrok.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Request not found' });
      }
      return res.status(200).json({ message: 'успешно удалена', deleted });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  });

export default router_otkritiyUrok