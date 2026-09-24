"use client";

import { useEffect } from "react";

type Props = { query: string; area: string; runtime: string };

export default function CatalogFormSync({ query, area, runtime }: Props) {
  useEffect(() => {
    function syncFields() {
      const search = document.getElementById("dm-home-query") as HTMLInputElement | null;
      const areaSelect = document.getElementById("dm-home-area") as HTMLSelectElement | null;
      const runtimeSelect = document.getElementById("dm-home-runtime") as HTMLSelectElement | null;

      if (search) search.value = query;
      if (areaSelect) areaSelect.value = area;
      if (runtimeSelect) runtimeSelect.value = runtime;
    }

    // El historial puede restaurar valores editados después de que React renderice.
    syncFields();
    window.addEventListener("pageshow", syncFields);
    return () => window.removeEventListener("pageshow", syncFields);
  }, [query, area, runtime]);

  return null;
}
