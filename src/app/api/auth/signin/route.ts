import { User } from "@/models/user.models"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import { genAccessToken, genRefreshToken } from "@/utils/tokens"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongoose"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const { email, password } = await request.json()
    if (!email || !password) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await CONNECTDB()
        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error("Email does not exist", 404)
        }

        const vaildPassword = bcrypt.compare(user.password, password)
        if (!vaildPassword) {
            return ResponseHelper.error("Incorrect password", 410)
        }

        const aToken = await genAccessToken(user?._id as ObjectId);
        const rToken = await genRefreshToken(user?._id as ObjectId);

        const updatedUser = await User.findByIdAndUpdate(user?._id, {
            refreshToken: rToken,
        })

        const loggedInUser = await User.findById(updatedUser?._id).select(
            "-password -refreshToken -isVerified -verificationCode -isPro"
        )

        const cookie = await cookies()
        cookie.set('refreshToken', rToken, { secure: true, sameSite: true, httpOnly: true, maxAge: 60*60*24*30 })
        cookie.set('accessToken', aToken, { secure: true, sameSite: true, httpOnly: true, maxAge: 60*60*24*2 })

        return ResponseHelper.success(loggedInUser, 'User logged in', 200)
    } catch (error) {
        console.log("Failed to login user | Please check /api/auth/signin");
        return ResponseHelper.error("Something went wrong", 500, error);
    }
}