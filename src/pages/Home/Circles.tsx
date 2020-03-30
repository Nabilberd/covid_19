import Circle from "./Circle";
import React, {useState} from "react";


const Circles = ({dataSet}: any) => {
    const [selected, setSelected] = useState(-1);
    // @ts-ignore
    const max = dataSet.reduce<Number>((previousValue: number, currentValue: any) => {
        return Math.max(previousValue, currentValue.cases)
    }, 0);
    return dataSet.map((newData: any, index: number) => {
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
    })
};
export default Circles;