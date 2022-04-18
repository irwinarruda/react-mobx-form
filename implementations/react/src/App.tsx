import React from 'react';
import { observer } from 'mobx-react-lite';

import { FormProvider, useFormContext, useForm } from 'mobx-forms';

import { Input } from './components/Input';

type FormData = { email: string; password: string };

export const AppComponent = observer(() => {
    const { onSubmit } = useFormContext<FormData>();

    const handleSubmit = (data: any) => {
        console.log('fields', data);
    };

    return (
        <form
            onSubmit={onSubmit(handleSubmit)}
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
            }}
        >
            <h1>Hello World</h1>
            <Input name="email" />
            <Input name="password" />
            <button type="submit">Click Here</button>
        </form>
    );
});

export const App = observer(() => {
    const methods = useForm({ initialValues: { email: '', password: '' } });
    return (
        <FormProvider {...methods}>
            <AppComponent />
        </FormProvider>
    );
});
