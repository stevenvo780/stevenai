"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#guia", label: "Guía" },
  { href: "/architecture", label: "Mapa" },
];

export default function NavBarClient() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-5 gap-y-2">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Daímon, inicio">
          <Image src="/icon-256.png" alt="" width={34} height={34} className="w-[34px] h-[34px]" />
          <span className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--teal-light)] transition-colors">Daímon</span>
        </Link>
        <a href="https://www.stevenvallejo.com/es"
          className="sm:order-3 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Portal de Steven ↗</a>
        <nav className="order-3 sm:order-2 w-full sm:w-auto flex items-center gap-1" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              aria-current={pathname === "/architecture" && link.href === "/architecture" ? "page" : undefined}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] ${
                pathname === "/architecture" && link.href === "/architecture"
                  ? "bg-[var(--surface-2)] text-[var(--teal-light)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
