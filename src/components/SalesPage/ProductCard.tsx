import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/shared/ui/popover';
import { Button } from '@/components/shared/ui/button';

interface ProductCardProps {
    id: number;
    image: StaticImageData;
    name: string;
    price: string;
    description: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, description }) => {
    const [showPopover, setShowPopover] = useState<boolean>(false);

    const handlePopoverToggle = () => {
        setShowPopover(!showPopover);
    };

    useEffect(() => {

    }, []);

    return (
        <div key={id} className="bg-[#1e1e1e] rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
            <Image src={image} alt={name} width={150} height={150} className="rounded-full" />
            <h2 className="text-2xl font-semibold mt-4">{name}</h2>
            <p className="text-lg text-gray-400 mt-2">{price}</p>
            <p className="text-sm text-gray-300 mt-4 text-center">{description}</p>

            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="mt-6 bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600 transition"
                        onClick={handlePopoverToggle}
                    >
                        Comprar
                    </button>
                </PopoverTrigger>

                {showPopover && (
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <p className="text-sm text-white">
                                    Entre em contato com a equipe para mais informações!
                                </p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowPopover(false)}
                                >
                                    Fechar
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
};
