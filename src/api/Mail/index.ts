import Api from "../Api";
import { IRequest, IMail } from "./models";


export default class Mail extends Api {

    private readonly urlPath: string;


    constructor(urlPath: string) {
        super();
        this.urlPath = urlPath
    }

    postMail(data: IRequest): Promise<IMail> {
        //return this.getFakeStatistics();
        return super.request<string>(this.urlPath, data, 'POST').then((value) => ({response: value}));
    }

    
}



