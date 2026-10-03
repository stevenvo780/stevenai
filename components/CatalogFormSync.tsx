"use client";

import { useEffect } from "react";

type Props = { query: string; area: string; runtime: string };

// Conserva la consulta aplicada mientras el formulario mantiene su nodo.
const appliedFilters = new WeakMap<HTMLInputElement, string>();

export default function CatalogFormSync({ query, area, runtime }: Props) {
  useEffect(() => {
    const quickSearch = document.getElementById("dm-home-quick-query") as HTMLInputElement | null;
    const filters = JSON.stringify([query, area, runtime]);
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const restoringHistory = navigation?.type === "back_forward";

    if (quickSearch) {
      const previousFilters = appliedFilters.get(quickSearch);
      // No borres lo escrito antes de hidratar una página recién abierta.
      if (restoringHistory || (previousFilters !== undefined && previousFilters !== filters)) {
        quickSearch.value = query;
      }
      appliedFilters.set(quickSearch, filters);
    }

    function syncFields() {
      const search = document.getElementById("dm-home-query") as HTMLInputElement | null;
      const areaSelect = document.getElementById("dm-home-area") as HTMLSelectElement | null;
      const runtimeSelect = document.getElementById("dm-home-runtime") as HTMLSelectElement | null;

      if (search) search.value = query;
      if (areaSelect) areaSelect.value = area;
      if (runtimeSelect) runtimeSelect.value = runtime;
    }

    function restoreFields(event: PageTransitionEvent) {
      if (quickSearch && (event.persisted || restoringHistory)) quickSearch.value = query;
      syncFields();
    }

    // El historial puede restaurar valores editados después de que React renderice.
    syncFields();
    window.addEventListener("pageshow", restoreFields);
    return () => window.removeEventListener("pageshow", restoreFields);
  }, [query, area, runtime]);

  return null;
}
