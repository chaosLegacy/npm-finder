import Link from 'next/link';
import React from 'react'
import { Icons } from '../Icons';

const Header = () => {
    return (
        <header
            aria-label="header"
            className='navbar'
        >
            <nav className="w-full flex  items-center justify-between px-4">
                <Link
                    aria-label="navigate to home page"
                    href="/"
                    className="flex items-center gap-2 text-white transition-colors hover:text-gray-100"
                >
                    <Icons.logo className="h-6 w-6" aria-hidden="true" />
                    <span className="text-xl font-medium">npm Finder</span>
                </Link>
                <a
                    aria-label="navigate to github repo"
                    href="https://github.com/chaoslegacy/npm-finder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 btn btn-outline btn-primary btn-sm"
                >
                    <Icons.gitHub className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only text-xs text-gray-100 xxs:not-sr-only sm:text-sm">
                        Star on Github
                    </span>
                </a>
            </nav>
        </header>
    )
}

export default Header;