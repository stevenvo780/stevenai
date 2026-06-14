export default function HonestNote() {
  return (
    <div className="border border-yellow-700/40 bg-yellow-950/20 rounded-lg px-4 py-3 text-sm text-yellow-300/80">
      <span className="font-semibold text-yellow-400">Nota honesta:</span> Los componentes marcados
      como &ldquo;Demo GPU pendiente&rdquo; corren en hardware local (RTX 2060 / RTX 5070 Ti) y
      requieren VRAM dedicada para funcionar. Hostear inferencia GPU en la nube a costo razonable
      esta pendiente. El codigo fuente de cada componente esta disponible en GitHub.
    </div>
  );
}
