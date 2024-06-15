import { toTitleCase } from "@/utils/functions";
import { type SetStateAction, type Dispatch } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

type SelectProps<T extends string> = {
    options: T[];
    selected: T;
    setSelected: Dispatch<SetStateAction<T>>;
} & React.HTMLAttributes<HTMLDivElement>;

const Select = <T extends string>({
    options,
    selected,
    setSelected,
    className,
    ...props
}: SelectProps<T>) => {
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        <div className={twMerge("relative w-full max-w-xs", className)} {...props}>
            <select
                className="select select-bordered w-full"
                value={selected}
                onChange={(e) => setSelected(e.target.value as T)}
            >
                <option disabled value="">
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {toTitleCase(option)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
