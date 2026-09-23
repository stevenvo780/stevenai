# Arquitectura del portal Daímon

Daímon es un catálogo Next.js 16. No ejecuta los modelos, agentes ni servicios descritos en sus fichas. Su página «Mapa» agrupa proyectos por propósito; no es un diagrama de integración entre ellos.

## Fuente de datos y rutas

- `lib/components-data.ts`: fichas, enlaces GitHub, etiquetas, requisitos y diagramas de cada proyecto.
- `lib/catalog-groups.ts`: orden y explicación de las cuatro áreas visibles.
- `app/page.tsx`: portada con el catálogo completo y una guía de lectura.
- `app/architecture/page.tsx`: mapa de las áreas y enlaces a las fichas.
- `app/components/[key]/page.tsx`: ficha individual con metadatos y diagrama.
- `app/sitemap.ts`: rutas públicas generadas desde la misma lista.

`components/RuntimeBadge.tsx` distingue GPU local, CPU local, API externa y servicio propio. La etiqueta completa de cada ficha concreta qué requiere realmente; el tipo de ejecución no promete disponibilidad pública. `components/MermaidDiagram.tsx` renderiza en el navegador y sanea el SVG generado.

## Publicación

El proyecto Vercel `stevenai` sirve [daimon.stevenvallejo.com](https://daimon.stevenvallejo.com). El repositorio de origen es [stevenvo780/stevenai](https://github.com/stevenvo780/stevenai). La construcción estática genera la portada, el mapa y una ruta por proyecto.
