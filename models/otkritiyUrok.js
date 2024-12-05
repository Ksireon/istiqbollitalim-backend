import mongoose from "mongoose";

const UrokiSchema = new mongoose.Schema({
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

export default mongoose.model('OtkritiyUrok', UrokiSchema);