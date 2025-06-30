import mongoose from "mongoose";

const TurSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    // urok: {
    //     type: String,
    //     required: true,
    // }
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    }
})

export default mongoose.model('Tur', TurSchema);