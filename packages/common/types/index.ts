import { z } from 'zod';

export const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userSignUpSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6),
});