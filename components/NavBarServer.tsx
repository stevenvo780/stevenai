import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#catalogo", label: "Proyectos" },
  { href: "/#guia", label: "Cómo leer" },
  { href: "/architecture", label: "Mapa" },
];

export default function NavBarServer() {
  return (
    <header className="dm-header">
      <div className="dm-shell dm-header-inner">
        <Link href="/" className="dm-brand" aria-label="Daímon, volver al inicio">
          <Image src="/icon-256.png" width={39} height={39} alt="" priority />
          <span className="dm-brand-name">Daímon</span>
          <span className="dm-brand-rule" aria-hidden="true" />
          <span className="dm-brand-sub">Atlas de<br />inteligencia</span>
        </Link>
        <nav className="dm-desktop-nav" aria-label="Navegación principal">
          {links.map(({ href, label }) => <Link className="dm-nav-link" key={href} href={href}>{label}</Link>)}
          <a className="dm-nav-link" data-primary href="https://www.stevenvallejo.com/es">Steven Vallejo <span aria-hidden="true">↗</span></a>
        </nav>
        <details className="dm-mobile-nav">
          <summary aria-label="Abrir menú">≡</summary>
          <nav className="dm-mobile-panel" aria-label="Navegación móvil">
            {links.map(({ href, label }) => <Link key={href} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
            <a href="https://www.stevenvallejo.com/es">Steven Vallejo <span aria-hidden="true">↗</span></a>
          </nav>
        </details>
      </div>
    </header>
  );
}
