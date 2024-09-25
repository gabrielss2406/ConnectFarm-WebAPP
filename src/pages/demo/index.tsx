import React, { useEffect } from 'react';
import { UserService } from '@/services/user';
import { LoadingSpinner } from '@/components/shared/components/loading';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const DemoLogin = () => {
    const router = useRouter();

    useEffect(() => {
        const loginUser = async () => {
            try {
                const demoCredentials = {
                    email: 'gabrielss2406@gmail.com',
                    password: 'Senha123#',
                };

                const userService = new UserService()
                const loginResponse = await userService.login(demoCredentials.email, demoCredentials.password)

                if (loginResponse?.token) {
                    toast.success("Usuário logado na demo com sucesso!");

                    setTimeout(() => {
                        router.push("/painel");
                    }, 100);
                }

                router.push("/painel");
                toast.success("Usuário logado na demo com sucesso!");
            } catch (error) {
                console.error('Erro no login da demo:', error);
                toast.error("Erro ao fazer login na demo!");
            }
        };

        loginUser()
    }, []);

    return <LoadingSpinner label='Carregando demo...' />
};

export default DemoLogin;
