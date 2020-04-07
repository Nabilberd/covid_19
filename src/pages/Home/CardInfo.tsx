import React from "react";
import styled from "styled-components";
import moment from "moment";

import { useTranslation, getDirection } from '../../strings';

export interface CardProps {
    activeCases: number;
    deathCases: number;
    recoveredCases: number;
    excludedCases: number;
    lastModifiedDate: Date;
}

const CardInfo = ({lastModifiedDate, activeCases = 0, deathCases = 0, recoveredCases = 0, excludedCases = 0}: CardProps) => {
    
    const { Strings} = useTranslation();

    const Direction = getDirection();

    return (
        <Container dir={Direction}>
            <Title>{Strings}</Title>
            <Line>
                <Element theme={{isRed: true}}>
                    {activeCases}
                </Element>
                <b>{Strings("activeCases")}</b>
            </Line>
            <Line>
                <Element theme={{isRed: true}}>
                    {deathCases}
                </Element>
                <b>{Strings("deathCases")}</b>
            </Line>
            <Line>
                <Element>
                    {recoveredCases}
                </Element>
                <b>{Strings("recoveredCases")}</b>
            </Line>
            <Line>
                <Element>
                    {excludedCases}
                </Element>
                <b>{Strings("excludedCases")}</b>
            </Line>
            <Center>{Strings("labelDate")} <LastDate>{moment(lastModifiedDate).format('DD/MM/YYYY HH:mm:ss')}</LastDate></Center>
            <Divider/>
            <div>{Strings("source")}: <a href="http://www.covidmaroc.ma">covidmaroc.ma</a></div>
        </Container>
    )
};
const Container = styled.div`
    display :block;
    position: absolute;
    font-size: 12px;
    bottom: 25px;
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
    display: inline-grid;
    flex-direction: row;
    justify-content : center;
`;
const LastDate = styled.div`
    font-size: larger;
    font-family: sans-serif;
    font-weight: 600;
`;

export default CardInfo;
