import { Card } from "./Card";

import { FaCow, FaBrain } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
import { RiOrganizationChart } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlinePhonelink } from "react-icons/md";

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
                icon={FaMoneyBillTransfer}
                bgColor="#F59E0B"
            />
            <Card 
                title="Gestão pecuária"
                text="Um local para registrar
                    com toda segurança e flexibilidade
                    as informações do seu gado."
                icon={FaCow}
                bgColor="#F97316"
            />
            <Card 
                title="Organização"
                text="Um local para guardar suas 
                    anotações, datas importantes
                    melhorias."
                icon={RiOrganizationChart}
                bgColor="#60A5FA"
            />
            <Card 
                title="Análises"
                text="Oferecemos um painel com 
                    análises financeiras e pecuária. 
                    Buscando melhorias na produção."
                icon={IoAnalytics}
                bgColor="#7C3AED"
            />
            <Card 
                title="Previsões"
                text="Oferecemos um painel com 
                    previsões de produção com base 
                    nas suas informações."
                icon={FaBrain}
                bgColor="#A3E635"
            />
            <Card 
                title="Centralização"
                text="Oferecemos todos os serviços
                    em um unico lugar, buscando 
                    centralizartodos os serviços."
                icon={MdOutlinePhonelink}
                bgColor="#16A34A"
            />
        </div>
    )
}