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
            console.log(data.choices[0]?.message?.content ?? '');
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
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        setGeneratedPackages("");
        setIsLoading(true);
        generatePackageMutate.mutate(data);
    };

    return (
        <div className="grid place-items-center gap-8">
            <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
                Find the best{" "}
                <span className="text-pink-600">npm packages</span> for your
                project
            </h1>
            <form
                aria-label="form for finding NPM packages"
                className="grid w-full max-w-xl gap-7"
                onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
            >
                <fieldset className="grid gap-5">
                    <label
                        htmlFor="requirement"
                        className="flex items-center gap-2.5 text-sm font-medium sm:text-base"
                    >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-500 text-xs font-bold text-white sm:text-sm">
                            1
                        </span>
                        <span className="flex-1 text-gray-50">
                            Enter your requirement
                        </span>
                    </label>
                    <textarea
                        id="requirement"
                        rows={2}
                        className="w-full rounded-md border-gray-400 bg-transparent px-4 pt-2.5 text-base text-gray-50 transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800"
                        placeholder="e.g. Time"
                        {...register("requirement")}
                        onKeyDown={(e) => {
                            if (!formState.isValid || isLoading) return;
                            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                                void handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    {formState.errors.requirement ? (
                        <p className="-mt-1.5 text-sm font-medium text-red-500">
                            {formState.errors.requirement.message}
                        </p>
                    ) : null}
                </fieldset>
                <fieldset className="grid gap-5">
                    <label
                        htmlFor="framework"
                        className="flex items-center gap-2.5 text-sm font-medium  sm:text-base"
                    >
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-500 text-xs font-bold text-white sm:text-sm">
                            2
                        </span>
                        <span className="flex-1 text-gray-50">
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
                    className="w-full"
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