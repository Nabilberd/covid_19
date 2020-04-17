import {useEffect, useState} from "react";
import {IRequest, IMail} from "../../api/Mail/models";
import {Client} from "../../api/Client";


interface MailData {
    state: 'loading' | 'success' | 'error'
    response?: string
}

function useControllerMail({adress, description}: IRequest) {

    const [mail, setMail] = useState<MailData>({state: 'loading'});

    useEffect(() => {
        Client.getInstance().mail.postMail({adress, description}).then((value: IMail) => {
            setMail({state: 'success', response: value.response});
        }).catch((e) => {
            setMail({state: 'error'});
        })
    }, [{adress, description}]);


    return {mail};
}

export default useControllerMail;