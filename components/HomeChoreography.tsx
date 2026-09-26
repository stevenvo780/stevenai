"use client";

import { useEffect } from "react";

/** Activa únicamente trazos decorativos visibles; el contenido siempre se pinta en SSR. */
export default function HomeChoreography() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const home = document.querySelector<HTMLElement>(".dm-home");
    if (!home) return;

    const onceTargets = new Set<Element>();
    const animatedTargets = new Set<Element>();
    const activeTargets = new Set<Element>();
    const once = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.dmIn = "";
        observer.unobserve(entry.target);
        onceTargets.delete(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    const active = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) (entry.target as HTMLElement).dataset.dmActive = "";
        else delete (entry.target as HTMLElement).dataset.dmActive;
      }
    }, { threshold: 0.01 });

    // El póster existe en SSR; sus bucles decorativos solo consumen frames cerca
    // del viewport. Las miniaturas del catálogo son estáticas y ligeras.
    const animated = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-dm-visible", entry.isIntersecting);
      }
    }, { rootMargin: "150px 0px 150px 0px", threshold: 0 });

    const scan = () => {
      home.querySelectorAll<HTMLElement>(".dm-home-guide-item:not([data-dm-in]), .dm-home-area:not([data-dm-in]), .dm-home-catalog-group:not([data-dm-in])")
        .forEach((element) => {
          if (onceTargets.has(element)) return;
          onceTargets.add(element);
          once.observe(element);
        });
      home.querySelectorAll(".dm-home-featured").forEach((element) => {
        if (activeTargets.has(element)) return;
        activeTargets.add(element);
        active.observe(element);
      });
      home.querySelectorAll(".dm-home-hero-scene figure, .dm-home-area-motif svg")
        .forEach((element) => {
          if (animatedTargets.has(element)) return;
          animatedTargets.add(element);
          animated.observe(element);
        });
      for (const element of onceTargets) {
        if (element.isConnected) continue;
        once.unobserve(element);
        onceTargets.delete(element);
      }
      for (const element of activeTargets) {
        if (element.isConnected) continue;
        active.unobserve(element);
        activeTargets.delete(element);
      }
      for (const element of animatedTargets) {
        if (element.isConnected) continue;
        animated.unobserve(element);
        animatedTargets.delete(element);
      }
    };
    scan();

    // Next puede sustituir los resultados tras navegar con un Link sin recargar
    // la página. Esos SVG nuevos también deben reanudarse al entrar en pantalla.
    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    mutations.observe(home, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      if (frame) cancelAnimationFrame(frame);
      once.disconnect();
      active.disconnect();
      animated.disconnect();
    };
  }, []);

  return null;
}
