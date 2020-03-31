import {useEffect, useState} from "react";
import {Data} from "../../api/Statistics/models";
import {Client} from "../../api/Client";


interface StatisticsData {
    state: 'loading' | 'success' | 'error'
    data?: Data[]
}

export default function useController() {

    const [statistics, setStatistics] = useState<StatisticsData>({state: 'loading'});

    useEffect(() => {
        Client.getInstance().statistics.getStatistics().then((value: Data[]) => {
            setStatistics({state: 'success', data: value});
        }).catch((e) => {
            setStatistics({state: 'error'});
        })
    }, []);

    return {statistics};
}