export default function HonestNote() {
  return (
    <div
      className="rounded-lg px-4 py-3 text-sm"
      style={{
        background: "color-mix(in srgb, var(--on-accent) 60%, transparent)",
        border: "1px solid color-mix(in srgb, var(--accent-strong) 40%, transparent)",
        color: "var(--accent)",
      }}
    >
      <span className="font-semibold" style={{ color: "var(--accent)" }}>
        Nota honesta:
      </span>{" "}
      <span style={{ color: "var(--text-muted)" }}>
        Los componentes marcados como &ldquo;Demo GPU pendiente&rdquo; corren en hardware local (RTX
        2060 / RTX 5070 Ti) y requieren VRAM dedicada para funcionar. Hostear inferencia GPU en la
        nube a costo razonable esta pendiente. El codigo fuente de cada componente esta disponible en
        GitHub.
      </span>
    </div>
  );
}
