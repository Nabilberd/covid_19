import {useState} from "react";
import {IMail} from "../../api/Mail/models";
import {Client} from "../../api/Client";


interface MailData {
    state: 'loading' | 'success' | 'error'
    response?: string
}

function useControllerMail() {

    const [mail, setMail] = useState<MailData>({state: 'loading'});

    const sendMail = (adress: string, description: string) => {
        Client.getInstance().mail.postMail({adress, description}).then((value: IMail) => {
            setMail({state: 'success', response: value.response});
        }).catch((e) => {
            setMail({state: 'error'});
        })
    };


    return {mail, sendMail};
}

export default useControllerMail;