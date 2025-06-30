import mongoose from 'mongoose';

const CompletedRequestsSchema = new mongoose.Schema({
    requestType: {
        type: String,
        enum: ['OpenLessons', 'OtkritiyUrok', 'Review', 'Tur'],
        required: true
    },
    originalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firsName: {
        type: String,
        required: true
    },
    number: {
        type: Number
    },
    urok: {
        type: String
    },
    review: {
        type: String
    },
    completedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'done'
    }
});

export default mongoose.model('CompletedRequests', CompletedRequestsSchema);