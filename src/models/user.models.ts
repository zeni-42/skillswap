import mongoose, { Document, Schema } from "mongoose";

interface userInterface extends Document {
    email: string,
    fullName: string,
    password: string,
    avatar: string,
    refreshToken: string,
    skills: string[],
    isVerified: boolean,
    verificationCode: number,
    isPro: boolean
}

const userSchema: Schema <userInterface> = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dfbtssuwy/image/upload/v1735838884/ljziqvhelksqmytkffj9.jpg",
    },
    refreshToken: {
        type: String,
    },
    skills: [
        {
            type: String,
            unique: true,
            index: true,
        }
    ],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode: {
        type: Number,
    },
    isPro: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true, versionKey: false })

export const User = mongoose.models.User as mongoose.Model<userInterface> || mongoose.model<userInterface>("User", userSchema) 