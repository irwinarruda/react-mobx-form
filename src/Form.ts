import { makeObservable, observable, action } from 'mobx';

export type Values = Record<string, string>;

export class Form<InitialData extends Record<string, any>> {
    private initialValues: InitialData;
    public values: InitialData;
    public touchedFields: (keyof InitialData)[];
    public errors: Record<keyof InitialData, string>;

    constructor({ initialValues }: { initialValues: InitialData }) {
        this.values = initialValues;
        this.initialValues = initialValues;
        makeObservable(this, {
            values: observable,
            touchedFields: observable,
            errors: observable,
            setValue: action,
            resetValues: action,
            setTouchedFields: action,
        });
    }

    public setValue(key: keyof InitialData, value: any): void {
        this.values[key] = value;
    }

    public resetValues(): void {
        this.values = { ...this.initialValues };
    }

    public setTouchedFields(key: keyof InitialData): void {
        this.touchedFields.push(key);
    }
}
