"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./NeuralField.module.css";

type FamilyKey = "assistants" | "infrastructure" | "models" | "tools";
type FamilyCounts = Record<FamilyKey, number>;

type Point = { x: number; y: number };
type Family = {
  key: FamilyKey;
  color: readonly [number, number, number];
  x: number;
  y: number;
  radius: number;
  stretchX: number;
  stretchY: number;
  tilt: number;
  phase: number;
};

type Star = Point & { size: number; opacity: number };

const TAU = Math.PI * 2;
const DEFAULT_COUNTS: FamilyCounts = {
  assistants: 5,
  infrastructure: 9,
  models: 2,
  tools: 5,
};

const FAMILY_PALETTE = [
  { key: "assistants", color: [115, 238, 213], phase: 0.34, tilt: -0.35, stretchX: 1.12, stretchY: 0.77 },
  { key: "infrastructure", color: [77, 198, 208], phase: 1.7, tilt: 0.35, stretchX: 0.88, stretchY: 1.14 },
  { key: "models", color: [179, 155, 241], phase: 3.1, tilt: 0.43, stretchX: 1.2, stretchY: 0.8 },
  { key: "tools", color: [245, 181, 111], phase: 4.75, tilt: -0.24, stretchX: 1.08, stretchY: 0.87 },
] as const;

function random(seed: number) {
  let value = seed | 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) | 0;
    return (value >>> 0) / 4294967296;
  };
}

const starRandom = random(41723);
const STARS: Star[] = Array.from({ length: 122 }, () => ({
  x: starRandom(),
  y: starRandom(),
  size: 0.35 + starRandom() * 1.15,
  opacity: 0.08 + starRandom() * 0.34,
}));

const dustRandom = random(85391);
const DUST = FAMILY_PALETTE.map(() => Array.from({ length: 94 }, () => ({
  angle: dustRandom() * TAU,
  distance: Math.sqrt(dustRandom()) * 1.13,
  depth: dustRandom() * 2 - 1,
  size: 0.28 + dustRandom() * 1.12,
  opacity: 0.12 + dustRandom() * 0.38,
})));

// El SVG llega en el HTML inicial y en el payload de React. Una muestra
// determinista conserva las cuatro constelaciones sin duplicar la trama fina
// que dibuja el canvas tras hidratar.
const STATIC_STARS = STARS.filter((_, index) => index % 2 === 0);
const STATIC_DUST = DUST.map((particles) => particles.filter((_, index) => index % 3 === 0));
const STATIC_LAYERS = [5, 11] as const;

function rgba(color: readonly [number, number, number], alpha: number) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}

function smoothstep(value: number) {
  const progress = Math.max(0, Math.min(1, value));
  return progress * progress * (3 - 2 * progress);
}

function layout(width: number, height: number): Family[] {
  const narrow = width < 720;
  const base = narrow ? Math.min(width, 460) : Math.min(height, width * 0.7);
  const positions = narrow
    ? [
        [0.27, 0.16, 0.205],
        [0.73, 0.155, 0.235],
        [0.3, 0.293, 0.17],
        [0.74, 0.29, 0.2],
      ]
    : [
        [0.595, 0.315, 0.23],
        [0.815, 0.405, 0.257],
        [0.62, 0.725, 0.174],
        [0.845, 0.742, 0.2],
      ];

  return FAMILY_PALETTE.map((family, index) => ({
    ...family,
    x: width * positions[index][0],
    y: height * positions[index][1],
    radius: base * positions[index][2],
  }));
}

function contourPoint(family: Family, angle: number, layer: number, time: number, pointer: Point): Point {
  const turn = time * (family.key === "models" ? -0.033 : 0.025) + pointer.x * 0.1;
  const depth = layer / 13;
  const wobble = 1
    + 0.063 * Math.sin(3 * angle + family.phase + time * 0.16)
    + 0.037 * Math.sin(7 * angle - family.phase * 1.7 - time * 0.11)
    + 0.023 * Math.cos(11 * angle + layer * 0.4);
  const orbit = family.radius * (0.26 + depth * 0.75) * wobble;
  const azimuth = angle + turn + layer * 0.087;
  const localX = Math.cos(azimuth) * orbit * family.stretchX;
  const localY = Math.sin(azimuth) * orbit * family.stretchY;
  const tilt = family.tilt + pointer.y * 0.025;
  const perspective = 1 + Math.sin(angle + family.phase + layer * 0.24) * 0.075;

  return {
    x: family.x + (localX * Math.cos(tilt) - localY * Math.sin(tilt)) * perspective + pointer.x * (3 + depth * 7),
    y: family.y + (localX * Math.sin(tilt) + localY * Math.cos(tilt)) * perspective + pointer.y * (3 + depth * 7),
  };
}

function filamentPoint(family: Family, index: number, progress: number, time: number, pointer: Point): Point {
  const angle = (index * 2.39996 + family.phase) + progress * (2.9 + (index % 5) * 0.41);
  const layer = 3 + (index * 7) % 11;
  const point = contourPoint(family, angle, layer, time, pointer);
  const drift = Math.sin(progress * Math.PI) * family.radius * (0.045 + (index % 4) * 0.009);
  return {
    x: point.x + Math.cos(angle * 1.7 + family.phase) * drift,
    y: point.y + Math.sin(angle * 1.31 - family.phase) * drift,
  };
}

function projectPoints(family: Family, count: number, time: number, pointer: Point): Point[] {
  const limitedCount = Math.max(0, Math.min(48, Math.round(count)));
  return Array.from({ length: limitedCount }, (_, index) => {
    // Cada foco es una obra del catálogo. La espiral distribuye sin unir ni jerarquizar proyectos.
    const angle = index * 2.3999632297 + family.phase + time * 0.042 + pointer.x * 0.095;
    const radial = limitedCount <= 2
      ? 0.36
      : 0.18 + Math.sqrt((index + 0.55) / limitedCount) * 0.57;
    const pulse = 1 + Math.sin(time * 0.47 + index * 1.4 + family.phase) * 0.015;
    const x = Math.cos(angle) * family.radius * family.stretchX * radial * pulse;
    const y = Math.sin(angle) * family.radius * family.stretchY * radial * pulse;
    return {
      x: family.x + x * Math.cos(family.tilt) - y * Math.sin(family.tilt) + pointer.x * 9,
      y: family.y + x * Math.sin(family.tilt) + y * Math.cos(family.tilt) + pointer.y * 9,
    };
  });
}

function svgPath(points: Point[]) {
  return points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
}

// La misma representación decimal en Node y en el navegador evita divergencias
// de hidratación por los últimos bits de las funciones trigonométricas.
function svgValue(value: number) {
  return Number(value.toFixed(2));
}

function StaticAtlas({
  width,
  height,
  counts,
  id,
  className,
}: {
  width: number;
  height: number;
  counts: FamilyCounts;
  id: string;
  className: string;
}) {
  const families = layout(width, height);
  const pointer = { x: 0, y: 0 };

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-night`}>
          <stop stopColor="#143238" />
          <stop offset="0.48" stopColor="#0a2027" />
          <stop offset="1" stopColor="#06151c" />
        </radialGradient>
        {families.map((family) => (
          <radialGradient id={`${id}-${family.key}`} key={family.key}>
            <stop stopColor={rgba(family.color, 0.27)} />
            <stop offset="0.42" stopColor={rgba(family.color, 0.095)} />
            <stop offset="1" stopColor={rgba(family.color, 0)} />
          </radialGradient>
        ))}
      </defs>
      <rect width={width} height={height} fill="#06151c" />
      <ellipse cx={svgValue(width * (width < 720 ? 0.5 : 0.72))} cy={svgValue(height * 0.53)} rx={svgValue(width * 0.45)} ry={svgValue(height * 0.57)} fill={`url(#${id}-night)`} opacity=".9" />
      <g fill="#b9eee3">
        {STATIC_STARS.map((star, index) => (
          <circle key={index} cx={svgValue(star.x * width)} cy={svgValue(star.y * height)} r={svgValue(star.size)} opacity={svgValue(star.opacity)} />
        ))}
      </g>
      {families.map((family, familyIndex) => {
        const focus = projectPoints(family, counts[family.key], 0, pointer);
        return (
          <g key={family.key}>
            <ellipse
              cx={svgValue(family.x)}
              cy={svgValue(family.y)}
              rx={svgValue(family.radius * 1.9)}
              ry={svgValue(family.radius * 1.8)}
              fill={`url(#${id}-${family.key})`}
            />
            <g fill={rgba(family.color, 0.9)}>
              {STATIC_DUST[familyIndex].map((particle, index) => {
                const radius = family.radius * particle.distance;
                return (
                  <circle
                    key={index}
                    cx={svgValue(family.x + Math.cos(particle.angle) * radius * family.stretchX)}
                    cy={svgValue(family.y + Math.sin(particle.angle) * radius * family.stretchY)}
                    r={svgValue(particle.size)}
                    opacity={svgValue(particle.opacity)}
                  />
                );
              })}
            </g>
            <g fill="none" stroke={rgba(family.color, 0.57)}>
              {STATIC_LAYERS.map((layer, index) => {
                const points = Array.from({ length: 44 }, (_, step) =>
                  contourPoint(family, step / 43 * TAU, layer, 0, pointer));
                return (
                  <path
                    key={layer}
                    d={`${svgPath(points)} Z`}
                    strokeWidth={index % 2 === 0 ? 1.08 : 0.72}
                    opacity={svgValue(0.38 + index * 0.1)}
                  />
                );
              })}
              {Array.from({ length: 5 }, (_, index) => {
                const points = Array.from({ length: 22 }, (_, step) =>
                  filamentPoint(family, index * 2, step / 21, 0, pointer));
                const lit = index % 3 === 0;
                return (
                  <path
                    key={`filament-${index}`}
                    d={svgPath(points)}
                    strokeWidth={lit ? 1.3 : 0.7}
                    opacity={lit ? 0.56 : 0.25}
                  />
                );
              })}
            </g>
            {focus.map((point, index) => (
              <g key={index}>
                <circle cx={svgValue(point.x)} cy={svgValue(point.y)} r={svgValue(family.radius * 0.12)} fill={`url(#${id}-${family.key})`} />
                <circle cx={svgValue(point.x)} cy={svgValue(point.y)} r={svgValue(family.radius * 0.035)} fill={rgba(family.color, 0.19)} />
                <circle cx={svgValue(point.x)} cy={svgValue(point.y)} r={width < 720 ? 2.2 : 2.6} fill="#e7fff6" />
                <circle cx={svgValue(point.x)} cy={svgValue(point.y)} r={width < 720 ? 4.4 : 5.1} fill="none" stroke={rgba(family.color, 0.85)} strokeWidth=".7" />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function renderCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  counts: FamilyCounts,
  time: number,
  pointer: Point,
  seed = false,
) {
  const families = layout(width, height);
  const narrow = width < 720;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#06151c";
  context.fillRect(0, 0, width, height);

  const night = context.createRadialGradient(width * (narrow ? 0.5 : 0.72), height * 0.51, 0, width * (narrow ? 0.5 : 0.72), height * 0.51, Math.max(width, height) * 0.63);
  night.addColorStop(0, "#123039");
  night.addColorStop(0.52, "#0a2029");
  night.addColorStop(1, "#06151c");
  context.fillStyle = night;
  context.fillRect(0, 0, width, height);

  for (const star of seed ? STATIC_STARS : STARS) {
    const offset = 2.5 * Math.sin(time * 0.13 + star.x * 21);
    context.fillStyle = `rgba(193, 235, 227, ${star.opacity * (0.85 + 0.15 * Math.sin(time * 0.7 + star.y * 19))})`;
    context.beginPath();
    context.arc(star.x * width + offset, star.y * height, star.size, 0, TAU);
    context.fill();
  }

  families.forEach((family, familyIndex) => {
    const halo = context.createRadialGradient(family.x, family.y, family.radius * 0.08, family.x, family.y, family.radius * 1.88);
    halo.addColorStop(0, rgba(family.color, seed ? 0.17 : 0.27));
    halo.addColorStop(0.37, rgba(family.color, seed ? 0.065 : 0.11));
    halo.addColorStop(1, rgba(family.color, 0));
    context.fillStyle = halo;
    context.beginPath();
    context.ellipse(family.x, family.y, family.radius * 1.9, family.radius * 1.75, family.tilt, 0, TAU);
    context.fill();

    // La trama de cada familia es una superficie independiente; los focos nunca se conectan entre sí.
    for (let layer = seed ? 11 : 12; layer >= (seed ? 5 : 2); layer -= seed ? 6 : 1) {
      context.beginPath();
      for (let step = 0; step <= 80; step++) {
        const point = contourPoint(family, step / 80 * TAU, layer, time, pointer);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.lineWidth = seed ? 1.1 : layer % 4 === 0 ? 1.05 : 0.55;
      context.strokeStyle = rgba(family.color, seed ? 0.28 : 0.055 + layer * 0.012);
      context.stroke();
    }

    for (let index = 0; index < (seed ? 5 : 27); index++) {
      context.beginPath();
      for (let step = 0; step <= 37; step++) {
        const point = filamentPoint(family, index, step / 37, time, pointer);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      const lit = index % (seed ? 3 : 7) === 0;
      context.strokeStyle = rgba(family.color, lit ? (seed ? 0.22 : 0.33) : seed ? 0.12 : 0.075 + (index % 4) * 0.027);
      context.lineWidth = lit ? 1.25 : 0.65;
      if (lit) {
        context.shadowColor = rgba(family.color, 0.8);
        context.shadowBlur = 11;
      }
      context.stroke();
      context.shadowBlur = 0;
    }

    for (const particle of seed ? STATIC_DUST[familyIndex] : DUST[familyIndex]) {
      const twinkle = 0.76 + 0.24 * Math.sin(time * 0.51 + particle.angle * 3 + family.phase);
      const distance = family.radius * particle.distance * (1 + particle.depth * 0.035);
      const x = family.x + Math.cos(particle.angle + time * 0.013 * particle.depth) * distance * family.stretchX + pointer.x * (2 + particle.depth * 3);
      const y = family.y + Math.sin(particle.angle + time * 0.013 * particle.depth) * distance * family.stretchY + pointer.y * (2 + particle.depth * 3);
      context.fillStyle = rgba(family.color, particle.opacity * twinkle);
      context.beginPath();
      context.arc(x, y, particle.size, 0, TAU);
      context.fill();
    }

    const focus = projectPoints(family, counts[family.key], time, pointer);
    focus.forEach((point, index) => {
      const pulse = 0.89 + 0.11 * Math.sin(time * 0.95 + index * 1.23 + family.phase);
      const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, family.radius * 0.125);
      glow.addColorStop(0, rgba(family.color, (seed ? 0.22 : 0.35) * pulse));
      glow.addColorStop(0.43, rgba(family.color, (seed ? 0.075 : 0.12) * pulse));
      glow.addColorStop(1, rgba(family.color, 0));
      context.fillStyle = glow;
      context.beginPath();
      context.arc(point.x, point.y, family.radius * 0.125, 0, TAU);
      context.fill();

      context.strokeStyle = rgba(family.color, (seed ? 0.39 : 0.52) * pulse);
      context.lineWidth = 0.7;
      context.beginPath();
      context.arc(point.x, point.y, narrow ? 4.5 : 5.2, 0, TAU);
      context.stroke();

      context.shadowColor = rgba(family.color, 0.95);
      context.shadowBlur = 13;
      context.fillStyle = "#e9fff8";
      context.beginPath();
      context.arc(point.x, point.y, narrow ? 2.25 : 2.6, 0, TAU);
      context.fill();
      context.shadowBlur = 0;
    });
  });

  const vignette = context.createLinearGradient(0, 0, width, 0);
  vignette.addColorStop(0, narrow ? "rgba(6, 21, 28, 0.03)" : "rgba(6, 21, 28, 0.89)");
  vignette.addColorStop(narrow ? 0.5 : 0.31, narrow ? "rgba(6, 21, 28, 0)" : "rgba(6, 21, 28, 0.31)");
  vignette.addColorStop(0.72, "rgba(6, 21, 28, 0)");
  vignette.addColorStop(1, "rgba(6, 21, 28, 0.26)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function renderActiveFamily(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  counts: FamilyCounts,
  familyIndex: number,
  time: number,
  pointer: Point,
) {
  const family = layout(width, height)[familyIndex];
  if (!family) return;

  context.fillStyle = "rgba(2, 13, 19, 0.3)";
  context.fillRect(0, 0, width, height);

  const pulse = 0.94 + 0.06 * Math.sin(time * 1.7);
  const halo = context.createRadialGradient(family.x, family.y, family.radius * 0.1, family.x, family.y, family.radius * 1.55);
  halo.addColorStop(0, rgba(family.color, 0.24 * pulse));
  halo.addColorStop(0.56, rgba(family.color, 0.095 * pulse));
  halo.addColorStop(1, rgba(family.color, 0));
  context.fillStyle = halo;
  context.beginPath();
  context.ellipse(family.x, family.y, family.radius * 1.55, family.radius * 1.55, family.tilt, 0, TAU);
  context.fill();

  for (const layer of [5, 9, 12]) {
    context.beginPath();
    for (let step = 0; step <= 64; step++) {
      const point = contourPoint(family, step / 64 * TAU, layer, 0, pointer);
      if (step === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.strokeStyle = rgba(family.color, layer === 12 ? 0.52 : 0.3);
    context.lineWidth = layer === 12 ? 1.5 : 1;
    context.stroke();
  }

  const focus = projectPoints(family, counts[family.key], 0, pointer);
  for (const point of focus) {
    context.strokeStyle = rgba(family.color, 0.9);
    context.lineWidth = 1.15;
    context.beginPath();
    context.arc(point.x, point.y, 8.2, 0, TAU);
    context.stroke();
    context.fillStyle = "#f3fff9";
    context.beginPath();
    context.arc(point.x, point.y, 3.3, 0, TAU);
    context.fill();
  }
}

function renderAnimatedAccents(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  counts: FamilyCounts,
  time: number,
  pointer: Point,
  activeIndex: number,
  scrollProgress: number,
) {
  const families = layout(width, height);

  families.forEach((family, familyIndex) => {
    if (activeIndex >= 0 && familyIndex !== activeIndex) return;
    // La trama completa permanece cacheada. Esta luz recorre cada familia sin
    // trazar relaciones entre los focos, que siguen siendo obras independientes.
    const arrival = smoothstep((time - familyIndex * 0.13) / 1.55);
    const orbit = time * 0.62 + family.phase;
    const lightX = family.x + Math.cos(orbit) * family.radius * 0.27 + pointer.x * 6;
    const lightY = family.y + Math.sin(orbit * 0.82) * family.radius * 0.16 + scrollProgress * family.radius * 0.23 + pointer.y * 5;
    const glow = context.createRadialGradient(lightX, lightY, family.radius * 0.04, lightX, lightY, family.radius * 1.42);
    glow.addColorStop(0, rgba(family.color, arrival * (0.34 + scrollProgress * 0.045)));
    glow.addColorStop(0.44, rgba(family.color, arrival * 0.15));
    glow.addColorStop(1, rgba(family.color, 0));
    context.fillStyle = glow;
    context.beginPath();
    context.ellipse(family.x, family.y + scrollProgress * family.radius * 0.11, family.radius * 1.65, family.radius * 1.5, family.tilt, 0, TAU);
    context.fill();

    // Los anillos se activan en secuencia durante la entrada y luego respiran
    // sobre el atlas inmóvil. Al avanzar hacia el índice, crecen los focos.
    for (const layer of [5, 11]) {
      const animatedTime = time * (layer === 11 ? 2.9 : -2.2);
      context.beginPath();
      for (let step = 0; step <= 64; step++) {
        const point = contourPoint(family, step / 64 * TAU, layer, animatedTime, pointer);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.lineWidth = layer === 11 ? 1.25 : 0.9;
      context.strokeStyle = rgba(family.color, arrival * (layer === 11 ? 0.39 : 0.22));
      context.stroke();
    }

    for (let arc = 0; arc < 2; arc++) {
      const start = time * (arc === 0 ? 0.8 : -0.49) + family.phase + arc * Math.PI;
      const span = arc === 0 ? 1.18 : 0.77;
      context.beginPath();
      for (let step = 0; step <= 22; step++) {
        const point = contourPoint(family, start + step / 22 * span, arc === 0 ? 11 : 5, time * 2.9, pointer);
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.lineWidth = arc === 0 ? 2.15 : 1.45;
      context.strokeStyle = rgba(family.color, arrival * (arc === 0 ? 0.65 : 0.42));
      context.shadowColor = rgba(family.color, 0.7);
      context.shadowBlur = arc === 0 ? 12 : 7;
      context.stroke();
      context.shadowBlur = 0;
    }

    for (let index = 0; index < 3; index++) {
      const track = familyIndex * 3 + index * 8 + 2;
      const travel = (time * (0.105 + familyIndex * 0.006) + index * 0.31 + familyIndex * 0.13) % 1;
      const segmentLength = 0.17 + index * 0.018;
      context.beginPath();
      for (let step = 0; step <= 13; step++) {
        const rawProgress = travel + step / 13 * segmentLength;
        const progress = rawProgress % 1;
        const point = filamentPoint(family, track, progress, 0, pointer);
        if (step === 0 || (rawProgress >= 1 && travel + (step - 1) / 13 * segmentLength < 1)) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.lineWidth = index === 0 ? 1.7 : 1.05;
      context.strokeStyle = rgba(family.color, arrival * (0.32 + index * 0.075));
      context.stroke();

      if (index === 0) {
        const point = filamentPoint(family, track, travel, 0, pointer);
        const pulse = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 8);
        pulse.addColorStop(0, rgba(family.color, arrival * 0.58));
        pulse.addColorStop(1, rgba(family.color, 0));
        context.fillStyle = pulse;
        context.beginPath();
        context.arc(point.x, point.y, 8, 0, TAU);
        context.fill();
      }
    }

    const focus = projectPoints(family, counts[family.key], 0, pointer);
    focus.forEach((point, index) => {
      const pulse = arrival * (0.19 + 0.23 * (0.5 + 0.5 * Math.sin(time * 1.12 + index * 1.43 + family.phase)));
      context.fillStyle = rgba(family.color, pulse);
      context.beginPath();
      context.arc(point.x, point.y, 3.2 + pulse * 4.6 + scrollProgress * 2.4, 0, TAU);
      context.fill();
      if (scrollProgress > 0.01) {
        context.strokeStyle = rgba(family.color, scrollProgress * 0.37);
        context.lineWidth = 0.8;
        context.beginPath();
        context.arc(point.x, point.y, 6.5 + scrollProgress * 3.4, 0, TAU);
        context.stroke();
      }
      context.fillStyle = `rgba(241, 255, 250, ${pulse * 0.7})`;
      context.beginPath();
      context.arc(point.x, point.y, 1.25, 0, TAU);
      context.fill();
    });
  });
}

export default function NeuralField({ counts = DEFAULT_COUNTS }: { counts?: FamilyCounts }) {
  const elementId = useId().replace(/:/g, "");
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const countValues = [counts.assistants, counts.infrastructure, counts.models, counts.tools];
  const countSignature = countValues.join(":");

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!host || !canvas || !context) return;

    const baseCanvas = document.createElement("canvas");
    const baseContext = baseCanvas.getContext("2d", { alpha: false });
    if (!baseContext) return;
    const seedCanvas = document.createElement("canvas");
    const seedContext = seedCanvas.getContext("2d", { alpha: false });
    if (!seedContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let inView = false;
    let disposed = false;
    let painted = false;
    let hoveredIndex = -1;
    let focusedIndex = -1;
    let activeIndex = -1;
    let scrollProgress = 0;
    let scrollTarget = 0;
    const animationStart = performance.now();

    const readScroll = () => {
      const rect = host.getBoundingClientRect();
      // El cambio se completa mientras el atlas aún está a la vista; la luz
      // baja hacia los focos al acercarse el índice de territorios.
      const journey = Math.max(180, Math.min(rect.height * 0.43, window.innerHeight * 0.44));
      scrollTarget = Math.max(0, Math.min(1, -rect.top / journey));
    };

    const draw = (time: number) => {
      pointer.x += (pointerTarget.x - pointer.x) * 0.045;
      pointer.y += (pointerTarget.y - pointer.y) * 0.045;
      scrollProgress += (scrollTarget - scrollProgress) * 0.105;
      if (width && height) {
        context.clearRect(0, 0, width, height);
        const reveal = reducedMotion.matches ? 1 : smoothstep(time / 1.7);
        if (reveal < 1) context.drawImage(seedCanvas, 0, 0, width, height);
        if (reveal > 0) {
          context.globalAlpha = reveal;
          context.drawImage(baseCanvas, 0, 0, width, height);
          context.globalAlpha = 1;
        }
        if (activeIndex >= 0) renderActiveFamily(context, width, height, counts, activeIndex, time, pointer);
        if (!reducedMotion.matches) renderAnimatedAccents(context, width, height, counts, time, pointer, activeIndex, scrollProgress);
      }
      if (!painted && !disposed) {
        painted = true;
        setReady(true);
      }
    };

    const tick = (timestamp: number) => {
      if (disposed) return;
      if (timestamp - lastDraw >= 45) {
        draw((timestamp - animationStart) * 0.001);
        lastDraw = timestamp;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const updatePlayback = () => {
      const shouldAnimate = inView && !document.hidden && !reducedMotion.matches;
      if (shouldAnimate && !frame) frame = window.requestAnimationFrame(tick);
      if (!shouldAnimate && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      if (inView && !document.hidden && reducedMotion.matches && width && height) draw(0);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(2600000 / (width * height)));
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      baseCanvas.width = canvas.width;
      baseCanvas.height = canvas.height;
      seedCanvas.width = canvas.width;
      seedCanvas.height = canvas.height;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      baseContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seedContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      renderCanvas(baseContext, width, height, counts, 0, { x: 0, y: 0 });
      renderCanvas(seedContext, width, height, counts, 0, { x: 0, y: 0 }, true);
      inView = rect.bottom > 0 && rect.top < window.innerHeight;
      readScroll();
      draw(reducedMotion.matches ? 0 : (performance.now() - animationStart) * 0.001);
      updatePlayback();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!inView || reducedMotion.matches) return;
      const rect = host.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
        return;
      }
      pointerTarget.x = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      pointerTarget.y = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    };

    const refreshFocus = () => {
      activeIndex = focusedIndex >= 0 ? focusedIndex : hoveredIndex;
      if (inView && !document.hidden && width && height) draw(reducedMotion.matches ? 0 : (performance.now() - animationStart) * 0.001);
    };

    const territoryLinks = Array.from(host.closest("section")?.querySelectorAll<HTMLAnchorElement>(".dm-home-hero-territories a") ?? []).slice(0, 4);
    const removeTerritoryListeners = territoryLinks.map((link, index) => {
      const onEnter = () => { hoveredIndex = index; refreshFocus(); };
      const onLeave = () => { if (hoveredIndex === index) hoveredIndex = -1; refreshFocus(); };
      const onFocus = () => { focusedIndex = index; refreshFocus(); };
      const onBlur = () => { if (focusedIndex === index) focusedIndex = -1; refreshFocus(); };
      link.addEventListener("pointerenter", onEnter);
      link.addEventListener("pointerleave", onLeave);
      link.addEventListener("focus", onFocus);
      link.addEventListener("blur", onBlur);
      return () => {
        link.removeEventListener("pointerenter", onEnter);
        link.removeEventListener("pointerleave", onLeave);
        link.removeEventListener("focus", onFocus);
        link.removeEventListener("blur", onBlur);
      };
    });

    const observer = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? false;
      updatePlayback();
    }, { threshold: 0.01 });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    sizeObserver.observe(host);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    resize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      removeTerritoryListeners.forEach((remove) => remove());
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", readScroll);
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
    // countSignature only changes when one of the four visible project counts changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countSignature]);

  return (
    <div className={`${styles.field} dm-home-neural-field`} ref={hostRef} aria-hidden="true">
      <StaticAtlas width={1440} height={900} counts={counts} id={`${elementId}-wide`} className={styles.wideFallback} />
      <StaticAtlas width={390} height={1050} counts={counts} id={`${elementId}-narrow`} className={styles.narrowFallback} />
      <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.canvasReady : ""}`} />
      <div className={`${styles.ambient} ${ready ? styles.ambientReady : ""}`} />
    </div>
  );
}
