import React, {useEffect, useState, useMemo} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl, Layer, Feature} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';

function Home() {

    const [dataSet, setDataSet] = useState([{
        objectid: "1",
        latitude: "-8",
        longitude: "29",
        cases: 100
    },
        {
            objectid: "1",
            latitude: "-3",
            longitude: "29",
            cases: 100
        }]);

    /*useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/yjub-udmw.json")
            .then(res => res.json())
            .then(data => {
                //setDataSet(data)
            });
    }, []);*/

    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        cases: 10,
        zoom: 4.6,
    });

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);

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
                    <ZoomControl/><RotationControl/><ZoomControl/>
                    <Circles dataSet={dataSet}/>
                </>
            </Map>
        </div>
    );
}

export default Home;
