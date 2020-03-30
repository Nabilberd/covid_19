import Circle from "./Circle";
import React, {useState} from "react";


const Circles = ({dataSet}: any) => {
    const [selected, setSelected] = useState(-1);
    return dataSet.map((newData: any, index: number) => {
        return (
            <Circle index={index} newData={newData} selected={index == selected}
                    setSelected={() => setSelected(index)}/>
        )
    })
};
export default Circles;