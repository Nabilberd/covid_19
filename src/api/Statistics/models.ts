export interface IRegion {
    id: string;
    longitude: string;
    latitude: string;
    activeCases: number;
    deathsCases: number;
    recoveredCases: number;
    label: string;
}

export interface IStatistics {
    countries: ICountry[];
}

export interface ICountry {
    idCountry: string;
    label: string;
    lastModifiedDate: Date;
    totalActive: number;
    totalDied: number;
    totalRecovered: number;
    totalExclus: number;
    regions: IRegion[];
}
