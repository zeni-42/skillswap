import { User } from "@/models/user.models"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import mongoose from "mongoose"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized access", 401)
    }
    
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    
    if (!userId) {
        try {
            await CONNECTDB()
            const allUser = await User.find()
            if (allUser.length === 0) {
                return ResponseHelper.error("No user exists", 404)
            }
            const allUsersData = await User.aggregate([
                {
                    $lookup:{
                        from: "skills",
                        localField: "skills",
                        foreignField: "_id",
                        as: "skillData"
                    },
                },
                {
                    $addFields: {
                        skillInfo: {
                            $map: {
                                input: "$skillData",
                                as: "skill",
                                in: "$$skill.name"
                            }
                        }
                    },
                },
                {
                    $project: {
                        skillData: 0,
                        password: 0,
                        refreshToken: 0
                    }
                },
            ])
            return ResponseHelper.success(allUsersData, "All user details", 200)
        } catch (error) {
            console.log("Failed to fetch users data | Please check /api/user/get-users");
            return ResponseHelper.error("Something went wrong", 500, error)
        }
    } else {
        try {
            await CONNECTDB()
            const user = await User.findById(userId)
            if (!user) {
                return ResponseHelper.error("User does not exist", 404)
            }
            const userData = await User.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    },
                },
                {
                    $lookup:{
                        from: "skills",
                        localField: "skills",
                        foreignField: "_id",
                        as: "skillData"
                    },
                },
                {
                    $addFields: {
                        skillInfo: {
                            $map: {
                                input: "$skillData",
                                as: "skill",
                                in: "$$skill.name"
                            }
                        }
                    },
                },
                {
                    $project:{
                        skillData: 0
                    }
                }
            ])
            return ResponseHelper.success(userData, "User details", 200)
        } catch (error) {
            console.log("Failed to fetch users data | Please check /api/user/get-users");
            return ResponseHelper.error("Something went wrong", 500, error)
        }
    }
}