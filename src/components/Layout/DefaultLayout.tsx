import React from 'react'
import { Header, Footer } from '@/components/Layout';
import { TRPCReactProvider } from '@/trpc/react';
import { ToastWrapper } from '@/components/ui';
import { AppProvider } from '@/context';

type DefaultLayoutProps = {
    children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <TRPCReactProvider>
            <AppProvider>
                <div className="flex flex-col bg-base-200">
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
                <ToastWrapper />
            </AppProvider>
        </TRPCReactProvider>
    )
}

export default DefaultLayout;