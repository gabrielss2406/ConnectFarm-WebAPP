import { Input } from "@/components/shared/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/shared/ui/button";
import { LoginSchema, LoginType } from "@/schemas/User";

export default function RegisterForm() {
    
    const form = useForm<LoginType>({
        mode: "all",
        resolver: zodResolver(LoginSchema),
      })

      function onSubmit(values: LoginType) {
        console.log(values)
      }

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full p-10  space-y-6 flex flex-col">
            <FormLabel className="flex flex-col text-3xl text-[#2D6432] gap-2 font-bold">
                Bem-vindo
                <div className="text-base pt-0 text-black font-normal">
                    Antes de ver o que você precisa. Queremos te conhecer um pouco melhor!
                </div>
            </FormLabel>

            <div className="flex gap-3 flex-row max-sm:flex-wrap">
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
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 flex-row max-sm:flex-wrap">
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
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end w-full gap-4">
              <Button className="w-1/2" variant={"secondary"} type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
      )
}