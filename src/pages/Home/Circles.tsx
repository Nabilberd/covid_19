import Circle from "./Circle";
import React, {useState} from "react";
import {IRegion} from "../../api/Statistics/models";
import {ICenter} from "./models";

interface IProps {
    dataSet: IRegion[],
    setCenter: (center: ICenter) => void
}

const Circles = ({dataSet, setCenter}: IProps) => {
    const [selected, setSelected] = useState(-1);
    const max = dataSet.reduce<number>((previousValue: number, currentValue: IRegion) => {
        return Math.max(previousValue, currentValue.activeCases)
    }, 0);
    return <>
        {dataSet.map((newData: IRegion, index: number) => {
            return (
                <Circle
                    index={index}
                    newData={newData}
                    selected={index === selected}
                    max={max}
                    setSelected={() => {
                        if (selected === index)
                            setSelected(-1);
                        else {
                            setSelected(index);
                            setCenter({
                                longitude: parseFloat(newData.longitude),
                                latitude: parseFloat(newData.latitude)
                            })
                        }
                    }}/>
            )
        })}
    </>
};
export default Circles;
