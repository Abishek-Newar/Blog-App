import zod from "zod";

 export const SignupInput =  zod.object({
    email: zod.string().email(),
    name: zod.string(),
    password: zod.string()
 })

 export type SignupType = zod.infer<typeof SignupInput>


export const SigninInput = zod.object({
    email: zod.string().email(),
    password: zod.string()
 })

 export type SigninInput = zod.infer<typeof SigninInput>


 export const blogPost = zod.object({
    title: zod.string(),
    content: zod.string(),
 })

 export type blogPost = zod.infer<typeof blogPost>

 export const blogUpdate = zod.object({
    title: zod.string().optional(),
    content: zod.string().optional()
 })

 export type blogUpdate = zod.infer<typeof blogUpdate>