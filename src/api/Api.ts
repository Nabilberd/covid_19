import apiCall from 'axios';
import {Data} from "./Statistics/models";

export default class Api {

    public request<T>(path: string, data: any): Promise<T> {
        return apiCall.get<Data[], any>(path).then(value => value.data);
    }

}