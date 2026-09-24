# Arquitectura del portal Daímon

Daímon es un catálogo Next.js 16. No ejecuta los modelos, agentes ni servicios descritos en sus fichas. Su página «Mapa» agrupa proyectos por propósito; no es un diagrama de integración entre ellos.

## Fuente de datos y rutas

- `lib/components-data.ts`: fichas, enlaces GitHub, etiquetas, requisitos y diagramas de cada proyecto.
- `lib/catalog-groups.ts`: orden y explicación de las cuatro áreas visibles.
- `app/page.tsx`: portada editorial, guía de lectura, selección destacada y archivo completo. La búsqueda y los filtros se resuelven en el servidor a partir de parámetros de URL, también sin JavaScript.
- `app/architecture/page.tsx`: mapa de las áreas y enlaces a las fichas.
- `app/components/[key]/page.tsx`: ficha individual con metadatos y diagrama.
- `app/sitemap.ts`: rutas públicas generadas desde la misma lista.
- `components/visual/`: escena conceptual de IA y motivos decorativos por área y proyecto. No representan una arquitectura compartida ni datos operativos.
- `app/opengraph-image.tsx` y `app/twitter-image.tsx`: imágenes sociales generadas desde código.

`components/RuntimeBadge.tsx` distingue GPU local, CPU local, API externa y servicio propio. La etiqueta completa de cada ficha concreta qué requiere realmente; el tipo de ejecución no promete disponibilidad pública. `sourceAccess: "private"` identifica la ficha de Talos: se muestra como referencia sin exponer ni enlazar su repositorio. La ficha de Ágora AI Agent aclara que es un módulo de AgoraBack. `components/MermaidDiagram.tsx` renderiza en el navegador y sanea el SVG generado.

## Publicación

El proyecto Vercel `stevenai` sirve [daimon.stevenvallejo.com](https://daimon.stevenvallejo.com). El repositorio de origen es [stevenvo780/stevenai](https://github.com/stevenvo780/stevenai). La construcción genera el mapa y una ruta estática por proyecto; la portada responde a filtros de URL.
