# Daímon

Catálogo de proyectos de inteligencia artificial de Steven Vallejo. La versión pública está en [daimon.stevenvallejo.com](https://daimon.stevenvallejo.com).

Cada ficha apunta a un repositorio público y explica su propósito, estado, requisitos y arquitectura. Los proyectos son independientes: aparecer juntos aquí no implica que compartan despliegue o que haya una demo activa.

## Alcance del catálogo

- Proyectos propios cuyo trabajo principal trata de asistentes, modelos, agentes o herramientas de IA.
- Integraciones de agentes que tienen un repositorio público y una función identificable, aunque dependan de otro producto.
- Experimentos de código diferenciados de servicios listos para usar.

La revisión de GitHub del 23 de septiembre de 2026 excluyó forks, repositorios archivados, scaffolds sin funcionalidad de IA implementada y software cuya relación con la IA es incidental. Los repositorios privados no se enlazan desde el catálogo público.

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
