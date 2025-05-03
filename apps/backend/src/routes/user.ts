import { Router } from "express";
import { prisma } from "@repo/db/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userSignInSchema, userSignUpSchema } from "@repo/common/types";
export const userRouter: Router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }

    const result = userSignUpSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    try{
        const existingUser = await prisma.user.findUnique({
            where: {
                email: result.data.email,
            },
        });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: result.data.email,
                name: result.data.name,
                password: hashedPassword ,
            },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie('token', token);
        res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }

    const result = userSignInSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ message: result.error.message });
        return;
    }
    

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: result.data.email,
            },
        });

        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const isPasswordCorrect = user.password && await bcrypt.compare(result.data.password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie('token', token);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});