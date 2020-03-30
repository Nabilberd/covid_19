import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';
import useController from "./Controller";

function Home() {

    const {statistics} = useController();

    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        cases: 10,
        zoom: 4.6,
    });

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);
    debugger;
    return (
        <div className="mapContainer">
            {statistics.state === "loading" ?
                <div><span>Loading ...</span></div>
                :
                <Map
                    center={[infos.lng, infos.lat]}
                    zoom={[infos.zoom]}
                    style="mapbox://styles/mapbox/dark-v10"
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}
                >
                    <ZoomControl/><RotationControl/><ZoomControl/>
                    <Circles dataSet={statistics.data!}/>
                </Map>
            }
        </div>
    );
}

export default Home;
