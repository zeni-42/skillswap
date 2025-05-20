import { User } from "@/models/user.models"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import { ObjectId } from "mongoose"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const { skillId, userId } = await request.json()
    if (!skillId || !userId) {
        return ResponseHelper.error("Missing fields", 400)
    }

    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    try {
        await CONNECTDB();
        const user = await User.findById(userId);
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const hasSkill = user.skills.includes(skillId)
        if (hasSkill) {
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { skills: skillId as ObjectId }
                },
                { new: true }
            )
            
            return ResponseHelper.success({}, "Skill removed", 200)
        } else {
            await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { skills: skillId as ObjectId },
                },
                { new: true }
            )
            return ResponseHelper.success({}, "Skill added", 200)
        }

    } catch (error) {
        console.log("Failed to update skills | Please check /api/user/update-skills");
        return ResponseHelper.error("Something went wrong", 500, error)
    }
}