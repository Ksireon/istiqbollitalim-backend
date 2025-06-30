import express from 'express';
import CompletedRequests from '../models/CompletedRequests.js';
import OpenLessons from '../models/Openlessons.js';
import OtkritiyUrok from '../models/otkritiyUrok.js';
import Review from '../models/review.js';
import Tur from '../models/tur.js';

const router_completed = express.Router();

// Get all completed requests
router_completed.get('/', async (req, res) => {
    try {
        const completedRequests = await CompletedRequests.find().sort({ completedAt: -1 });
        return res.status(200).json(completedRequests);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
});

// Mark request as done and move to completed requests
router_completed.post('/mark-done', async (req, res) => {
    try {
        const { requestType, requestId } = req.body;
        
        if (!requestType || !requestId) {
            return res.status(400).json({
                message: 'Send all required fields: requestType, requestId'
            });
        }

        let originalRequest;
        let model;

        // Get the original request based on type
        switch (requestType) {
            case 'OpenLessons':
                model = OpenLessons;
                break;
            case 'OtkritiyUrok':
                model = OtkritiyUrok;
                break;
            case 'Review':
                model = Review;
                break;
            case 'Tur':
                model = Tur;
                break;
            default:
                return res.status(400).json({ message: 'Invalid request type' });
        }

        originalRequest = await model.findById(requestId);
        if (!originalRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update status to done in original collection
        await model.findByIdAndUpdate(requestId, { status: 'done' });

        // Create completed request record
        const completedRequestData = {
            requestType,
            originalId: originalRequest._id,
            firsName: originalRequest.firsName,
            status: 'done'
        };

        // Add specific fields based on request type
        if (originalRequest.number) completedRequestData.number = originalRequest.number;
        if (originalRequest.urok) completedRequestData.urok = originalRequest.urok;
        if (originalRequest.review) completedRequestData.review = originalRequest.review;

        const completedRequest = await CompletedRequests.create(completedRequestData);
        
        return res.status(201).json({ 
            message: 'Запрос успешно помечен как выполненный', 
            completedRequest 
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
});

// Get completed requests by type
router_completed.get('/type/:requestType', async (req, res) => {
    try {
        const { requestType } = req.params;
        const completedRequests = await CompletedRequests.find({ requestType }).sort({ completedAt: -1 });
        return res.status(200).json(completedRequests);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
});

export default router_completed;