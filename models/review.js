import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Review', ReviewSchema);