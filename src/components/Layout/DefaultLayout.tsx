import React from 'react'
import Footer from './Footer';
import { TRPCReactProvider } from '@/trpc/react';
import Header from './Header';

type DefaultLayoutProps = {
    children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <TRPCReactProvider>
            <div className="flex flex-col bg-base-200">
                <Header />
                <div className="flex-1">{children}</div>
                <Footer />
            </div>
        </TRPCReactProvider>
    )
}

export default DefaultLayout;