import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, ScaleControl, RotationControl, Marker } from 'react-mapbox-gl';
import { mapConfig } from "../../config";


function Home() {

    const [dataSet, setDataSet] = useState([{
        objectid: "1",
        latitude: "-8",
        longitude: "29"
    }]);

    useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/yjub-udmw.json")
            .then(res => res.json())
            .then(data => {
                //setDataSet(data)
            });
    }, []);




    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        zoom: 4.6
    });

    const Map = ReactMapboxGl({
        accessToken: mapConfig.accessToken
    });

    const features = dataSet.map((newData, index) => {
        return (
            <Layer type="circle" id={"marker" + index} paint={{
                'circle-color': "red",
                'circle-stroke-width': index + 12,
                'circle-stroke-color': 'red',
                'circle-stroke-opacity': 1
            }}>
                <Feature coordinates={[parseFloat(newData.latitude), parseFloat(newData.longitude)]} />
            </Layer>
        )
    })


    return (
        <div className="mapContainer">
            <Map
                center={[infos.lng, infos.lat]}
                zoom={[infos.zoom]}
                style="mapbox://styles/mapbox/dark-v10"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <>
                    <ZoomControl /><RotationControl /><ZoomControl />
                    {features}
                </>
            </Map>
        </div>
    );
}

export default Home;
