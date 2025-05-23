import { User } from "@/models/user.models"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const { userId } = await request.json()
    if (!userId) {
        return ResponseHelper.error("Id is required", 400)
    }

    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized request", 401)
    }

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404);
        }

        const updatedUser = await User.findByIdAndUpdate(
            user?._id,
            {
                $unset: {
                    refreshToken: 1
                }
            }
        )

        cookie.delete("refreshToken")
        cookie.delete("accessToken")

        return ResponseHelper.success({}, "User logged out", 200)
    } catch (error) {
        console.log("Failed to logout user | Please check /api/auth/signout");
        return ResponseHelper.error("Internal server error", 500, error)
    }
}