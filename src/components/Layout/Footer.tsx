import Link from 'next/link';
import React from 'react'
import { Icons } from '../Icons';


const Footer = () => {
    return (
        <footer className="footer xs:flex-col items-center gap-6 md:justify-between xs:justify-items-center  px-4 py-3 bg-base-100">
            <aside className="flex items-center">
                <Link href='/'>
                    <Icons.logo className="h-8 w-8" aria-hidden="true" />
                </Link>
                <p>Copyright © 2024 - All right reserved</p>
            </aside>
            <nav className='flex items-end'>
                Powered by{" "}
                <Link
                    aria-label="navigate to groq"
                    href="https://groq.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="link link-hover text-gray-300 font-semibold"
                >
                    OpenAI
                </Link>
                {"and "}
                <Link
                    aria-label="navigate to vercel"
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="link link-hover text-gray-300 font-semibold"
                >
                    Vercel
                </Link>
            </nav>
        </footer>
    )
}

export default Footer;