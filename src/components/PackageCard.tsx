'use client'
import { type Package } from "@/types";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { ContentLoading } from "./ui";
import { Calendar, Download, File } from "lucide-react";
import dayjs from "dayjs";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";

type PackageCardProps = {
    data: string;
    isDone: boolean;
}
const PackageCard = ({ data, isDone }: PackageCardProps) => {
    const formattedPkg = data.replace(/[0-9]+. /, "").trim();
    const [name, description] = formattedPkg.split(": ");
    const [pkgData, setPkgData] = useState<Package>({
        name: "",
        downloads: "",
        lastPublish: "",
        repository: "",
        unpackedSize: "",
    });

    const packageMutate = api.package.getPackage.useMutation({
        onSuccess: (data) => {
            setPkgData(data);
        },
        onError: (error: TRPCClientErrorLike<AppRouter>) => {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    useEffect(() => {
        if (!isDone) return;
        packageMutate.mutate({ name });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, isDone]);

    return (
        <div className="grid w-full gap-1.5 rounded-md bg-pink-500/20 px-5 pt-2.5 pb-4 shadow-lg backdrop-blur-sm backdrop-filter">
            <div className="flex flex-col justify-between gap-2 xxs:flex-row sm:items-center">
                <h2 className="text-lg font-bold capitalize text-pink-50 sm:text-xl">
                    {name}
                </h2>
                <div className="flex items-center gap-2.5">
                    {isDone && pkgData.repository ? (
                        <a
                            href={`https://${pkgData.repository ?? "github.com"}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-pink-300 transition-colors hover:text-gray-50 active:scale-95"
                        >
                            <Icons.gitHub className="h-4 w-4" />
                            <span className="sr-only">View on GitHub</span>
                        </a>
                    ) : (
                        <ContentLoading srText="loading github icon" variant="circle" />
                    )}
                    <a
                        href={`https://www.npmjs.com/package/${name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-300 transition-colors hover:text-gray-50 active:scale-95"
                    >
                        <Icons.npm className="h-8 w-8" />
                        <span className="sr-only">View on npm</span>
                    </a>
                </div>
            </div>
            <p className="text-sm text-white-100 sm:text-base">{description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
                {isDone && pkgData.downloads ? (
                    <div className="flex items-center gap-1.5">
                        <Download className="h-4 w-4 text-pink-200" />
                        <span className="text-sm font-medium text-pink-100">
                            {pkgData.downloads ?? "N/A"}
                        </span>
                        <span className="sr-only">downloads</span>
                    </div>
                ) : (
                    <ContentLoading srText="loading downloads" />
                )}
                {isDone && pkgData.lastPublish ? (
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-pink-200" />
                        <span className="text-sm font-medium text-pink-100">
                            {dayjs(pkgData.lastPublish).format("MMM D, YYYY") ?? " N/A"}
                        </span>
                        <span className="sr-only">last publish</span>
                    </div>
                ) : (
                    <ContentLoading srText="loading last publish" />
                )}
                {isDone && pkgData.unpackedSize ? (
                    <div className="flex items-center gap-1.5">
                        <File className="h-4 w-4 text-pink-200" />
                        <span className="text-sm font-medium text-pink-100">
                            {pkgData.unpackedSize ?? "N/A"}
                        </span>
                        <span className="sr-only">unpacked size</span>
                    </div>
                ) : (
                    <ContentLoading srText="loading unpacked size" />
                )}
            </div>
        </div>
    );
};

export default PackageCard;