import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '@/context';
import { DURATION } from '@/types';
import { useWindowSize } from '@/hooks';
import { type ChartData, type Point } from 'chart.js';
import { Button, Select, Toggle } from './ui';
import { LineChart, PackageCard } from '@/components';

type Props = {
    generatedPackages: string,
    chartData: ChartData<"line", (number | Point | null)[], unknown>,
    isLoadingChartData: boolean,
    isLoading: boolean,
    isDone: boolean,
    duration: DURATION,
    setDuration: React.Dispatch<React.SetStateAction<DURATION>>
}

const PackageList = ({
    generatedPackages,
    chartData,
    isLoadingChartData,
    isLoading,
    isDone,
    duration,
    setDuration
}: Props) => {
    const durations = Object.values(DURATION);
    const size = useWindowSize();

    const { setGeneratedPackages, isChartView, setIsChartView } = useAppContext();
    return (
        <div className="flex flex-col gap-10">
            <h1 className="max-w-2xl text-center text-5xl font-bold leading-tight">
                Here are your packages
            </h1>
            <div className="grid w-full place-items-center gap-8">
                <div className="grid place-items-center gap-5">
                    <Button
                        aria-label="Search again"
                        className="btn-primary"
                        onClick={() => {
                            setGeneratedPackages("");
                            setIsChartView(false);
                        }}
                        disabled={isLoading || !isDone}
                    >
                        Search again
                    </Button>
                    <Toggle
                        enabled={isChartView}
                        setEnabled={setIsChartView}
                        enabledLabel="Chart view"
                        disabledLabel="List view"
                        disabled={isLoading || !isDone}
                    />
                </div>
                <AnimatePresence mode="wait">
                    {isChartView ? (
                        isLoadingChartData ? (
                            <div
                                aria-label="Loading chart"
                                className="flex h-96 w-full items-center justify-center"
                            >
                                <Loader2
                                    className="mr-2 h-24 w-24 animate-spin stroke-1"
                                    aria-hidden="true"
                                />
                            </div>
                        ) : (
                            <motion.div
                                className="grid w-full max-w-6xl place-items-center gap-5"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold leading-tight text-gray-50 sm:text-3xl sm:leading-tight">
                                    Downloads chart
                                </h2>
                                <Select
                                    selected={duration}
                                    setSelected={setDuration}
                                    options={durations}
                                    className="w-full xs:max-w-xs"
                                />
                                <div className="w-full overflow-x-auto">
                                    <div className="w-full min-w-[480px]">
                                        <LineChart
                                            data={chartData}
                                            windowWidth={size.width}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="grid w-full max-w-2xl gap-2"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {generatedPackages.split("\n").map((pkg) => (
                                    <PackageCard
                                        key={crypto.randomUUID()}
                                        data={pkg}
                                        isDone={isDone}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default PackageList;