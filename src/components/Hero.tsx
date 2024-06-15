import Link from 'next/link';
import React from 'react'
import { Icons } from './Icons';


const Hero = () => {
    return (
        <div className="hero h-[calc(100vh-7.6rem)]">
            <div className="hero-content flex-col gap-8 text-center">
                <h1 className="max-w-2xl md:text-5xl sm:text-4xl text-3xl font-bold leading-tight text-gray-100">
                    Find the best{" "}
                    <span className="text-primary underline">npm packages</span> for your
                    project
                </h1>

                <p className="h1 p-8 max-w-xl text-xl m-auto md:px-0">
                    Npm finder is an AI package finder that uses groq to generate a list of
                    packages that match your prompt.
                </p>

                <div className="flex justify-center gap-8">

                    <Link
                        aria-label="navigate to npm-finder"
                        href="/generate"
                        className="btn btn-primary sm:btn-lg"
                    >
                        <Icons.logo className="h-5 w-5" aria-hidden="true" />
                        <span className="">
                            Go to App
                        </span>
                    </Link>

                    <Link
                        aria-label="navigate to groq"
                        href="https://groq.com/"
                        rel="noreferrer"
                        target="_blank"
                        className="btn btn-outline btn-primary sm:btn-lg">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;