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
        Los componentes marcados como &ldquo;Demo GPU pendiente&rdquo; corren en hardware local (RTX
        2060 / RTX 5070 Ti) y requieren VRAM dedicada para funcionar. Hostear inferencia GPU en la
        nube a costo razonable esta pendiente. El código fuente de cada componente está disponible en
        GitHub.
      </span>
    </div>
  );
}
