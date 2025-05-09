import { User } from "@/models/user.models";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";


export async function accessToken(id: ObjectId) {
    if (!id) {
        throw new Error("Id is required for token")
    }
    const user = await User.findById(id)

    if (!user) {
        throw new Error("User does not exist")
    }

    const accessSecret = process.env.ACCESS_SECRET;
    if (!accessSecret) {
        throw new Error("Access secret is undefined"); 
    }

    const accessToken = jwt.sign(
        {
            id: user?._id,
            fullName: user?.fullName
        },
        accessSecret,
        {
            expiresIn: '1d'
        }
    )
    return accessToken;
}

export async function refreshToken(id: ObjectId) {
    if (!id) {
        throw new Error("Id is required for token")
    }
    const user = await User.findById(id)

    if (!user) {
        throw new Error("User does not exist")
    }

    const refreshSecret = process.env.REFRESH_SECRET
    if (!refreshSecret) {
        throw new Error("Refresh secret is undefined")
    }

    const refreshToken = jwt.sign(
        {
            _id: user?._id,
            fullName: user?.fullName,
            password: user?.password,
        },
        refreshSecret,
        {
            expiresIn: '7d'
        }
    )
    return refreshToken;
}