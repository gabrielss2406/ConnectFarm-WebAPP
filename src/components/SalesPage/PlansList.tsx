import { useState } from 'react';
import { PlanCard } from './PlanCard';

export interface Plan {
    id: number;
    name: string;
    description: string
    price: string;
    features: string[];
}

const plans: Plan[] = [
    {
        id: 1,
        name: 'Plano simples',
        description: 'Plano com todo o pacote de software',
        price: 'R$ 199,90/mês',
        features: [
            'Ferramentas de gestão do aplicativo',
            'Painel Web para visualização dos dados',
            'Análise de dados',
            'Análise preditiva',
            'Suporte ao cliente'
        ],
    },
    {
        id: 2,
        name: 'Plano Composto',
        description: 'Plano com os adicionais de hardware',
        price: 'R$ 199,90/mês + Orçamento com a equipe',
        features: [
            'Ferramentas de gestão do aplicativo',
            'Painel Web para visualização dos dados',
            'Análise de dados',
            'Análise preditiva',
            'Suporte ao cliente',
            'Hardwares integrados*',
            'Hardwares ConnectFarm'
        ],
    },
];

export const PlansList = () => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleSelectPlan = (plan: Plan | null) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="container mx-auto py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mx-28">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        selectedPlan={selectedPlan}
                        onSelectPlan={handleSelectPlan}
                    />
                ))}
            </div>
        </div>
    );
};
