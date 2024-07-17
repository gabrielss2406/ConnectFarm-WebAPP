import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Email obrigatório" }).max(80).min(1),
    password: z.string({ required_error: "Senha obrigatória" }).max(30).min(1)
})

export const RegisterSchema = z.object({
    name: z.string({ required_error: "Campo obrigatório" }).max(80).min(1),
    email: z.string({ required_error: "Campo obrigatório" }).max(80).min(1),
    cpf: z.string({ required_error: "Campo obrigatório" }).min(14),
    phone: z.string().max(15),
    birth: z.string().min(10),
    password: z.string({ required_error: "Campo obrigatório" }).max(30),
    confirmPassword: z.string({ required_error: "Campo obrigatório" }).max(30)
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "A senhas não estão iguais",
        path: ['confirmPassword']
      });
    }
  });

export type LoginType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>