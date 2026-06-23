"use client";
import Link from "next/link";
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
        {/* Wordmark: lemniscata cuadrada + "Daímon" + tag Mouseîon → portal principal */}
        <a
          href="https://www.stevenvallejo.com"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Mouseîon — portal principal de Steven Vallejo"
        >
          <img
            src="/icon-256.png"
            alt="Daímon"
            width={40}
            height={40}
            style={{ width: 40, height: 40, objectFit: "contain" }}
            className="w-[40px] h-[40px]"
          />
          <span className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--teal-light)] transition-colors hidden sm:block">
            Daímon
          </span>
          <span className="text-[var(--muted)] text-[10px] hidden sm:block leading-none">Mouseîon</span>
        </a>
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
