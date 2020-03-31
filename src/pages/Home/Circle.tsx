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

    if (newData.activeCases === 0) return null;
    // @ts-ignore
    const greenRate: number = 255 - newData.activeCases * 255 / max;
    // @ts-ignore
    const width: number = newData.activeCases * 20 / max;
    console.log(greenRate);
    return <>
        <Layer type="circle" id={"marker" + index} paint={{
            'circle-color': `rgb(255,  ${greenRate},0)`,
            'circle-stroke-color': `rgb(255,  ${greenRate},0)`,

            'circle-stroke-width': width,

            'circle-opacity': 0.8,
            'circle-stroke-opacity': 0.8
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
                    <p>
                        <b>Active cases : </b> {newData.activeCases}
                    </p>
                </div>
            </Popup>
        )}
    </>

};

export default Circle;