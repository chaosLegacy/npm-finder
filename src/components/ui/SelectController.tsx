'use client';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import Select from './Select';

type SelectControllerProps<TFieldValues extends FieldValues, TContext = unknown> = {
    control: Control<TFieldValues, TContext>;
    name: Path<TFieldValues>;
    options: PathValue<TFieldValues, Path<TFieldValues>>[];
    className?: string;
};

const SelectController = <TFieldValues extends FieldValues>({
    control,
    name,
    options,
    className,
}: SelectControllerProps<TFieldValues>) => {
    const initialSelected = options[0];
    // const [selected, setSelected] = useState<PathValue<TFieldValues, Path<TFieldValues>>>(initialSelected);
    const [selected, setSelected] = useState(initialSelected as string);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Select
                    options={options}
                    selected={value ?? selected}
                    className={className}
                    setSelected={(val) => {
                        onChange(val);
                        setSelected(val);
                    }}
                />
            )}
        />
    );
};

export default SelectController;
