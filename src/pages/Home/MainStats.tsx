import React, {useState} from 'react'
import styled from 'styled-components'
import moment from "moment";
import Grid from '@material-ui/core/Grid';

import ChartLine from './Chart'
import { useTranslation } from '../../strings';
import data from '../../data/data.json'

interface IElem {
    elemProp: "Nouveauxcaspositifs" | "NouveauCasnégatifs" | "NouveauCasdécédés" | "NouveauCasrétablis";
}
interface IProps {
    isMobile: boolean;
    activeCases: number;
    deathCases: number;
    recoveredCases: number;
    excludedCases: number;
    lastModifiedDate: Date;
}
interface IMetric {
    "date": string;
    "Testseffectués": number;
    "Casnégatifs": number;
    "Caspositifs": number;
    "Casdécédés": number;
    "Casrétablis": number;
    "Nouveauxcaspositifs": number;
    "NouveauCasnégatifs": number;
    "NouveauCasdécédés": number;
    "NouveauCasrétablis": number;
}

export default function MainStats({lastModifiedDate, activeCases = 0, deathCases = 0, recoveredCases = 0, excludedCases = 0, isMobile}: IProps) {

    const { Strings } = useTranslation();

    let countDeath = Math.round((deathCases / activeCases ) * 1000) / 10;
    let countRecovered = Math.round((recoveredCases / activeCases ) * 1000) / 10;

    const listItem: { id: "Nouveauxcaspositifs" | "NouveauCasnégatifs" | "NouveauCasdécédés" | "NouveauCasrétablis"; label: string; numberCalc: number; color: string; titleChart: string }[] = [
        { id: "Nouveauxcaspositifs", label: Strings("activeCases"), numberCalc: activeCases ,color: "#bd1620", titleChart: "titleChartActive" },
        { id: "NouveauCasdécédés", label: Strings("deathCases"), numberCalc: deathCases ,color: "#bd1620" , titleChart: "titleChartDeath" },
        { id: "NouveauCasnégatifs", label: Strings("excludedCases"), numberCalc: excludedCases , color: "#008000", titleChart: "titleChartExcluded" },
        { id: "NouveauCasrétablis", label: Strings("recoveredCases"), numberCalc: recoveredCases , color: "#008000", titleChart: "titleChartRecovered" }
    ]

    const [selected, setSelected] = useState(0);
    const [metric, setMetric] = useState(listItem[0]);

    const lastMetric = data.slice(-1)[0];

    return (
        <>
            <ContainerRegion >
                <ContainerLabel> {Strings("title")} </ContainerLabel>
                <ContainerDate> {Strings("labelDate")} : {moment(lastModifiedDate).format('DD/MM/YYYY HH:mm:ss')} </ContainerDate>
            </ContainerRegion>
            <Grid container style={{marginBottom: 28}} spacing={0}>
                <Grid item xs={12}>
                    <Grid container justify="center" style={{justifyContent: "space-around"}} spacing={0}>
                        {
                            listItem.map((metric, index) => {
                                const count = '—'
                                const elemPro = metric.id;
                                let diff = lastMetric[elemPro];

                                return (
                                    <ContainerItem key={`${index}-number`} style={{float : index%2 ===0 ? "left" : "right"}} >
                                        <CountNumber style={{color: metric.color}}>{metric.numberCalc}{metric.id==="NouveauCasdécédés" ? "("+ countDeath +"%)" : metric.id==="NouveauCasrétablis" ? "("+ countRecovered +"%)" : "" } </CountNumber>
                                        <CountTitle onClick={() => { setSelected(index); setMetric(metric) }} style= {{backgroundColor: selected===index ? metric.color : "#504d4d" }}>{metric.label}</CountTitle>
                                        <CountDaily>
                                            {diff != null &&
                                                !isNaN(diff) && (
                                                    <span>{`${diff >= 0 ? '+' : ''}${diff} ${Strings("cas")}`}</span>
                                                )}
                                        </CountDaily>
                                    </ContainerItem>
                                )
                            })
                        }
                    </Grid>
                </Grid>    
            </Grid>
            <ChartLine data={data} metric={metric} isMobile={isMobile} />
        </>
    )
}
const ContainerRegion = styled.div`
    margin: 50px 0px 35px 0;
    max-width: 100%;
`;
const ContainerLabel = styled.div`
    font-weight: bold;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    color: #eee;
`;
const ContainerDate = styled.div`
    font-size: 15px;
    display: flex;
    font-weight: 600;
    justify-content: center;
    align-items: center;
    color: #756e6e;
`;
const ContainerStats = styled.div`
    margin-left: auto;
    display: table;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: row;
    margin-right: auto;
`;
const ContainerItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: default;
`;
const CountNumber = styled.div`
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Saira Condensed', sans-serif;
    font-weight: 600;
`;
const CountTitle = styled.div`
    text-transform: uppercase;
    background-color: #504d4d;
    color: #eee;
    height: 30px;
    width: 100px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const CountDaily = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding-top: 4px;
    color: grey;
    height: 20px;
    font-weight: 600;
    font-size: 13px;
`;

