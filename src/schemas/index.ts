import * as z from "zod";


export const registerSchema = z.object({
    email: z.string().email().min(1, {
        message: "Provide a valid email address.",
    }),
    username: z.string().min(5, {
        message: "Username must be at least 5 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    })

})

export const loginSchema = z.object({
  email: z.string().email().min(1, {
    message: "Provide a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  })
})