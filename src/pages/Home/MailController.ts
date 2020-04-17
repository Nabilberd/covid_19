import {useEffect, useState} from "react";
import {IRequest, IMail} from "../../api/Mail/models";
import {Client} from "../../api/Client";


interface StatisticsData {
    state: 'loading' | 'success' | 'error'
    response?: string
}

export default function useController(data: IRequest) {

    const [mailResponse, setMailResponse] = useState<StatisticsData>({state: 'loading'});

    useEffect(() => {
        Client.getInstance().mail.postMail(data).then((value: IMail) => {
            setMailResponse({state: 'success', response: value.response});
        }).catch((e) => {
            setMailResponse({state: 'error'});
        })
    }, []);

    return {mailResponse};
}