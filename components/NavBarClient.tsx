"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Suite" },
  { href: "/components/jarvis-v1", label: "Jarvis v1" },
  { href: "/components/jarvis-v2", label: "Jarvis v2" },
  { href: "/components/ia-gguf", label: "Chat IA GGUF" },
  { href: "/components/mcp-swarm", label: "MCP Swarm" },
  { href: "/components/mcp-agents", label: "MCP Agents" },
  { href: "/components/pdf-converter", label: "PDF Converter" },
  { href: "/architecture", label: "Arquitectura" },
];

export default function NavBarClient() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto">
        {/* Wordmark: lemniscata + "Steven Vallejo" → portal principal */}
        <a
          href="https://www.stevenvallejo.com"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Steven Vallejo — portal principal"
        >
          <Image
            src="/favicon.svg"
            alt="Steven Vallejo"
            width={26}
            height={26}
            className="w-[26px] h-[26px]"
          />
          <span className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--teal-light)] transition-colors hidden sm:block">
            Steven Vallejo
          </span>
        </a>
        {/* Separador */}
        <span className="text-[var(--card-border)] text-lg hidden sm:block" aria-hidden="true">|</span>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-[var(--teal-light)] font-bold text-lg tracking-tight">
            Steven<span className="text-[var(--gold-light)]">AI</span>
          </span>
          <span className="text-[var(--muted)] text-xs hidden sm:block">Suite</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "bg-[var(--surface-2)] text-[var(--primary)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://github.com/stevenvo780"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
