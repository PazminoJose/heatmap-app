import { ReactElement, useEffect, useRef, useState } from "react";
import { Coordinates, MapProps } from '../interfaces/interfaces';


export default function Map({ mapProps, coordinates }: { mapProps: MapProps, coordinates: Array<Coordinates> }): ReactElement {
    const refMap = useRef(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const getPoints = coordinates.map((c) => {
        return new google.maps.LatLng(c.lat, c.lng);
    })
    useEffect(() => {
        if (refMap.current && !map) {
            setMap((prev) => {
                const map = new google.maps.Map(refMap.current!, {
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: false,
                    center: mapProps.center,
                    zoom: mapProps.zoom,
                });
                new google.maps.visualization.HeatmapLayer({
                    data: getPoints,
                    map: map
                })
                return map;
            }
            );
        }
    }, [refMap, map, mapProps, getPoints]);
    return (
        <div ref={refMap} style={{ height: '100vh', width: '100%' }} />
    );

}