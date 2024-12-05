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
    urok: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Tur', TurSchema);