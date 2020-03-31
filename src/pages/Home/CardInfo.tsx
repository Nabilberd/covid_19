import React from "react";

const CardInfo = () => {

    return (
        <div id="totaldiv" style={{ display: "block" }}>
            <div id="contenttotal">INFORMATION CORONAVIRUS MAROC</div>
            <div> 
                <span style={{ color: "#bd1620", fontFamily: "tahoma", fontSize: "18px", fontWeight: 'bolder' }}>
                    794,958
                </span> 
                <b>confirmed cases</b>  
            </div>
            <div>
                <span style={{ color: "#bd1620", fontFamily: "tahoma", fontSize: "18px", fontWeight: 'bolder' }}>
                38,588
                </span> 
                <b>reported deaths</b>
            </div>
            <div>
                <span style={{ color: "rgb(0, 128, 0)", fontFamily: "tahoma", fontSize: "18px", fontWeight: 'bolder' }}>
                164,338
                </span>
                <b>recovered*</b>  
            </div>
            <div>
                <span style={{ color: "rgb(0, 128, 0)", fontFamily: "tahoma", fontSize: "18px", fontWeight: 'bolder' }}>
                14,338
                </span>
                <b>excluded cases</b>
            </div>

            <div >Last updated Mar 31, 2020</div>
            <div id="divider"></div>
            <div >Source: <a href="http://www.covidmaroc.ma">covidmaroc.ma</a></div>
        </div>
    )
}
export default CardInfo;
