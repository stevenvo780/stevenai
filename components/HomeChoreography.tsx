"use client";

import { useEffect } from "react";

/** Activa únicamente trazos decorativos visibles; el contenido siempre se pinta en SSR. */
export default function HomeChoreography() {
  useEffect(() => {
    const echo = document.querySelector<HTMLElement>(".dm-home-atlas-echo");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let echoFrame = 0;
    const updateHeader = () => {
      document.body.toggleAttribute("data-dm-home-scrolled", window.scrollY > 28);
      if (!echo || reducedMotion.matches || echoFrame) return;
      const guideTop = echo.parentElement?.getBoundingClientRect().top ?? 0;
      if (guideTop > window.innerHeight || guideTop < -echo.clientHeight) return;
      echoFrame = requestAnimationFrame(() => {
        echoFrame = 0;
        const top = echo.parentElement?.getBoundingClientRect().top ?? 0;
        const progress = Math.max(0, Math.min(1, (window.innerHeight - top) / (window.innerHeight + 240)));
        echo.style.setProperty("--dm-echo-shift", `${Math.round(progress * 18)}px`);
        echo.style.setProperty("--dm-echo-opacity", String(1 - Math.max(0, -top) / 360 * 0.24));
      });
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    const clearHeader = () => {
      window.removeEventListener("scroll", updateHeader);
      if (echoFrame) cancelAnimationFrame(echoFrame);
      echo?.style.removeProperty("--dm-echo-shift");
      echo?.style.removeProperty("--dm-echo-opacity");
      document.body.removeAttribute("data-dm-home-scrolled");
    };

    if (!("IntersectionObserver" in window) || reducedMotion.matches) return clearHeader;

    const home = document.querySelector<HTMLElement>(".dm-home");
    if (!home) return clearHeader;

    const onceTargets = new Set<Element>();
    const animatedTargets = new Set<Element>();
    const bridgeTargets = new Set<Element>();
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
    const bridgeAnimated = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-dm-visible", entry.isIntersecting);
      }
    }, { threshold: 0.01 });

    const scan = () => {
      home.querySelectorAll<HTMLElement>(".dm-home-index-projects a:not([data-dm-in]), .dm-home-section-heading:not([data-dm-in]), .dm-home-guide-item:not([data-dm-in]), .dm-home-area:not([data-dm-in]), .dm-home-catalog-group:not([data-dm-in])")
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
      home.querySelectorAll(".dm-home-area-motif svg, .dm-home-atlas-echo")
        .forEach((element) => {
          if (animatedTargets.has(element)) return;
          animatedTargets.add(element);
          animated.observe(element);
        });
      home.querySelectorAll(".dm-home-atlas-bridge").forEach((element) => {
        if (bridgeTargets.has(element)) return;
        bridgeTargets.add(element);
        bridgeAnimated.observe(element);
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
      for (const element of bridgeTargets) {
        if (element.isConnected) continue;
        bridgeAnimated.unobserve(element);
        bridgeTargets.delete(element);
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
      clearHeader();
      mutations.disconnect();
      if (frame) cancelAnimationFrame(frame);
      once.disconnect();
      active.disconnect();
      animated.disconnect();
      bridgeAnimated.disconnect();
    };
  }, []);

  return null;
}
