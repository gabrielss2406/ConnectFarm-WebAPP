import Navbar from '@/components/StartPage/Navbar';
import { ProductList } from '@/components/SalesPage/ProductList';

export default function SalesPage() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-20 min-h-screen bg-[#2a2a2a] text-white">
                <div className="flex flex-col justify-center items-center pt-24 gap-10">
                    <h1 className="text-5xl font-bold text-center">Nossos Produtos</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-12 px-6">
                    <ProductList />
                </div>
                <br /><br /><br />
            </div>
        </div>
    );
}
