import Api from "../Api";
import {ICountry, IRegion, IStatistics} from "./models";


export default class Statistics extends Api {

    private readonly urlPath: string;


    constructor(urlPath: string) {
        super();
        this.urlPath = urlPath
    }

    getStatistics(): Promise<IStatistics> {
        //return this.getFakeStatistics();
        return super.request<ICountry[]>(this.urlPath, {}).then((value) => ({countries: value}));
    }

    getFakeStatistics(): IRegion[] {
        return [
            {
                id: "1",
                longitude: "-6.8498129",
                latitude: "33.9715904",
                activeCases: 100,
                deathsCases: 33,
                recoveredCases: 20,
                label: "Casablanca"
            },
            {
                id: "2",
                longitude: "-2.9275836",
                latitude: "35.1686165",
                activeCases: 50,
                deathsCases: 33,
                recoveredCases: 20,
                label: "Rabat"
            }];
    }
}



