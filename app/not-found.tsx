import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-[var(--foreground)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[var(--muted)] mb-6">
        Página no encontrada
      </h2>
      <p className="text-[var(--muted)] mb-8 max-w-lg mx-auto">
        La página que buscas no existe o ha sido movida. Revisa la URL e intenta nuevamente,
        o regresa al inicio.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-lg font-semibold text-white gradient-teal hover:opacity-90 transition-opacity"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
