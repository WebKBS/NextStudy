import {ReactNode} from "react";
import './globals.css';
import NavBar from "@/components/NavBar";
import {orbitron} from "@/app/fonts";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: LayoutProps) {
    return (
        <html lang="en" className={orbitron.variable}>
        <body className="flex flex-col px-4 py-2 min-h-screen bg-orange-50">
        <header>
            <NavBar/>
        </header>
        <main className="py-3 grow">{children}</main>
        <footer className="border-t py-3 text-center text-xs">
            네이버 연결하기{" "}
            <a href="https://naver.com" className="hover:underline" target="_blank">네이버</a>
        </footer>
        </body>
        </html>
    );
}
