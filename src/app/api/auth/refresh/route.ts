import { User } from "@/models/user.models";
import CONNECTDB from "@/utils/connectdb";
import ResponseHelper from "@/utils/responsehelper";
import { genAccessToken } from "@/utils/tokens";
import { ObjectId } from "mongoose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const {userId} = await request.json()
    if (!userId) {
        return ResponseHelper.error("Missing fields", 400)
    }

    const cookie = await cookies()
    const refreshToken = cookie.get('refreshToken')?.value;
    if (!refreshToken) {
        return ResponseHelper.error("No refresh token", 404)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (user?.refreshToken !== refreshToken) {
            return ResponseHelper.error("Invalid credentials, can't allow", 410)
        }

        const aToken = await genAccessToken(user?._id as ObjectId);
        cookie.set("accessToken", aToken, { secure: true, sameSite: true, httpOnly: true, maxAge: 60*30 });
        return ResponseHelper.success({}, "Access token renewed", 200)

    } catch (error) {
        console.log("Failed to renew access token | Please check /api/aut/refresh");
        return ResponseHelper.error("Someting went wrong", 500, error)
    }
}