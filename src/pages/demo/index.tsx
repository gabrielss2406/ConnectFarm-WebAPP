import React, { useEffect } from 'react';
import { UserService } from '@/services/user';
import { LoadingSpinner } from '@/components/shared/components/loading';
import { useRouter } from 'next/router';

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
                await userService.login(demoCredentials.email, demoCredentials.password)

                router.push("/painel");
            } catch (error) {
                console.log(error)
                console.error('Erro no login da demo:', error);
            }
        };

        loginUser()
    }, []);

    return <LoadingSpinner label='Carregando demo...' />
};

export default DemoLogin;
