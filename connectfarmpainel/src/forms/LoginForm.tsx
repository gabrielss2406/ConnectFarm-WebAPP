import { Input } from "@/components/shared/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shared/ui/button";
import { LoginSchema, LoginType } from "@/schemas/User";

export default function LoginForm() {
    
    const form = useForm<LoginType>({
        mode: "all",
        resolver: zodResolver(LoginSchema),
      })

      function onSubmit(values: LoginType) {
        console.log(values)
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-[50%] p-10 space-y-6 flex flex-col items-center">
            <FormLabel className="text-3xl text-white">
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
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                  <a href="/" className="w-1/2">
                    <Button className="p-1 text-xs italic" variant={"link"} type="button">Esqueceu a senha?</Button>
                  </a>
                </FormItem>
              )}
            />
            <div className="flex justify-between w-full gap-4">
              <a href="/" className="w-1/2">
                <Button className="w-full" variant={"outline"} type="button">Registrar</Button>
              </a>
              <Button className="w-1/2" variant={"secondary"} type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
      )
}