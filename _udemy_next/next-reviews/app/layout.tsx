import {ReactNode} from "react";
import './globals.css';
import NavBar from "@/components/NavBar";
import {exo2, orbitron} from "@/app/fonts";

interface LayoutProps {
    children: ReactNode;
}

// 부분적으로 메타데이터 타이틀 설정하는 방법
export const metadata = {
    title: {
        default: "Indie Game",
        template: "%s | Indie Gamer"
    },
    description: "This game description"
}

export default function RootLayout({children}: LayoutProps) {
    return (
        <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
        <body className="flex flex-col px-4 py-2 min-h-screen bg-orange-50">
        <header>
            <NavBar/>
        </header>
        <main className="py-3 grow">{children}</main>
        <footer className="border-t py-3 text-slate-500 text-center text-xs">
            네이버 연결하기{" "}
            <a href="https://naver.com"
               className="hover:underline text-orange-800"
               target="_blank">네이버</a>
        </footer>
        </body>
        </html>
    );
}
