import apiCall from 'axios';

export default class Api {

    public request<T>(path: string, data: any, method: 'GET' | 'POST' = 'GET'): Promise<T> {
        return apiCall.request<T, any>({
            method: method,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(data),
            url: path,
        }).then(value => value.data);
    }

}