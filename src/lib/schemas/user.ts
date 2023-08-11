import {z} from "zod";
import {IMAGE_MAX_SIZE, IMAGE_TYPES} from "$lib/constants";

export const fullUserSchema = z
    .object({
        id: z.string(),
        username: z.string().min(3).max(255),
        password: z.string().min(8).max(255),
        verified: z.boolean(),
        email: z.string().email(),
        emailVisibility: z.boolean(),
        avatar: z.string(),
    });

export const userSchema = fullUserSchema
    .omit({password: true});

export const userRegisterSchema = fullUserSchema
    .pick({email: true, username: true, password: true})
    .extend({
        passwordConfirm: fullUserSchema.shape.password,
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ["passwordConfirm"],
            });
        }
    });

export const userLoginSchema = fullUserSchema
    .pick({username: true, password: true});

export const userUpdateSchema = fullUserSchema
    .pick({email: true, username: true, password: true, avatar: true})
    .extend({
        oldPassword: fullUserSchema.shape.password,
        passwordConfirm: fullUserSchema.shape.password,
        avatar: z.custom<File>().superRefine((val, ctx) => {
            if (val instanceof File) {
                if (val.size > IMAGE_MAX_SIZE) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'File must be less than 5MB',
                        path: ["avatar"],
                    });
                }

                if (!IMAGE_TYPES.includes(val.type as any)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Unsupported file type. Supported formats: ' + IMAGE_TYPES.map((t) => t.split("/")[1]).join(', '),
                        path: ["avatar"],
                    });
                }
            }
        }) as z.ZodType<Omit<File, 'prototype'>, z.ZodTypeDef, File>, // we omit prototype because it's causing circular reference issues in typings
    })
    .partial()
    .superRefine((data, ctx) => {
        if (data.password && !data.oldPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Current password is required",
                path: ["oldPassword"],
            });
        }
        if (data.password && data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ["passwordConfirm"],
            });
        }
    });
