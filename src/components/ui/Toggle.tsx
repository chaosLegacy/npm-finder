import { type Dispatch, type SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
    enabled: boolean;
    setEnabled: Dispatch<SetStateAction<boolean>>;
    disabled?: boolean;
    enabledLabel?: string;
    disabledLabel?: string;
};

const Toggle = ({
    enabled,
    setEnabled,
    disabled = false,
    enabledLabel,
    disabledLabel,
}: ToggleProps) => {
    return (
        <div className="flex items-center">
            {disabledLabel && (
                <span
                    className={twMerge(
                        "mr-3 cursor-default",
                        "text-sm font-medium",
                        !enabled ? "text-white" : "text-gray-500"
                    )}
                >
                    {disabledLabel}
                </span>
            )}
            <input
                type="checkbox"
                className={twMerge("toggle", enabled ? "bg-pink-700" : "bg-pink-400")}
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
                disabled={disabled}
            />
            {enabledLabel && (
                <span
                    className={twMerge(
                        "ml-3 cursor-default",
                        "text-sm font-medium",
                        enabled ? "text-white" : "text-gray-500"
                    )}
                >
                    {enabledLabel}
                </span>
            )}
        </div>
    );
};

export default Toggle;
