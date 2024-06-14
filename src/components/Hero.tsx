import Link from 'next/link';
import React from 'react'
import { Icons } from './Icons';


const Hero = () => {
  return (
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-justify">
              <div className="max-w-md">
                  <h1 className="max-w-5xl text-center text-5xl font-bold leading-tight">
                      Find the best{" "}
                      <span className="text-primary underline">npm packages</span> for your
                      project
                  </h1>

                  <p className="h1 p-8 max-w-xl text-xl m-auto md:px-0 text-neutral-content">
                      Npm finder is an AI package finder that uses groq to generate a list of
                      packages that match your prompt.
                  </p>

                  <div className="flex justify-center gap-8">

                      <Link
                          href="/generate"
                          aria-label="navigate to github repo"
                          className="btn btn-primary sm:btn-sm md:btn-md "
                      >
                          <Icons.logo className="h-5 w-5" aria-hidden="true" />
                          <span className="">
                              Go to App
                          </span>
                      </Link>

                      <Link
                          href="https://groq.com/"
                          rel="noreferrer"
                          target="_blank"
                          className="btn btn-outline btn-primary sm:btn-sm md:btn-md ">
                          Learn More
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Hero;