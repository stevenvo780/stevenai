"use client";

import Link from "next/link";
import { useRef } from "react";

type NavLink = { href: string; label: string };

export default function MobileNav({ links }: { links: NavLink[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details className="dm-mobile-nav" ref={detailsRef}>
      <summary aria-label="Menú">≡</summary>
      <nav className="dm-mobile-panel" aria-label="Navegación móvil">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={closeMenu}>
            {label}<span aria-hidden="true">↗</span>
          </Link>
        ))}
        <a href="https://www.stevenvallejo.com/es" onClick={closeMenu}>
          Steven Vallejo <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </details>
  );
}
