import {useEffect, useState} from "react";
import {IStatistics} from "../../api/Statistics/models";
import {Client} from "../../api/Client";


interface StatisticsData {
    state: 'loading' | 'success' | 'error'
    data?: IStatistics
}

export default function useController() {

    const [statistics, setStatistics] = useState<StatisticsData>({state: 'loading'});

    useEffect(() => {
        Client.getInstance().statistics.getStatistics().then((value: IStatistics) => {
            debugger;
            setStatistics({state: 'success', data: value});
        }).catch((e) => {
            setStatistics({state: 'error'});
        })
    }, []);

    return {statistics};
}