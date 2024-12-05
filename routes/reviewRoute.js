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
        return res.status(201).send(client)
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ message: error.message })
    }
})

export default router_review