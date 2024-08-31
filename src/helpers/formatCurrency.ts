export const formatCurrency = (value: number) => {
    console.log(value)

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};