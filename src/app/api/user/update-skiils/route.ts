import { User } from "@/models/user.models"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import { ObjectId } from "mongoose"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const { skills, userId } = await request.json()
    if (!skills || !userId) {
        return ResponseHelper.error("Missing fields", 400)
    }

    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId as ObjectId);
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { skills }
            }
        )

    } catch (error) {
        console.log("Failed to update skills | Please check /api/update-skills");
        return ResponseHelper.error("Someting went wrong", 500, error)
    }
}