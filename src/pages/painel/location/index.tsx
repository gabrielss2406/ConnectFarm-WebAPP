import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useFarms } from "@/hooks/useFarms";
import { DataLocationService } from "@/services/location";
import { LocationDataType } from "@/schemas/DataAnalysis";
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/shared/ui/button";

// Importar o Leaflet dinamicamente, garantindo que seja carregado apenas no lado do cliente
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Rectangle = dynamic(() => import("react-leaflet").then(mod => mod.Rectangle), { ssr: false });

// Função para criar um ícone Leaflet personalizado
const useCustomIcon = (color: string) => {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const Leaflet = require('leaflet');
        const customIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin">
                <path d="M12 17v5"/>
                <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>
            </svg>
        `;
        const newIcon = new Leaflet.Icon({
            iconUrl: `data:image/svg+xml;base64,${btoa(customIconSVG)}`,
            iconSize: [24, 24], // Tamanho do ícone
            iconAnchor: [12, 24], // Ponto de anclagem do ícone
            popupAnchor: [0, -24] // Ponto de anclagem do popup
        });
        setIcon(newIcon);
    }, [color]);

    return icon;
}

// Função para obter a cor e opacidade com base no índice da zona
const getZoneStyle = (index) => {
    const maxOpacity = 0.8;
    const minOpacity = 0.3;
    const color = 'red';
    const opacity = maxOpacity - (index * (maxOpacity - minOpacity) / (index + 1));

    return {
        color,
        fillColor: color,
        fillOpacity: opacity
    };
}

// Função para verificar se a localização está fora dos limites
const isOutOfBounds = (latitude, longitude, bounds) => {
    const { bottom_right, top_left } = bounds;
    return latitude < bottom_right.latitude || latitude > top_left.latitude ||
        longitude < top_left.longitude || longitude > bottom_right.longitude;
}

export default function WeightPage() {
    const { farms: farmsData, loading: loadingData, error: errorData } = useFarms();
    const service = new DataLocationService();
    const [locations, setLocations] = useState<LocationDataType | null>(null);
    const [topZones, setTopZones] = useState<any[]>([]);
    const [outOfBounds, setOutOfBounds] = useState<any[]>([]);
    const customIconRed = useCustomIcon('red');
    const customIconBlack = useCustomIcon('black');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                if (farmsData.length > 0) {
                    const firstFarm = farmsData[0];
                    const data = await service.locationData(firstFarm.id);
                    setLocations(data);
                    setTopZones(data.top_zones);
                    setOutOfBounds(data.out_of_bounds_cows);
                }
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', errorData);
            }
        };

        fetchLocations(); // Fetch initial data

        const intervalId = setInterval(() => {
            fetchLocations();
        }, 10000); // 10000 ms = 10 seconds

        return () => clearInterval(intervalId);
    }, [farmsData]);

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F1F1] justify-center items-center">
            {locations ? (
                <div className="flex flex-col w-full justify-center items-center gap-10">
                    <Button
                        onClick={() => window.history.back()}
                        className="top-0 left-0"
                    >
                        Voltar
                    </Button>
                    <MapContainer center={[-22.25933, -45.69096]} zoom={16} style={{ height: "600px", width: "80%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.locations?.map((location) => {
                            const isOutside = isOutOfBounds(location.latitude, location.longitude, {
                                bottom_right: {
                                    latitude: -22.26231086486486,
                                    longitude: -45.687739110705834,
                                },
                                top_left: {
                                    latitude: -22.256145315315315,
                                    longitude: -45.69440112104077,
                                }
                            });
                            return (
                                <Marker
                                    key={location.cowId}
                                    position={[location.latitude, location.longitude]}
                                    icon={isOutside ? customIconRed : customIconBlack}
                                >
                                    <Popup>
                                        {isOutside ? (
                                            <>
                                                <strong>ID da Vaca:</strong> {location.cowId} <br />
                                                <strong>FORA DO TERRENO</strong>
                                            </>
                                        ) : (
                                            <>
                                                <strong>ID da Vaca:</strong> {location.cowId} <br />
                                                <strong>Latitude:</strong> {location.latitude} <br />
                                                <strong>Longitude:</strong> {location.longitude} <br />
                                            </>
                                        )}
                                    </Popup>
                                </Marker>

                            );
                        })}
                        {topZones.map((zone, index) => {
                            const [latMin, latMax] = zone.latitude_range.split('--').map(coord => parseFloat(coord));
                            const [lngMin, lngMax] = zone.longitude_range.split('--').map(coord => parseFloat(coord));

                            // Aqui ajustamos a estrutura do bounds para ser uma tupla de tuplas [latitude, longitude]
                            const bounds: [[number, number], [number, number]] = [
                                [latMin, lngMin],  // Primeira tupla: ponto inferior esquerdo
                                [-latMax, -lngMax]   // Segunda tupla: ponto superior direito
                            ];

                            const { color, fillColor, fillOpacity } = getZoneStyle(index);

                            return (
                                <Rectangle
                                    key={index}
                                    bounds={bounds} // Aqui passamos o bounds no formato esperado
                                    color={color}
                                    fillColor={fillColor}
                                    fillOpacity={fillOpacity}
                                >
                                    <Popup>
                                        <strong>Registros:</strong> {zone.total_count}
                                    </Popup>
                                </Rectangle>
                            );
                        })}
                    </MapContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
