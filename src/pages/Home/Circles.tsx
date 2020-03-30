import Circle from "./Circle";
import React, {useState} from "react";
import {Data} from "../../api/Statistics/models";

interface IProps {
    dataSet: Data[],
}

const Circles = ({dataSet}: IProps) => {
    const [selected, setSelected] = useState(-1);
    const max = dataSet.reduce<number>((previousValue: number, currentValue: Data) => {
        return Math.max(previousValue, currentValue.activeCases)
    }, 0);
    return <>
        {dataSet.map((newData: any, index: number) => {
            return (
                <Circle
                    index={index}
                    newData={newData}
                    selected={index === selected}
                    max={max}
                    setSelected={() => {
                        if (selected === index)
                            setSelected(-1);
                        else setSelected(index)
                    }}/>
            )
        })}
    </>
};
export default Circles;