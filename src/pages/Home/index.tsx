import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { Layer, Feature, ZoomControl, ScaleControl, RotationControl, Popup } from 'react-mapbox-gl';
import { mapConfig } from "../../config";


function Home() {

    const [dataSet, setDataSet] = useState([{
        objectid: "1",
        latitude: "-8",
        longitude: "29"
    }]);

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/yjub-udmw.json")
            .then(res => res.json())
            .then(data => {
                //setDataSet(data)
            });
    }, []);


    function closePopup(){
        setSelected(false) 
    };

    const [infos, setInfos] = useState({
        lng: -8,
        lat: 29,
        zoom: 4.6
    });

    console.log(selected)

    const Map = ReactMapboxGl({
        accessToken: mapConfig.accessToken
    });

    const features = dataSet.map((newData, index) => {
        return (
            <>
                <Layer type="circle" id={"marker" + index} paint={{
                    'circle-color': "red",
                    'circle-stroke-width': index + 12,
                    'circle-stroke-color': 'red',
                    'circle-stroke-opacity': 1
                }}>
                    <Feature
                        coordinates={[parseFloat(newData.latitude), parseFloat(newData.longitude)]}
                        onClick={() => setSelected(true)}
                    >
                    </Feature>
                </Layer>
                {selected && (
                        <Popup                    
                            coordinates={[parseFloat(newData.latitude), parseFloat(newData.longitude)]}
                        >
                            <div>
                                <p>
                                    <b>Latitude:</b> {newData.latitude}
                                </p>
                                <p>
                                    <b>Longitude:</b> {newData.longitude}
                                </p>
                            </div>
                        </Popup>
                )}
            </>
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
