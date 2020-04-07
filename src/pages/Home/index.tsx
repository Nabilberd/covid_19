import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';
import Loading from './Loading';
import useController from "./Controller";
import styled from "styled-components";
import {ICenter} from "./models";
import CardInfo from "./CardInfo";
import { useTranslation, changeLanguage, getLanguage } from '../../strings';

function Home() {

    const {statistics} = useController();

    const language = getLanguage();

    const { Strings} = useTranslation();

    const [infos, setCenter] = useState<ICenter>({
        longitude: -8,
        latitude: 29
    });

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    const moroccoData: any = useMemo(() => {
        return statistics.state === "success" ? statistics.data!.countries[0] : {}
    }, [statistics.data]);

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);
    return (
        <Container>
            {statistics.state === "loading" ?
                <Loading />
                : statistics.state === "error" ?
                    <Center><span>Error</span></Center>
                    :
                    <Map
                        center={[infos.longitude, infos.latitude]}
                        zoom={[!isMobile ? 4.5 : 3.7]}
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={{
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <ZoomControl/><RotationControl/><ZoomControl/>
                        <CardInfo
                            activeCases={moroccoData.totalActive}
                            deathCases={moroccoData.totalDied}
                            excludedCases={moroccoData.totalExclus}
                            recoveredCases={moroccoData.totalRecovered}
                            lastModifiedDate={moroccoData.lastModifiedDate}
                        />
                        <>
                            {statistics.data!.countries.map(value => {
                                return <Circles dataSet={value.regions} setCenter={setCenter}/>
                            })}
                        </>
                        {language === "fr" ?
                            <Button onClick={() => changeLanguage("ar")}>{Strings("language")}</Button>
                            :
                            <Button onClick={() => changeLanguage("fr")}>{Strings("language")}</Button>
                        }
                    </Map>
            }
        </Container>
    );
}

const Button = styled.button`
    display: block;
    position: absolute;
    font-size: 12px;
    padding: 10px;
    background-color: white;
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

export default Home;
