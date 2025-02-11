import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../shared/components/loading';
import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchArrobaPrice = async () => {
    try {
        const { data } = await axios.get('https://www.cepea.esalq.usp.br/br/indicador/boi-gordo.aspx');
        const $ = cheerio.load(data);
        const date = $("#imagenet-indicador1 tbody tr:first-child td:nth-child(1)").text();
        const arrobaPrice = $("#imagenet-indicador1 tbody tr:first-child td:nth-child(2)").text();

        return { date: date, price: arrobaPrice };
    } catch (error) {
        console.error('Error fetching arroba price:', error);
        return { date: 'N/A', arrobaPrice: 'N/A' };
    }
};

export const ArrobaPriceCard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [price, setPrice] = useState<any>({ date: 'N/A', arrobaPrice: 'N/A' });

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPrice = await fetchArrobaPrice();
            setPrice(fetchedPrice);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Card className='mx-8 rounded-md'>
            <CardHeader>
                <CardTitle>Preço da Arroba do Boi</CardTitle>
                <CardDescription>Valores atualizados do mercado - {price.date}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <LoadingSpinner label='Carregando preço...' />
                ) : (
                    <p className="text-xl font-bold">R$ {price.price}</p>
                )}
            </CardContent>
        </Card>
    );
};