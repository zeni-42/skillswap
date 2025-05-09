import { User } from "@/models/user.models";
import CONNECTDB from "@/utils/connectdb"
import ResponseHelper from "@/utils/responsehelper"
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const { email, fullName, password } = await request.json()
    if (!email || !fullName || !password) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await CONNECTDB();

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return ResponseHelper.error("Email is taken")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            fullName,
            password: hashedPassword,
        })

        const createdUser = await User.findById(user?._id).select(
            "-password -refreshToken -isVerified -verificationCode -isPro"
        )

        return ResponseHelper.success(createdUser, "User registered")
    } catch (error) {
        console.log("Failed to register user | Please check /api/signup");
        return ResponseHelper.error("Someting went wrong", 500, error)
    }
}