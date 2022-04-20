import React from 'react';
import { toJS } from 'mobx';
import { Form } from './Form';

export type UseFormParams<InitialData extends Record<string, any>> = {
    initialValues: InitialData;
};

export type UseFormReturn<InitialData extends Record<string, any>> = {
    values: InitialData;
    register: (key: keyof InitialData) => {
        name: string;
        value: InitialData[keyof InitialData];
        onChange: (event: string | React.ChangeEvent<HTMLInputElement>) => void;
    };
    onSubmit: (
        callback: (data: InitialData) => void,
    ) => (event: React.FormEvent<HTMLFormElement>) => void;
};

export const useForm = <InitialData extends Record<string, any>>({
    initialValues,
}: UseFormParams<InitialData>) => {
    const form = React.useRef(new Form<InitialData>({ initialValues }));

    const onSubmit = (callback: (data: InitialData) => void) => {
        return (event?: React.FormEvent<HTMLFormElement>) => {
            if (event) {
                event.preventDefault();
            }
            callback(toJS(form.current.values));
        };
    };

    const onChange = (key: keyof InitialData) => {
        return (event: string | React.ChangeEvent<HTMLInputElement>) => {
            if (typeof event === 'string') {
                form.current.setValue(key, event);
            } else {
                const { type, value } = (event.target ||
                    event.currentTarget) as HTMLInputElement;
                let parsed;
                // taken from formik
                const val = /number|range/.test(type)
                    ? ((parsed = parseFloat(value)),
                      isNaN(parsed) ? '' : parsed)
                    : value;
                form.current.setValue(key as any, val);
            }
        };
    };

    const onBlur = (key: keyof InitialData) => {
        return (_: React.FocusEvent<HTMLInputElement>) => {
            form.current.setTouchedFields(key);
        };
    };

    const register = (key: keyof InitialData) => {
        return {
            name: key,
            value: form.current.values[key],
            onChange: onChange(key),
            onBlur: onBlur(key),
        };
    };

    const reset = () => {
        form.current.resetValues();
    };

    return {
        values: form.current.values,
        register,
        onSubmit,
    };
};
