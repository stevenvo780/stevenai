# Daímon

Catálogo de proyectos de inteligencia artificial de Steven Vallejo. La versión pública está en [daimon.stevenvallejo.com](https://daimon.stevenvallejo.com).

Cada ficha explica propósito, estado, requisitos, arquitectura y acceso a su fuente. La mayoría enlaza a un repositorio público; Talos figura como referencia de acceso privado. Ágora AI Agent es un módulo documentado de AgoraBack. Aparecer juntos aquí no implica que compartan despliegue ni que haya una demo activa.

## Alcance del catálogo

- Proyectos propios cuyo trabajo principal trata de asistentes, modelos, agentes o herramientas de IA.
- Integraciones y módulos de agentes con una función identificable dentro de otro producto.
- Experimentos de código diferenciados de servicios listos para usar.

La revisión de GitHub del 23 de septiembre de 2026 excluyó forks, repositorios archivados, scaffolds sin funcionalidad de IA implementada y software cuya relación con la IA es incidental. Los repositorios privados no se enlazan desde el catálogo público; una ficha puede describir uno cuando su acceso se identifica con claridad.

La lista y las descripciones viven en [`lib/components-data.ts`](lib/components-data.ts); las áreas del catálogo, en [`lib/catalog-groups.ts`](lib/catalog-groups.ts). Para agregar una ficha, usa una clave de URL única, un repositorio verificable y afirmaciones apoyadas por su README o código. La ruta y el sitemap se generan a partir de esos datos.

## Desarrollo

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run test:contrast -- http://localhost:3000
```

La prueba de contraste necesita el servidor en marcha. El sitio usa Next.js 16, TypeScript, Tailwind CSS 4 y Mermaid para los diagramas de cada ficha.
