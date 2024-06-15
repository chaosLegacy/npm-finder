'use client'
import React, { useEffect, useState } from 'react'
import { PackageForm, PackageList } from '@/components';
import { useAppContext } from '@/context';
import { DURATION, type PackageData } from '@/types';
import { getChartData } from '@/utils/functions';
import { type ChartData } from 'chart.js';
import { toast } from "react-hot-toast";


const Generate = () => {
    const { generatedPackages, isChartView } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [duration, setDuration] = useState<DURATION>(DURATION.LAST_YEAR);
    const [isLoadingChartData, setIsLoadingChartData] = useState(false);
    const [chartData, setChartData] = useState<ChartData<"line">>({
        labels: [],
        datasets: [],
    });
    useEffect(() => {
        if (!generatedPackages || !isDone) return;
        setIsLoadingChartData(true);
        const fetchPkgDownloads = async () => {
            try {
                if (!generatedPackages || !isDone) return;
                const pkgNames = generatedPackages.split("\n").map((pkg) => {
                    const formattedPkg = pkg.replace(/[0-9]+. /, "").trim();
                    const [name, _] = formattedPkg.split(": ");
                    return name;
                });
                const pkgDownloads = Promise.all(
                    pkgNames.map(async (pkgName) => {
                        const response = await fetch(
                            `https://api.npmjs.org/downloads/range/${duration}/${pkgName}`
                        );
                        const data = (await response.json()) as PackageData;
                        return data;
                    })
                );

                const pkgDownloadsData = await pkgDownloads;
                if (!pkgDownloadsData) return;
                const chartedData = getChartData(pkgDownloadsData, duration);
                setChartData(chartedData);
                setIsLoadingChartData(false);
            } catch (error) {
                error instanceof Error
                    ? toast.error(error.message)
                    : toast.error("Something went wrong");
                setIsLoadingChartData(false);
            }
        };
        void (isChartView && fetchPkgDownloads());
    }, [generatedPackages, isDone, isChartView, duration]);

    return (
        <main className="hero py-4">
            <div className="hero-content">
                {generatedPackages ? (
                    <PackageList
                        generatedPackages={generatedPackages}
                        chartData={chartData}
                        isLoadingChartData={isLoadingChartData}
                        isLoading={isLoading}
                        isDone={isDone}
                        duration={duration}
                        setDuration={setDuration}
                    />
                ) : (
                    <PackageForm
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setIsDone={setIsDone}
                    />
                )}
            </div>
        </main>
    )
}
export default Generate;