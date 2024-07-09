import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Campo obrigatório" }).max(80),
    password: z.string({ required_error: "Campo obrigatório" }).max(30)
})

export const RegisterSchema = z.object({
    nome: z.string({ required_error: "Campo obrigatório" }).max(80),
    email: z.string({ required_error: "Campo obrigatório" }).max(80),
    cpf: z.string({ required_error: "Campo obrigatório" }).max(80),
    date: z.date(),
    password: z.string({ required_error: "Campo obrigatório" }).max(30)
})

export type LoginType = z.infer<typeof LoginSchema>