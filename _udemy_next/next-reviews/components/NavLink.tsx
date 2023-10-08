"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
  prefetch,
}: {
  children: any;
  href: string;
  prefetch?: boolean;
}) {
  const pathname = usePathname();

  if (href === pathname) {
    return <span className="text-orange-800">{children}</span>;
  }

  console.log("pathname: ", pathname);
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-orange-800 hover:underline"
    >
      {children}
    </Link>
  );
}
