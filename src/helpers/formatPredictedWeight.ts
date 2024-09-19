export const formatPredictedWeight = (value: any) => {
    if (value)
        return `${value} kg`
    else
        return "Dados insuficientes para predição"
};