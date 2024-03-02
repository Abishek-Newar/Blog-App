import zod from "zod";
export declare const SignupInput: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export type SignupType = zod.infer<typeof SignupInput>;
export declare const SigninInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = zod.infer<typeof SigninInput>;
export declare const blogPost: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type blogPost = zod.infer<typeof blogPost>;
export declare const blogUpdate: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type blogUpdate = zod.infer<typeof blogUpdate>;
