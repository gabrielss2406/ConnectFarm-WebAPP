import { Input } from "@/components/shared/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterType } from "@/schemas/User";
import { maskToCpf, maskToPhone } from "@/helpers/mask";
import { ButtonCustom } from "@/components/shared/ui/button-custom";
import { useState } from "react";
import { UserService } from "@/services/user";
import { toast } from "sonner"
import { useRouter } from "next/router";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const form = useForm<RegisterType>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  })

  async function onSubmit(values: RegisterType) {
    const userService = new UserService();
    setLoading(true);
    try {
      const response = await userService.register(values);
      toast.success("Usuário criado com sucesso!")
      router.push("/login")
    } catch (error) {
      toast.error("Erro ao criar usuário")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full p-10 space-y-2 flex flex-col">
        <FormLabel className="flex flex-col text-3xl text-[#2D6432] gap-2 font-bold mb-3">
          Bem-vindo
          <div className="text-base pt-0 text-black font-normal">
            Antes de ver o que você precisa. Queremos te conhecer um pouco melhor!
          </div>
        </FormLabel>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  isInvalid={!!form.formState.errors.name}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemplo@email.com"
                  type="email"
                  isInvalid={!!form.formState.errors.email}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="123.456.789-00"
                  type="text"
                  isInvalid={!!form.formState.errors.cpf}
                  value={maskToCpf(field.value)}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Telefone (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 12345-6789"
                  type="text"
                  isInvalid={!!form.formState.errors.phone}
                  value={maskToPhone(field.value)}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  className={field.value ? "text-black" : "text-gray-500"}
                  onChange={field.onChange}
                  type="date"
                  isInvalid={!!form.formState.errors.birth}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******"
                  type="password"
                  isInvalid={!!form.formState.errors.password}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Repetir senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******"
                  type="password"
                  isInvalid={!!form.formState.errors.confirmPassword}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="h-2"></span>
        <ButtonCustom className="w-full" variant={"secondary"} type="submit" isLoading={loading}>Registrar</ButtonCustom>
      </form>
    </Form>
  )
}