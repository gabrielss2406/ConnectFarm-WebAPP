import { useState } from 'react';
import { PlanCard } from './PlanCard';

export interface Plan {
    id: number;
    name: string;
    price: string;
    features: string[];
}

const plans: Plan[] = [
    {
        id: 1,
        name: 'Plano Básico',
        price: 'R$ 19,90/mês',
        features: [
            'Proteção para 1 dispositivo',
            'Suporte básico',
        ],
    },
    {
        id: 2,
        name: 'Plano Avançado',
        price: 'R$ 49,90/mês',
        features: [
            'Proteção para 1 dispositivo',
            'Suporte básico',
            'Proteção para até 5 dispositivos',
            'Relatórios de segurança detalhados',
        ],
    },
    {
        id: 3,
        name: 'Plano Premium',
        price: 'R$ 99,90/mês',
        features: [
            'Proteção para 1 dispositivo',
            'Suporte básico',
            'Proteção para até 5 dispositivos',
            'Relatórios de segurança detalhados',
            'Proteção familiar (até 10 dispositivos)',
            'Consultoria de segurança personalizada',
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
