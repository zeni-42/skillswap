import ResponseHelper from "@/utils/responsehelper";
import { cookies } from "next/headers";
import path from "path";
import cloudinary from "@/utils/cloudinary";
import fs from "fs";
import { writeFile } from "fs/promises";
import CONNECTDB from "@/utils/connectdb";
import { User } from "@/models/user.models";

export async function POST(request: Request) {
    const cookie = await cookies()
    const accessToken = cookie.get("accessToken")
    if (!accessToken) {
        return ResponseHelper.error("Unauthorized access", 401)
    }

    const formData = await request.formData()
    const file = formData.get("image") as File;
    const userId = formData.get("userId");

    if (!userId || !file) {
        return ResponseHelper.error("Missing fields", 400)
    }

    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);
    const fileName = `avatar_${file.name}.png`;
    const filePath = path.join("/tmp", fileName);
    await writeFile(filePath, buffer)

    try {
        await CONNECTDB()
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User does not exist", 404)
        }

        const result: any = await cloudinary.uploader.upload(filePath, {
            folder: "avatar_images",
            resource_type: "image"
        })

        await User.findByIdAndUpdate(userId, {
            avatar: result?.secure_url
        })
        
        const resposne = await User.findById(userId).select(
            "-password -refreshToken -isVerified -verificationCode -isPro"
        )

        return ResponseHelper.success(resposne, "Profile updated successfully", 200)
    } catch (error) {
        console.log("Failed to update profile picture");
        return ResponseHelper.error("Failed to update profile picture", 500, error);
    } finally {
        fs.unlinkSync(filePath)
    }
}