import React, {useMemo, useState} from 'react';
import ReactMapboxGl, {RotationControl, ZoomControl} from 'react-mapbox-gl';
import {mapConfig} from "../../config";
import Circles from './Circles';
import useController from "./Controller";
import styled from "styled-components";
import {ICenter} from "./models";
import CardInfo from "./CardInfo";


function Home() {

    const {statistics} = useController();


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
                <Center><span>Loading ...</span></Center>
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
const Center = styled.div`
    display : flex;
    flex-direction : row;
    align-items: center;
    justify-content: center;
`;

export default Home;
