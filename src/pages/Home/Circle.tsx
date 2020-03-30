import React from "react";
import {Feature, Layer, Popup} from "react-mapbox-gl";
import {Data} from "../../api/Statistics/models";

interface IProps {
    index: number;
    newData: Data;
    selected: boolean;
    setSelected: () => void;
    max: number;
}


const Circle = ({index, newData, selected, setSelected, max}: IProps) => {

    // @ts-ignore
    const opacity: number = newData.activeCases / max;
    // @ts-ignore
    const width: number = newData.activeCases * 20 / max;
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
                onClick={setSelected}
            >
            </Feature>
        </Layer>
        {selected && (
            <Popup
                coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}
            >
                <div>
                    <p>
                        <b>Region : </b> {newData.label}
                    </p>
                </div>
            </Popup>
        )}
    </>

};

export default Circle;