export const formatPredictedWeight = (value: any, unit: any) => {
    if (value) {
        if (unit === "arroba") {
            return `${(Number(value) / 15).toFixed(2)} arrobas`;
        }
        return `${Number(value).toFixed(2)} kg`;
    }
    else
        return "Dados insuficientes para predição"

};