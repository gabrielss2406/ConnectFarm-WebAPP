import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Campo obrigatório" }).max(80),
    password: z.string({ required_error: "Campo obrigatório" }).max(30)
})

export type LoginType = z.infer<typeof LoginSchema>