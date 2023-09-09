import { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/reviews" prefetch={false}>Reviews</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
        <footer>
            네이버 연결하기
            <a href="https://naver.com" target="_blank">네이버</a>
        </footer>
      </body>
    </html>
  );
}
