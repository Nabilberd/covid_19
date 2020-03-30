import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {Feature, Layer, RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";


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
        }]
    );

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
