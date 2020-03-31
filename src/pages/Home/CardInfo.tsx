import React from "react";
import styled from "styled-components";


const CardInfo = () => {
    return (
        <Container>
            <Title>INFORMATION CORONAVIRUS MAROC</Title>
            <Line>
                <Element theme={{isRed: true}}>
                    794,958
                </Element>
                <b>confirmed cases</b>
            </Line>
            <Line>
                <Element theme={{isRed: true}}>
                    38,588
                </Element>
                <b>reported deaths</b>
            </Line>
            <Line>
                <Element>
                    164,338
                </Element>
                <b>recovered*</b>
            </Line>
            <Line>
                <Element>
                    14,338
                </Element>
                <b>excluded cases</b>
            </Line>
            <Center>Last updated Mar 31, 2020</Center>
            <Divider/>
            <div>Source: <a href="http://www.covidmaroc.ma">covidmaroc.ma</a></div>
        </Container>
    )
};
const Container = styled.div`
    display :block;
    position: absolute;
    font-size: 12px;
    bottom: 10px;
    right: 10px;
    padding: 10px;
    background-color: white;
    box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);
    cursor: pointer;
    z-index: 999;
`;
const Title = styled.div`
    font-weight: bold;
    padding-bottom: 5px;
`;
const Line = styled.div`
    display : flex;
    flex-direction: row;
    justify-content : space-between;
`;
const Element = styled.span`
    color: ${props => props.theme.isRed ? "#bd1620" : "#008000"};
    font-family : tahoma;
    font-size : 18px;
    font-weight : bolder;
`;
const Divider = styled.div`
    padding-top: 15px;
    border-bottom: 3px solid #cccccc;
`;
const Center = styled.div`
    display : flex;
    flex-direction: row;
    justify-content : center;
`;

export default CardInfo;
