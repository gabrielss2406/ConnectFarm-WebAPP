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
        name: 'Balança',
        price: 'R$ 1599,00',
        description: 'Balança integrada com o sistema, para pesagem do gado dentro do curral!',
    },
    {
        id: 2,
        image: Logo,
        name: 'Identificação do gado',
        price: 'R$ 5,00 (unidade) ou R$ 400,00 (centena)',
        description: 'Identificação única de cada gado, também integrado com nosso sistema.',
    },
    {
        id: 3,
        image: Logo,
        name: 'Serviço de localização',
        price: 'R$ a definir',
        description: 'Sistema de geolocalização do gado dentro da propriedade, totalmente personalizado.',
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
