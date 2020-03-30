import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';

function Home() {

    const [dataSet, setDataSet] = useState([
        {
            objectid: "1",
            longitude: "-6.8498129",
            latitude: "33.9715904",
            cases: 100,
        },
        {
            objectid: "2",
            longitude: "-2.9275836",
            latitude: "35.1686165",
            cases: 50,
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
