import { Input } from "@/components/shared/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shared/ui/button";
import { LoginSchema, LoginType } from "@/schemas/User";
import { UserService } from "@/services/user";
import { useState } from "react";
import { ButtonCustom } from "@/components/shared/ui/button-custom";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginType>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(values: LoginType) {
    const userService = new UserService();
    setLoading(true);
    try {
      const response = await userService.login(values.email, values.password);
      toast.success("Usuário logado com sucesso!")
    } catch (error) {
      toast.error("Erro ao fazer login!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-[100%] p-10 space-y-3 flex flex-col items-center">
        <FormLabel className="text-3xl mb-5 text-white">
          Login
        </FormLabel>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  placeholder="Insira seu email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-row justify-between">
                <div className="min-h-[1.25rem]" />
                <FormMessage className="absolute" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  placeholder="Insira sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-row justify-between">
                <div className="min-h-[1.25rem]" />
                <FormMessage className="absolute" />
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full gap-4">
          <Link href="/" className="w-1/2">
            <Button className="w-full" variant={"outline"} type="button">Registrar</Button>
          </Link>
          <div className="w-1/2 flex flex-col items-center">
            <ButtonCustom className="w-full" variant={"secondary"} type="submit" isLoading={loading}>Entrar</ButtonCustom>
            <Link href="/">
              <Button className="p-0 text-xs italic" variant={"link"} type="button">Esqueceu a senha?</Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}