import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="dm-footer">
      <div className="dm-shell">
        <div className="dm-footer-top">
          <div>
            <p className="dm-footer-kicker">Mouseîon / Informática / IA</p>
            <p className="dm-footer-title" aria-hidden="true">Daímon.</p>
            <p className="dm-footer-text">Una colección documentada de sistemas, agentes y experimentos de inteligencia artificial. Cada ficha distingue lo publicado, lo local y lo que sigue en desarrollo.</p>
          </div>
          <div className="dm-footer-links">
            <nav aria-label="Explorar Daímon">
              <h2>Explorar</h2>
              <Link href="/#catalogo">Catálogo</Link>
              <Link href="/#guia">Guía de lectura</Link>
              <Link href="/architecture">Mapa de proyectos</Link>
            </nav>
            <nav aria-label="Steven y Mouseîon">
              <h2>Conectar</h2>
              <a href="https://www.stevenvallejo.com/es">Steven Vallejo ↗</a>
              <a href="https://github.com/stevenvo780">GitHub ↗</a>
              <a href="https://paideia.stevenvallejo.com">Paideía ↗</a>
              <a href="https://kosmos.stevenvallejo.com">Kósmos ↗</a>
            </nav>
          </div>
        </div>
        <div className="dm-footer-bottom">
          <span>© {new Date().getFullYear()} Steven Vallejo · Mouseîon</span>
          <span>Hecho para explorar con criterio.</span>
        </div>
      </div>
    </footer>
  );
}
