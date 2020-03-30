export default class Api {

    public request<T>(path: String, data: any): Promise<T> {
        return new Promise<T>(() => null);
    }

}