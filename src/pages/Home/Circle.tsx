import React from "react";
import styled from "styled-components";
import {Feature, Layer, Popup} from "react-mapbox-gl";
import {IRegion} from "../../api/Statistics/models";

interface IProps {
    index: number;
    newData: IRegion;
    selected: boolean;
    setSelected: () => void;
    max: number;
}


const Circle = ({index, newData, selected, setSelected, max}: IProps) => {
    if (newData.activeCases === 0) return null;
    const greenRate: number = 255 - newData.activeCases * 255 / max;
    const width: number = newData.activeCases < 50 ? newData.activeCases * 50 /  max : newData.activeCases * 20 /  max  ;
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
        <Layer id={"text-circle"+ index} type="symbol" layout={{
            "text-field": newData.activeCases.toString(),
            "text-size": newData.activeCases > 200 ? 14 : 10,
        }}>
            <Feature
                coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}
            />
        </Layer>
        {selected && (
            <Popup offset={2}
                style={{top: "-8px"}}
                coordinates={[parseFloat(newData.longitude), parseFloat(newData.latitude)]}
            >
                <div>
                    <p>
                        <b>Région : {newData.label}</b> 
                    </p>
                    <p>
                        <b>Cas actifs : </b> <Element>{newData.activeCases}</Element>
                    </p>
                </div>
            </Popup>
        )}
    </>

};

const Element = styled.span`
    color: red;
    font-family : tahoma;
    font-size : 15px;
    font-weight : bolder;
`;

export default Circle;