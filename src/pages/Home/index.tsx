import React, {useEffect, useRef, useState} from 'react';
import mapBoxGL from 'mapbox-gl';
import {mapConfig} from "../../config";

mapBoxGL.accessToken = mapConfig.accessToken;
mapBoxGL.setRTLTextPlugin(
    mapConfig.apiText,
    () => {},
    true // Lazy load the plugin
);

function Home() {

    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        zoom: 4.6
    });
    const mapContainer = useRef("mapContainer");

    /* eslint-disable */
    useEffect(() => {
    
        const map: any = new mapBoxGL.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [infos.lng, infos.lat],
            zoom: infos.zoom
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapBoxGL.NavigationControl());

        map.on('move', () => {
            setInfos({
                lng: parseInt(map.getCenter().lng.toFixed(4)),
                lat: parseInt(map.getCenter().lat.toFixed(4)),
                zoom: parseInt(map.getZoom().toFixed(2))
            })
        });
    }, []);

    return (
        <div>
            <span>Covid-19</span>
            <div ref={(el: any) => mapContainer.current = el} className="mapContainer"/>
        </div>
    );
}

export default Home;
