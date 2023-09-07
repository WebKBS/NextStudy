import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>HEADER</header>
        <main>{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
