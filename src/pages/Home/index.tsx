import React, { useMemo, useState } from 'react';
import ReactMapboxGl, { RotationControl, ZoomControl } from 'react-mapbox-gl';
import { mapConfig } from "../../config";
import Circles from './Circles';
import CardInfo from './CardInfo';
import useController from "./Controller";

function Home() {

    const { statistics } = useController();

    const [infos,] = useState({
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
            {statistics.state === "loading" ?
                <div><span>Loading ...</span></div>
                : statistics.state === "error" ?
                    <div><span>Error</span></div>
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
                        <ZoomControl /><RotationControl /><ZoomControl />
                        <Circles dataSet={statistics.data!} />
                        <CardInfo />
                    </Map>
            }
        </div>
    );
}

export default Home;
