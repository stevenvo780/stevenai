export default function HonestNote() {
  return (
    <div
      className="rounded-lg px-4 py-3 text-sm"
      style={{
        // Fallback colors for browsers that don't support color-mix()
        background: "rgba(26, 18, 8, 0.6)",
        border: "1px solid rgba(207, 106, 60, 0.4)",
        color: "var(--accent)",
        // Use @supports in CSS would be ideal, but inline style doesn't support it.
        // These are safe rgba approximations of the color-mix values.
      }}
    >
      <span className="font-semibold" style={{ color: "var(--accent)" }}>
        Nota honesta:
      </span>{" "}
      <span style={{ color: "var(--text-muted)" }}>
        Este proyecto requiere hardware local con GPU para la demo. El catálogo muestra su código y
        documentación, pero todavía no aloja una demo pública. Consulta los requisitos de esta ficha
        y su repositorio antes de instalarlo.
      </span>
    </div>
  );
}
