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
        name: 'Plano inicial',
        description: 'Ideal para pequenos produtores que precisam de mais organização',
        price: 'R$ 19,90/mês',
        features: [
            'Ferramentas de gestão do aplicativo',
            'Painel Web para visualização dos dados',
        ],
    },
    {
        id: 2,
        name: 'Plano Avançado',
        description: 'Ideal para os que querem entender melhor seu negócio sem gastar com infraestrutura',
        price: 'R$ 49,90/mês',
        features: [
            'Ferramentas de gestão do aplicativo',
            'Painel Web para visualização dos dados',
            'Painel Web para analises preditivas',
            'Painel Web para correlação de dados'
        ],
    },
    {
        id: 3,
        name: 'Plano Premium',
        description: 'Ideal para os que precisam juntar uma coleta mais automatizada com analises completas do negócio',
        price: 'R$ 99,90/mês',
        features: [
            'Ferramentas de gestão do aplicativo',
            'Painel Web para visualização dos dados',
            'Painel Web para analises preditivas',
            'Painel Web para correlação de dados',
            'Integração com hardware'
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
