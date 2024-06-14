import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { DefaultLayout } from "@/components/Layout";

export const metadata = {
  title: "Npm Finder app",
  description: "Find the write npm package for your app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['React', 'Next.js', 'Vue.js', 'Svelte', 'Angular', 'Express']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} data-theme="dark">
      <body>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
