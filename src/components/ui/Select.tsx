'use client';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

type DropdownSelectProps<TFieldValues extends FieldValues, TContext = unknown> = {
    control: Control<TFieldValues, TContext>;
    name: Path<TFieldValues>;
    options: PathValue<TFieldValues, Path<TFieldValues>>[];
};

const Select = <TFieldValues extends FieldValues>({
    control,
    name,
    options,
}: DropdownSelectProps<TFieldValues>) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className="w-full max-w-xs">
                    <select
                        className="select select-bordered w-full"
                        value={value ?? selected}
                        onChange={(e) => {
                            const val = e.target.value as PathValue<TFieldValues, Path<TFieldValues>>;
                            onChange(val);
                            setSelected(val);
                        }}
                    >
                        <option disabled value="">
                            Select an option
                        </option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        />
    );
};

export default Select;
