import { makeAutoObservable, toJS } from 'mobx';

export type Values = Record<string, string>;

export class Form<InitialData extends Record<string, any>> {
    public values: InitialData;

    constructor({ initialValues }: { initialValues: InitialData }) {
        this.values = initialValues;
        makeAutoObservable(this);
    }

    public onChange(key: keyof InitialData, value: any) {
        this.values[key] = value;
    }

    public setValue(key: keyof InitialData, value: any): void {
        this.values[key] = value;
    }
}
