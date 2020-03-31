import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';
import CardInfo, {CardProps} from './CardInfo';
import useController from "./Controller";
import styled from "styled-components";
import {Data} from "../../api/Statistics/models";
import {ICenter} from "./models";


function Home() {

    const {statistics} = useController();

    const totalStatistics = useMemo<CardProps>(() => {
        if (statistics.data && statistics.data!.length > 0)
            return statistics.data?.reduce<CardProps>(function (previousValue: CardProps, currentValue: Data) {
                return (
                    {
                        activeCases: previousValue.activeCases! + currentValue.activeCases,
                        deathCases: 0,
                        excludedCases: 0,
                        recoveredCases: 0
                    });
            }, {
                activeCases: 0,
                deathCases: 0,
                excludedCases: 0,
                recoveredCases: 0
            });
        return ({
            activeCases: 0,
            deathCases: 0,
            excludedCases: 0,
            recoveredCases: 0
        })

    }, [statistics]);

    const [infos, setCenter] = useState<ICenter>({
        longitude: -8,
        latitude: 29
    });

    const Map = useMemo(() => ReactMapboxGl({
        accessToken: mapConfig.accessToken
    }), []);
    return (
        <Container>
            {statistics.state === "loading" ?
                <div><span>Loading ...</span></div>
                : statistics.state === "error" ?
                    <div><span>Error</span></div>
                    :
                    <Map
                        center={[infos.longitude, infos.latitude]}
                        zoom={[4.5]}
                        style="mapbox://styles/mapbox/dark-v10"
                        containerStyle={{
                            height: '100vh',
                            width: '100vw'
                        }}
                    >
                        <ZoomControl/><RotationControl/><ZoomControl/>
                        <CardInfo {...totalStatistics}/>
                        <Circles dataSet={statistics.data!} setCenter={setCenter}/>
                    </Map>
            }
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

export default Home;
