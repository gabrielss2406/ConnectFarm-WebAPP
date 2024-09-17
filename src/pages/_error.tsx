import { useRouter } from 'next/router';
import { Button } from '@/components/shared/ui/button';
import { Ban } from 'lucide-react';

const ErrorPage = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('./');
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#2a2a2a] items-center justify-center p-5">
            <div
                className="
                    min-h-screen flex flex-col items-center justify-center
                    radial-startpage-gradient gap-5 p-20
                "
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(69, 181, 58, 0.65) 0%, rgba(69, 181, 58, 0) 60%)'
                }}
            >
                <div className="text-red-600">
                    <Ban size={64} />
                </div>
                <h1 className="text-white text-[24pt] font-bold mt-4">Ocorreu um erro!</h1>
                <p className="text-gray-300 text-lg mt-2">
                    Algo deu errado ao carregar os dados. Por favor, tente novamente mais tarde.
                </p>
                <Button onClick={handleGoHome} className="mt-6 bg-[#61d250] text-white p-2 rounded">
                    Voltar para a página inicial
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
