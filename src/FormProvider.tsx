import React from 'react';

import { UseFormReturn } from './useForm';

type FormContextProps<InitialData extends Record<string, any>> =
    UseFormReturn<InitialData>;

type FormProviderProps<InitialData extends Record<string, any>> =
    UseFormReturn<InitialData> & {
        children: React.ReactNode;
    };

export const FormContext = React.createContext(
    {} as FormContextProps<Record<string, any>>,
);

export const FormProvider = <InitialData extends Record<string, any>>({
    children,
    ...props
}: FormProviderProps<InitialData>) => {
    return (
        <FormContext.Provider value={props}>{children}</FormContext.Provider>
    );
};

export const useFormContext = <InitialData extends Record<string, any>>() => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext should be used within a provider');
    }
    return context as FormContextProps<InitialData>;
};
