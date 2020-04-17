import React, { useMemo, useState } from 'react';
import ReactMapboxGl, { RotationControl, ZoomControl, MapContext } from 'react-mapbox-gl';

import {IMail} from "../../api/Mail/models";
import IconMed from '../../logo/iconMed1.png'
import Circles from './Circles';
import Loading from './Loading';
import useController from "./Controller";
import styled from "styled-components";
import { ICenter } from "./models";
import CardInfo from "./CardInfo";
import { useTranslation, changeLanguage, getLanguage } from '../../strings';
import ChartLine from './Chart';
import MainStats from './MainStats';
import { mapConfig } from "../../config";
import Modal from './Modal';
import {Client} from "../../api/Client";

interface StatisticsData {
    state: 'loading' | 'success' | 'error'
    response?: string
}


function Home() {

    const { statistics } = useController();

    const language = getLanguage();

    const { Strings } = useTranslation();

    const [infos, setCenter] = useState<ICenter>({
        longitude: -10,
        latitude: 29
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);

    const changeMap = (map: any) => {    
        var adminLayers = [
            'admin-0-boundary',
            'admin-1-boundary',
            'admin-0-boundary-disputed',
            'admin-1-boundary-bg',
            'admin-0-boundary-bg'
        ];
        adminLayers.forEach(function(adminLayer) {
            map.setFilter(adminLayer, [
                "match",
                ["get", "disputed"],
                ["false"],
                true,
                false
            ]);
        });
    

        map.setLayoutProperty('country-label', 'text-field', [
            'get',
            'null'
        ]);
    };

    const moroccoData: any = useMemo(() => {
        return statistics.state === "success" ? statistics.data!.countries[0] : {}
    }, [statistics.data]);


    return (
        <Container>
            {statistics.state === "loading" ?
                <Loading />
                : statistics.state === "error" ?
                    <Center><span>Error</span></Center>
                    :
                    <>
                        <Map
                            center={[infos.longitude, infos.latitude]}
                            zoom={[!isMobile ? 4.5 : 3.7]}
                            style="mapbox://styles/mapbox/dark-v10"
                            containerStyle={{
                                height: isMobile ? '70%' : '100%',
                                width: isMobile ? '100%' : '50%',
                                float: 'left'
                            }}
                            onStyleLoad={changeMap}
                        >
                            <>
                                {statistics.data!.countries.map((value: any) => {
                                    return <Circles dataSet={value.regions} setCenter={setCenter} />
                                })}
                            </>
                        </Map>
                        {language === "fr" ?
                            <Button onClick={() => changeLanguage("ar")}>{Strings("language")}</Button>
                            :
                            <Button onClick={() => changeLanguage("fr")}>{Strings("language")}</Button>
                        }
                        <ButtonModal style={isMobile ? {height: "70px", width: "70px", bottom: "159px", right: "5px"} : {left: "8px"}} onClick={handleClickOpen} >
                            <img style={isMobile ? {marginRight: "1px", marginTop: "6px", width: "54px"} : {marginRight: "2px", marginTop: "8px", width: '58px'}} src={IconMed} /> 
                        </ButtonModal>
                        <Modal open={open} handleClose={handleClose} setOpen={setOpen} />
                        <GridStats style={{ width: isMobile ? '100%' : '50%'}}>
                            <MainStats
                                isMobile={isMobile}
                                activeCases={moroccoData.totalActive}
                                deathCases={moroccoData.totalDied}
                                excludedCases={moroccoData.totalExclus}
                                recoveredCases={moroccoData.totalRecovered}
                                lastModifiedDate={moroccoData.lastModifiedDate}
                            />
                        </GridStats>
                    </>
            }
        </Container>
    );
}
const DivTab = styled.div`
    top: 25%;
    left: 0;
    display: block;
    position: absolute;
    font-size: 12px;
    padding: 10px;
    background-color: white;
    box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);
    cursor: pointer;
    z-index: 999;
    padding: 0.6em 2em;
    border-radius: 7px;
    color: #fff;
    background-color: #1976d2;
    border: 0;
    cursor: pointer;
`;
const ButtonModal =styled.div`
    z-index: 9999;
    border-radius: 50px;
    position: absolute;
    bottom: 26px;
    padding: 0;
    height: 73px;
    line-height: 54px;
    width: 73px;
    text-align: center;
    display: block;
    margin-top: -27px;
    box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);
    cursor: pointer;
    background: rgb(52, 51, 50);
`;
const Button = styled.button`
    display: block;
    position: absolute;
    font-size: 12px;
    padding: 10px;
    box-shadow: 0px 2px 10px 1px rgba(0,0,0,0.5);
    cursor: pointer;
    z-index: 999;
    padding: 0.6em 2em;
    border-radius: 8px;
    color: #fff;
    background-color: #1976d2;
    border: 0;
    cursor: pointer;
    margin: 1em;
`;
const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;
const Center = styled.div`
    display : flex;
    flex-direction : row;
    align-items: center;
    justify-content: center;
`;
const GridStats = styled.div`
    background-color: rgb(52, 51, 50);
    float: right;
`;
export default Home;
