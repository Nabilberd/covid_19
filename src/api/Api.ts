import apiCall from 'axios';

export default class Api {

    public request<T>(path: string, data: any): Promise<T> {
        return apiCall.get<T, any>(path).then(value => value.data);
    }

}