import express from 'express';
import Review from '../models/review.js'


const router_review = express.Router();

router_review.post('/', async (req, res) => {
    try {
        if (!req.body.firsName || !req.body.review) {
            return res.status(400).send({
                message: 'Send all required fields: firsName, phone, lesson'
            });
        }
        const newReview = {
            firsName: req.body.firsName,
            review: req.body.review
        };
        const client = await Review.create(newReview)
        return res.status(201).send({ message: 'Запись успешно создана', client })
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})

router_review.get('/', async (req, res) => {
    try {
      const tasks = await Review.find();
      res.status(200).send(tasks);
    } catch (err) {
      res.status(500).send({ error: 'Error fetching tasks' });
    }
  });



  // Update status of a review request
  router_review.put('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['pending', 'done'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be pending or done' });
      }
      
      const updated = await Review.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Request not found' });
      }
      return res.status(200).json({ message: 'Статус успешно обновлен', updated });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  });

  router_review.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Review.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Request not found' });
      }
      return res.status(200).json({ message: 'успешно удалена', deleted });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ message: error.message });
    }
  });


  
export default router_review