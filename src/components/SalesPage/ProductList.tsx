import { StaticImageData } from 'next/image';
import { ProductCard } from './ProductCard';
import Logo from '@/static/logo.png';

interface Product {
    id: number;
    image: StaticImageData;
    name: string;
    price: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        image: Logo,
        name: 'Razão de Bezerros Desmamados',
        price: 'R$ 499,00',
        description: 'Gráfico detalhado da razão de desmame dos bezerros ao longo do ano.',
    },
    {
        id: 2,
        image: Logo,
        name: 'Análise de Peso',
        price: 'R$ 349,00',
        description: 'Análise completa de variação de peso do gado em diferentes períodos.',
    },
    {
        id: 3,
        image: Logo,
        name: 'Controle de Vacinas',
        price: 'R$ 199,00',
        description: 'Relatórios detalhados sobre vacinas aplicadas e próximas doses.',
    },
];

export const ProductList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                />
            ))}
        </div>
    );
};
