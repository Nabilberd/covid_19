import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, ScaleControl, RotationControl, Marker } from 'react-mapbox-gl';
import { mapConfig } from "../../config";


function Home() {

    const [dataSet, setDataSet] = useState([{
        objectid: "1",
        latitude: "3",
        longitude: "1"
    }]);

    useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/yjub-udmw.json")
            .then(res => res.json())
            .then(data => {
                setDataSet(data)
            });
    }, []);

    console.log(dataSet)
    

    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        zoom: 4.6
    });

    const Map = ReactMapboxGl({
        accessToken: mapConfig.accessToken
    });

    return (
        <div className="mapContainer">
            <Map
                center={[infos.lng, infos.lat]}
                zoom={[infos.zoom]}
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <ZoomControl /><RotationControl /><ZoomControl />
                <Layer type="circle" id="marker" paint={{
                    'circle-color': "red",
                    'circle-stroke-width': 30,
                    'circle-stroke-color': 'red',
                    'circle-stroke-opacity': 1
                }}>
                    {
                        dataSet.map( newData => {
                            return (
                                <Feature coordinates={[parseFloat(newData.latitude), parseFloat(newData.longitude)]} />
                            )
                        })
                    }
                    <Feature coordinates={[-0.465, 51.258]} />
                </Layer>            
            </Map>
        </div>
    );
}

export default Home;
