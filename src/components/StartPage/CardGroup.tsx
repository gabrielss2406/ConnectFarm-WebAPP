import Card from "./Card";

import IconFinance from '@/static/cardsIcon/icon_finance.png';
import IconOrganize from '@/static/cardsIcon/icon_organize.png';
import IconAnalysis from '@/static/cardsIcon/icon_analysis.png';
import IconPredictions from '@/static/cardsIcon/icon_predictions.png';
import IconCentralize from '@/static/cardsIcon/icon_centralize.png';
import IconCows from '@/static/cardsIcon/icon_cows.png';

export default function CardGroup() {
    return (
        <div className={`
            flex flex-wrap gap-y-16
            lg:mx-44
            sm:mx-16
            mx-16 select-none
        `}>
            <Card 
                title="Gestão financeira"
                text="Um local para gerenciar todos
                    seus gastos e ganhos. Registrar 
                    compras e vendas."
                icon={IconFinance.src}
            />
            <Card 
                title="Gestão pecuária"
                text="Um local para registrar
                    com toda segurança e flexibilidade
                    as informações do seu gado."
                icon={IconCows.src}
            />
            <Card 
                title="Organização"
                text="Um local para guardar suas 
                    anotações, datas importantes
                    melhorias."
                icon={IconOrganize.src}
            />
            <Card 
                title="Análises"
                text="Oferecemos um painel com 
                    análises financeiras e pecuária. 
                    Buscando melhorias na produção."
                icon={IconAnalysis.src}
            />
            <Card 
                title="Previsões"
                text="Oferecemos um painel com 
                    previsões de produção com base 
                    nas suas informações."
                icon={IconPredictions.src}
            />
            <Card 
                title="Centralização"
                text="Oferecemos todos os serviços
                    em um unico lugar, buscando 
                    centralizartodos os serviços."
                icon={IconCentralize.src}
            />
        </div>
    )
}