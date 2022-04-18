import React from 'react';
import { observer } from 'mobx-react-lite';

import { useFormContext } from 'mobx-forms';

type InputProps = React.HTMLAttributes<HTMLInputElement> & {
    name: string;
};

export const Input = observer(({ name, ...props }: InputProps) => {
    const { register } = useFormContext();
    return <input {...register(name)} {...props} />;
});
