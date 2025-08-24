export interface serializedItems{
    id: string | number,
    name: string | number,
}
export interface ICountriesTypes {
    optionList: { value: string | number; label: string | number | any; id: number|string  }[];
    serializedItems: serializedItems[];
    totalCount: number;
}
export interface IStateTypes {
    optionList: { value: string | number; label: string | number; id: number|string  }[];
    serializedItems: serializedItems[];
    totalCount: number;
}
export interface ICityTypes {
    optionList: { value: string | number; label: string | number ; id: number|string }[];
    serializedItems: serializedItems[];
    totalCount: number;
}
export interface ICountriesTypesRes {
    country_list: ICountriesTypes;
    state_list: IStateTypes;
    city_list: ICityTypes;
}
