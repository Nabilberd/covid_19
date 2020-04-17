import Statistics from "./Statistics";
import Mail from "./Mail";
import {apis} from "../config";

interface IConfig {
    statistics: string
    mail: string;
}
export class Client {
    private static client: Client;
    public statistics: Statistics;
    public mail: Mail;
    private config: IConfig;

    private constructor(config: any) {
        this.config = config;
        this.statistics = new Statistics(config.statistics);
        this.mail = new Mail(config.mail);
    }

    public static getInstance() {
        if (Client.client === undefined) {
            Client.client = new Client(apis);
        }
        return Client.client;
    }

}