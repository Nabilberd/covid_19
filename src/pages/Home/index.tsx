import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';
import useController from "./Controller";
import {ICenter} from "./models";


function Home() {

    const {statistics} = useController();

    const [infos, setCenter] = useState<ICenter>({
        longitude: -8,
        latitude: 29
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
                        center={[infos.longitude, infos.latitude]}
                        zoom={[4.5]}
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={{
                            height: '100vh',
                            width: '100vw'
                        }}
                    >
                        <ZoomControl/><RotationControl/><ZoomControl/>
                        <Circles dataSet={statistics.data!} setCenter={setCenter}/>
                    </Map>
            }
        </div>
    );
}

export default Home;
