import { z } from "zod";


export const SignUpSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.email().trim().min(1, "Email is required"),
    password: z.string().trim().min(8, "Password must be at least 8 characters long"),
})


export type SignUpFormSchemaValue = z.infer<typeof SignUpSchema>




export const SignInSchema = z.object({
    email: z.email("Enter a valid email address").trim().min(1, "Email is required"),
    password: z.string().trim().min(1, "Password is required"),
})

export type SignInFormSchemaValue = z.infer<typeof SignInSchema>




export const CodeSchema = z.object({
    code: z.string().trim().min(1, "Enter the verification code "),
})

export type CodeFormSchemaValue = z.infer<typeof CodeSchema>
