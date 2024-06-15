'use client';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import Select from './Select';

type SelectControllerProps<TFieldValues extends FieldValues, TContext = unknown> = {
    control: Control<TFieldValues, TContext>;
    name: Path<TFieldValues>;
    options: PathValue<TFieldValues, Path<TFieldValues>>[];
};

const SelectController = <TFieldValues extends FieldValues>({
    control,
    name,
    options,
}: SelectControllerProps<TFieldValues>) => {
    const initialSelected = options[0];
    // const [selected, setSelected] = useState<PathValue<TFieldValues, Path<TFieldValues>>>(initialSelected);
    const [selected, setSelected] = useState(initialSelected as string);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className="w-full max-w-xs">
                    <Select
                        options={options}
                        selected={value ?? selected}
                        setSelected={(val) => {
                            onChange(val);
                            setSelected(val);
                        }}
                    />
                </div>
            )}
        />
    );
};

export default SelectController;
