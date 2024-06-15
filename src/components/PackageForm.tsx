import React from 'react'
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FRAMEWORK } from '@/types';
import { useAppContext } from '@/context';
import { api } from '@/trpc/react';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type AppRouter } from '@/server/api/root';
import toast from 'react-hot-toast';
import { Button, SelectController } from './ui';
import { twMerge } from 'tailwind-merge';

type Props = {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>,
}

const schema = z.object({
    requirement: z.string().min(1, { message: "Please enter your requirement" }),
    framework: z.nativeEnum(FRAMEWORK).default(FRAMEWORK.NOT_SPECIFIED),
});
const frameworks = Object.values(FRAMEWORK);
type Inputs = z.infer<typeof schema>;

const PackageForm = ({ isLoading, setIsLoading, setIsDone }: Props) => {
    const { setGeneratedPackages } = useAppContext();
    const { register, handleSubmit, formState, control, reset } = useForm<Inputs>(
        { resolver: zodResolver(schema) }
    );
    const generatePackageMutate = api.generate.package.useMutation({
        onSuccess: async (data) => {
            setGeneratedPackages(data.choices[0]?.message?.content ?? '');
            setIsDone(true);
            reset();
            setIsLoading(false);
        },
        onError: (error: TRPCClientErrorLike<AppRouter>) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
            setIsDone(true);
            setIsLoading(false);
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        setGeneratedPackages("");
        setIsLoading(true);
        generatePackageMutate.mutate(data);
    };

    return (
        <div className='flex flex-col gap-10'>
            <h1 className="max-w-lg text-center text-4xl font-bold leading-tight">
                Find the best{" "}
                <span className="text-primary underline">npm packages</span> for your
                project
            </h1>
            <form
                aria-label="form for finding NPM packages"
                className="flex flex-col gap-8"
                onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
            >
                <fieldset className="grid gap-5 relative">
                    <label
                        htmlFor="requirement"
                        className="flex items-center gap-2 text-sm font-medium sm:text-base">
                        <span className="indicator-item badge badge-primary h-7 w-7">1</span> 
                        <span>
                            Enter your requirement
                        </span>
                    </label>
                    <textarea
                        id="requirement"
                        rows={2}
                        className={twMerge(
                            'w-full rounded-md textarea textarea-lg resize-none',
                            formState.errors.requirement ? 'textarea-error' : 'textarea-bordered'
                        )}
                        placeholder="e.g. DatePicker"
                        {...register("requirement")}
                        onKeyDown={(e) => {
                            if (!formState.isValid || isLoading) return;
                            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                                void handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    {formState.errors.requirement ? (
                        <p className="-mt-1.5 text-sm font-medium text-red-500 absolute bottom-2 left-6">
                            {formState.errors.requirement.message}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className="grid gap-5">
                    <label
                        htmlFor="framework"
                        className="flex items-center gap-2 text-sm font-medium sm:text-base">
                        <span className="indicator-item badge badge-primary h-7 w-7">2</span> 
                        <span>
                            Select your framework
                        </span>
                    </label>
                    <SelectController
                        control={control}
                        name="framework"
                        options={frameworks}
                    />
                    {formState.errors.framework ? (
                        <p className="-mt-1.5 text-sm font-medium text-red-500">
                            {formState.errors.framework.message}
                        </p>
                    ) : null}
                </fieldset>
                <Button
                    aria-label="Find packages"
                    className="btn-primary "
                    isLoading={isLoading}
                    disabled={isLoading}
                >
                    Find packages
                </Button>
            </form>
        </div>
    )
}
export default PackageForm;