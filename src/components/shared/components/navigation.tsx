import { Link } from 'react-scroll';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown';

// Define o tipo para um item de gráfico
interface NavigationProps {
    charts: { id: string; component: JSX.Element }[];
}

const Navigation: React.FC<NavigationProps> = ({ charts }) => {
    return (
        <nav className="bg-white p-4 shadow-md">
            <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                    Selecione uma análise
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {charts.map((chart) => (
                        <DropdownMenuItem key={chart.id}>
                            <Link
                                to={chart.id}
                                smooth={true}
                                duration={800}
                                className="text-blue-600 hover:underline"
                            >
                                {chart.id}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};

export default Navigation;
