import * as mongoose from "mongoose";

export interface User extends mongoose.Document {
    name: string,
    email: string,
    nickname: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    nickname: {
        type: String,
        unique: true
    }
})

export const User = mongoose.model<User>('User', userSchema)