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
const Circle = dynamic(() => import("react-leaflet").then(mod => mod.Circle), { ssr: false });

// Função para criar um ícone Leaflet personalizado
const useCustomIcon = (color: string) => {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const Leaflet = require('leaflet');
        const customIconSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M96 224l0 32 0 160c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-88.2c9.9 6.6 20.6 12 32 16.1l0 24.2c0 8.8 7.2 16 16 16s16-7.2 16-16l0-16.9c5.3 .6 10.6 .9 16 .9s10.7-.3 16-.9l0 16.9c0 8.8 7.2 16 16 16s16-7.2 16-16l0-24.2c11.4-4 22.1-9.4 32-16.1l0 88.2c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-160 32 32 0 49.5c0 9.5 2.8 18.7 8.1 26.6L530 427c8.8 13.1 23.5 21 39.3 21c22.5 0 41.9-15.9 46.3-38l20.3-101.6c2.6-13-.3-26.5-8-37.3l-3.9-5.5 0-81.6c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 14.4-52.9-74.1C496 86.5 452.4 64 405.9 64L272 64l-16 0-64 0-48 0C77.7 64 24 117.7 24 184l0 54C9.4 249.8 0 267.8 0 288l0 17.6c0 8 6.4 14.4 14.4 14.4C46.2 320 72 294.2 72 262.4l0-6.4 0-32 0-40c0-24.3 12.1-45.8 30.5-58.9C98.3 135.9 96 147.7 96 160l0 64zM560 336a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM166.6 166.6c-4.2-4.2-6.6-10-6.6-16c0-12.5 10.1-22.6 22.6-22.6l178.7 0c12.5 0 22.6 10.1 22.6 22.6c0 6-2.4 11.8-6.6 16l-23.4 23.4C332.2 211.8 302.7 224 272 224s-60.2-12.2-81.9-33.9l-23.4-23.4z" fill="${color}"/>
            </svg>`;
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
    const maxOpacity = 0.9;
    const minOpacity = 0.3;
    const color = '#dae012';
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
                                                <strong>Numero da Vaca:</strong> {location.cowId} <br />
                                                <strong>FORA DO TERRENO</strong>
                                            </>
                                        ) : (
                                            <>
                                                <strong>Numero da Vaca:</strong> {location.cowId} <br />
                                                {/* <strong>Latitude:</strong> {location.latitude} <br />
                                                <strong>Longitude:</strong> {location.longitude} <br /> */}
                                            </>
                                        )}
                                    </Popup>
                                </Marker>
                            );
                        })}
                        <Rectangle
                            bounds={[
                                [-22.256145315315315, -45.69440112104077], // Extremo superior esquerdo
                                [-22.26231086486486, -45.687739110705834]  // Extremo inferior direito
                            ]}
                            color="green"
                            fillColor="green"
                            fillOpacity={0.2}
                        >
                            <Popup>
                                Área do terreno
                            </Popup>
                        </Rectangle>
                        {topZones.map((zone, index) => {
                            const [latMin, latMax] = zone.latitude_range.split('--').map(coord => parseFloat(coord));
                            const [lngMin, lngMax] = zone.longitude_range.split('--').map(coord => parseFloat(coord));

                            const bounds: [[number, number], [number, number]] = [
                                [latMin, lngMin],
                                [-latMax, -lngMax]
                            ];

                            const { color, fillColor, fillOpacity } = getZoneStyle(index);

                            return (
                                <Rectangle
                                    key={index}
                                    bounds={bounds}
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
                <p>Carregando...</p>
            )}
        </div>
    );
}
