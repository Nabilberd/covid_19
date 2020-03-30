import Statistics from "./Statistics";
import {apis} from "../config";

export class Client {
    private static client: Client;
    public statistics: Statistics;
    private config: any;

    private constructor(config: any) {
        this.config = config;
        this.statistics = new Statistics(config.statistics);
    }

    public static getInstance() {
        if (Client.client === undefined) {
            Client.client = new Client(apis);
        }
        return Client.client;
    }

}