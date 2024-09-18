import { Button } from '@/components/shared/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/shared/ui/popover';
import { Plan } from './PlansList';
import { Check } from 'lucide-react';

interface PlanCardProps {
    plan: Plan;
    selectedPlan: Plan | null;
    onSelectPlan: (plan: Plan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, selectedPlan, onSelectPlan }) => {
    return (
        <div className="bg-[#1e1e1e] text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-lg font-bold mb-4">{plan.price}</p>
            <p className="text-sm text-gray-400 mb-4 text-center">
                {plan.description}
            </p>
            <ul className="text-left space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Check color='#2b7224' className='pr-1' /> {feature}
                    </li>
                ))}
            </ul>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        className="mt-auto bg-[#3b9c32] px-4 py-2 text-white rounded hover:bg-[#43ac39] transition"
                        onClick={() => onSelectPlan(plan)}
                    >
                        Selecionar Plano
                    </Button>
                </PopoverTrigger>

                {selectedPlan && selectedPlan.id === plan.id && (
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <p className="text-sm text-white">
                                Você escolheu o {selectedPlan.name}. <br />Entre em contato com nossa equipe!
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => onSelectPlan(null)}>
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