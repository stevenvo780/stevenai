"use client";
import dynamic from "next/dynamic";

// NavBarClient uses usePathname (client-only hook) and next/link.
// Wrapping in a "use client" dynamic import prevents SSR crash during prerender.
const NavBarClient = dynamic(() => import("./NavBarClient"), {
  ssr: false,
  loading: () => (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/90 h-[53px]" />
  ),
});

export default function NavBarServer() {
  return <NavBarClient />;
}
