import React from "react";
import {Feature, Layer, Popup} from "react-mapbox-gl";

const Circle = ({index, newData, selected, setSelected}: any) => {


    return <>
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

};

export default Circle;