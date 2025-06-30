import mongoose from "mongoose";

const LessonsSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    }
})

export default mongoose.model('OpenLessons', LessonsSchema);