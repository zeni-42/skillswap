import { User } from "@/models/user.models"
import cloudinary from "@/utils/cloudinary"
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import { writeFile } from "fs/promises"
import { cookies } from "next/headers"
import path from "path"
import fs from "fs";

export async function POST(request: Request) {
    const cookie = await cookies()
    const token = cookie.get("accessToken")
    if (!token) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId")

    if (!file || !userId) {
        return ResponseHelper.error("Missing field", 400)
    }

    const byte = await file.arrayBuffer()
    const buffer = Buffer.from(byte)
    const fileName = `banner_${file.name}.png`
    const filePath = path.join('/tmp', fileName)
    await writeFile(filePath, buffer)


    try {
        const result = await cloudinary.uploader.upload(fileName, {
            folder: "banner_images",
            resource_type: "image"
        })

        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User does not exist", 404)
        }

        await User.findByIdAndUpdate(
            userId, {
                banner: result.secure_url
            }
        )

        const response =  await User.findById(userId).select(
            "-password -refreshToken -isVerified -verificationCode -isPro"
        )

        return ResponseHelper.success(response, "Banner updated successfully", 200)

    } catch (error) {
        console.log("Failed to update banner");
        return ResponseHelper.error("Failed to update banner", 500, error);
    } finally {
        fs.unlinkSync(filePath)
    }
}