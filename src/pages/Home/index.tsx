import React, {useEffect, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';

function Home() {

    const [dataSet, setDataSet] = useState([{
        objectid: "1",
        latitude: "-8",
        longitude: "29"
    },
        {
            objectid: "1",
            latitude: "-3",
            longitude: "29"
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
        zoom: 4.6
    });

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);

    const features = useMemo(() => {
        const max: Number = dataSet.reduce<Number>((previousValue, currentValue) => {
            return previousValue > currentValue.cases ? previousValue : currentValue.cases;
        }, 0);
        return dataSet.map((newData, index) => {


            // @ts-ignore
            const opacity: number = newData.cases / max;
            // @ts-ignore
            const width: number = newData.cases * 20 / max;

            return (
                <Layer type="circle" id={"marker" + index} paint={{
                    'circle-color': "rgb(255,0,0)",
                    'circle-stroke-color': 'rgb(255,0,0)',
                    'circle-stroke-width': width,
                    'circle-opacity': opacity,
                    'circle-stroke-opacity': opacity
                }}>
                    <Feature coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}/>
                </Layer>
            )
        });
    }, [dataSet]);


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
                    {features}
                </>
            </Map>
        </div>
    );
}

export default Home;
