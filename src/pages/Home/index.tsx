import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFiaWxiZXJkIiwiYSI6ImNrOGNhdHQ3cDBrbGEzZnBlZDkxeGVxdHkifQ.CqkJ3P5DwjPEKW65AEclJA';

function Home() {

    const [infos, setInfos] = useState({
        lng: 5,
        lat: 34,
        zoom: 2
    })
    let mapContainer = useRef("mapContainer");

    /* eslint-disable */
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [infos.lng, infos.lat],
            zoom: infos.zoom
        });

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
            <div ref={el => mapContainer = el} className="mapContainer" />
        </div>
    );
}

export default Home;
