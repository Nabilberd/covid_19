import React from "react";
import {Feature, Layer, Popup} from "react-mapbox-gl";

const Circle = ({index, newData, selected, setSelected, max}: any) => {

    // @ts-ignore
    const opacity: number = newData.cases / max;
    // @ts-ignore
    const width: number = newData.cases * 20 / max;
    return <>
        <Layer type="circle" id={"marker" + index} paint={{
            'circle-color': "rgb(255,0,0)",
            'circle-stroke-color': 'rgb(255,0,0)',

            'circle-stroke-width': width,

            'circle-opacity': opacity,
            'circle-stroke-opacity': opacity
        }}>
            <Feature
                coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}
                onClick={() => setSelected(true)}
            >
            </Feature>
        </Layer>
        {selected && (
            <Popup
                coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}
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