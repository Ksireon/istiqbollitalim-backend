import mongoose from "mongoose";

const LessonsSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('OpenLessons', LessonsSchema);