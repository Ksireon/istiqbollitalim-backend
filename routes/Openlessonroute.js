import express from 'express';
import OpenLessons from '../models/Openlessons.js';

const router = express.Router();

// Create a new lesson request
router.post('/', async (req, res) => {
  try {
    const { firsName, number } = req.body;
    if (!firsName || !number) {
      return res.status(400).json({
        message: 'Send all required fields: firstName, number'
      });
    }

    const newLesson = { firsName, number };
    const client = await OpenLessons.create(newLesson);
    return res.status(201).json({ message: 'Запись успешно создана', client });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
});

// Get all lesson requests
router.get('/', async (req, res) => {
  try {
    const tasks = await OpenLessons.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Delete a lesson request by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OpenLessons.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Request not found' });
    }
    return res.status(200).json({ message: 'Запись успешно удалена', deleted });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
});

export default router;
