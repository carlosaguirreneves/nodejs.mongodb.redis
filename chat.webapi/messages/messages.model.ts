import * as mongoose from "mongoose";
import { User } from "../users/users.model";

export interface Message extends mongoose.Document {
    message: String,
    date: Date,
    user: mongoose.Types.ObjectId | User
}

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Message = mongoose.model<Message>('Message', messageSchema)