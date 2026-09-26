import { useId } from "react";
import styles from "./IntelligenceScene.module.css";

type IntelligenceSceneProps = {
  variant?: "hero" | "compact";
  className?: string;
};

const stages = [
  {
    id: "input",
    number: "01",
    title: "Entrada",
    copy: "Una pregunta o instrucción define el punto de partida. La claridad de la entrada ayuda a orientar la respuesta.",
  },
  {
    id: "context",
    number: "02",
    title: "Contexto",
    copy: "Información relevante puede acompañar la solicitud para darle referencias al modelo. Su calidad importa tanto como su cantidad.",
  },
  {
    id: "model",
    number: "03",
    title: "Modelo y herramientas",
    copy: "El modelo elabora una salida. Algunas tareas permiten consultar herramientas o fuentes adicionales durante el recorrido.",
  },
  {
    id: "review",
    number: "04",
    title: "Verificación",
    copy: "La respuesta se revisa frente a la pregunta y las fuentes disponibles antes de usarla para tomar una decisión.",
  },
] as const;

const stars = [
  [43, 77, 1.6], [100, 135, 1], [154, 55, 1.4], [218, 242, 1.2],
  [276, 51, 1], [449, 77, 1.8], [497, 134, 1], [523, 57, 1.2],
  [641, 62, 1.8], [720, 286, 1], [667, 347, 1.4], [590, 292, 1],
  [73, 242, 1], [94, 475, 1.6], [223, 504, 1.2], [350, 478, 1],
  [479, 506, 1.6], [715, 553, 1.1],
] as const;

/**
 * Ilustración didáctica general. No describe la arquitectura de los proyectos.
 * El póster se renderiza en HTML y los radios cambian el foco sin JavaScript.
 */
export function IntelligenceScene({ variant = "hero", className }: IntelligenceSceneProps) {
  const instanceId = useId().replace(/:/g, "");
  const radioName = `${instanceId}-stage`;

  return (
    <figure className={`${styles.scene} ${variant === "compact" ? styles.compact : ""} ${className ?? ""}`}>
      <div className={styles.visual}>
        <div className={styles.visualTopline} aria-hidden="true">
          <span><span className={styles.liveDot} /> OBSERVATORIO / IA</span>
          <span>FIG. 01 <span className={styles.toplineSeparator}>/</span> 04 ETAPAS</span>
        </div>
        <svg className={styles.svg} viewBox="0 0 760 570" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id={`${instanceId}-night`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#0b2029" />
              <stop offset=".51" stopColor="#07171d" />
              <stop offset="1" stopColor="#102a2c" />
            </linearGradient>
            <radialGradient id={`${instanceId}-atmosphere`} cx="52%" cy="53%" r="64%">
              <stop stopColor="#326d70" stopOpacity=".49" />
              <stop offset=".48" stopColor="#163b42" stopOpacity=".32" />
              <stop offset="1" stopColor="#07171d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${instanceId}-halo`}>
              <stop stopColor="#9df0db" stopOpacity=".43" />
              <stop offset=".42" stopColor="#65c5be" stopOpacity=".15" />
              <stop offset="1" stopColor="#65c5be" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${instanceId}-core`} cx="45%" cy="40%" r="73%">
              <stop stopColor="#27585b" />
              <stop offset=".58" stopColor="#12343c" />
              <stop offset="1" stopColor="#0a2029" />
            </radialGradient>
            <linearGradient id={`${instanceId}-route`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#83e4d4" />
              <stop offset=".35" stopColor="#b9b7e7" />
              <stop offset=".7" stopColor="#90e3d2" />
              <stop offset="1" stopColor="#eebd88" />
            </linearGradient>
            <linearGradient id={`${instanceId}-panel`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#17353b" />
              <stop offset="1" stopColor="#0a222b" />
            </linearGradient>
            <pattern id={`${instanceId}-grid`} width="38" height="38" patternUnits="userSpaceOnUse">
              <path d="M38 0H0V38" fill="none" stroke="#b2d9d3" strokeOpacity=".075" strokeWidth=".8" />
              <circle cx="0" cy="0" r="1" fill="#b2d9d3" fillOpacity=".22" />
            </pattern>
          </defs>

          <rect width="760" height="570" fill={`url(#${instanceId}-night)`} />
          <rect width="760" height="570" fill={`url(#${instanceId}-atmosphere)`} />
          <rect width="760" height="570" fill={`url(#${instanceId}-grid)`} />
          <path d="M0 443C144 389 268 478 410 444S641 355 760 427V570H0Z" fill="#102d34" opacity=".3" />
          <path d="M0 504C140 461 237 506 380 494S624 462 760 503" fill="none" stroke="#9ed9cb" strokeOpacity=".12" />

          <g className={styles.starfield} fill="#b6e9dc">
            {stars.map(([x, y, radius]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={radius} />)}
          </g>
          <g className={styles.depthRings} fill="none" stroke="#8ecbc4">
            <circle cx="401" cy="314" r="155" strokeOpacity=".17" />
            <circle cx="401" cy="314" r="190" strokeOpacity=".11" strokeDasharray="2 10" />
            <circle cx="401" cy="314" r="236" strokeOpacity=".08" />
            <path d="M51 459C233 544 547 512 710 357" strokeOpacity=".13" />
            <path d="M53 267C201 85 522 40 724 304" strokeOpacity=".11" />
          </g>
          <g className={styles.orbit} fill="none" stroke="#a5d9d0">
            <ellipse cx="401" cy="314" rx="178" ry="75" transform="rotate(-27 401 314)" strokeOpacity=".28" strokeDasharray="3 9" />
            <circle cx="242" cy="388" r="3" fill="#a5d9d0" stroke="none" />
            <circle cx="557" cy="245" r="2.5" fill="#eab987" stroke="none" />
          </g>

          <path className={styles.flowGlow} d="M222 357C259 348 238 241 284 190C311 160 359 166 388 208C416 248 386 281 401 314C419 354 474 334 510 375C541 410 541 454 564 464" fill="none" stroke={`url(#${instanceId}-route)`} />
          <path className={styles.flowLine} d="M222 357C259 348 238 241 284 190C311 160 359 166 388 208C416 248 386 281 401 314C419 354 474 334 510 375C541 410 541 454 564 464" fill="none" stroke={`url(#${instanceId}-route)`} />
          <path className={styles.flowCurrent} d="M222 357C259 348 238 241 284 190C311 160 359 166 388 208C416 248 386 281 401 314C419 354 474 334 510 375C541 410 541 454 564 464" fill="none" stroke="#eafff4" />
          <path d="M468 245C512 210 527 166 563 163" fill="none" stroke="#e9bd8b" strokeOpacity=".55" strokeWidth="1.5" />
          <path d="M468 245C512 210 527 166 563 163" fill="none" stroke="#e9bd8b" strokeOpacity=".78" strokeWidth="2" strokeDasharray="2 10" />

          <g className={`${styles.focus} ${styles.focusInput}`}>
            <circle className={styles.nodeHalo} cx="135" cy="361" r="110" fill={`url(#${instanceId}-halo)`} />
            <rect className={styles.nodeFrame} x="37" y="307" width="185" height="111" rx="13" fill={`url(#${instanceId}-panel)`} stroke="#77d8c7" />
            <path d="M37 342H222" stroke="#77d8c7" strokeOpacity=".23" />
            <circle cx="57" cy="325" r="3.5" fill="#83e4d4" />
            <text x="69" y="329" className={styles.nodeMeta}>01 / SEÑAL</text>
            <text x="56" y="374" className={styles.nodeTitle}>ENTRADA</text>
            <text x="56" y="397" className={styles.nodeSub}>pregunta · instrucción</text>
            <path d="M186 366L197 376L186 386M173 386H197" fill="none" stroke="#83e4d4" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="222" cy="357" r="4.5" fill="#83e4d4" />
          </g>

          <g className={`${styles.focus} ${styles.focusContext}`}>
            <circle className={styles.nodeHalo} cx="324" cy="143" r="115" fill={`url(#${instanceId}-halo)`} />
            <rect className={styles.nodeFrame} x="269" y="80" width="177" height="111" rx="13" fill={`url(#${instanceId}-panel)`} stroke="#b7b8e6" />
            <path d="M269 114H446" stroke="#b7b8e6" strokeOpacity=".29" />
            <circle cx="289" cy="98" r="3.5" fill="#b7b8e6" />
            <text x="301" y="102" className={styles.nodeMeta}>02 / MEMORIA</text>
            <text x="289" y="145" className={styles.nodeTitle}>CONTEXTO</text>
            <path d="M289 161H390M289 173H359" stroke="#b7b8e6" strokeOpacity=".58" strokeLinecap="round" strokeWidth="2" />
            <path d="M411 157H428M411 166H423M411 175H432" stroke="#b7b8e6" strokeOpacity=".85" strokeLinecap="round" strokeWidth="2" />
            <circle cx="284" cy="190" r="4.5" fill="#b7b8e6" />
          </g>

          <g className={`${styles.focus} ${styles.focusModel}`}>
            <circle className={styles.coreHalo} cx="401" cy="314" r="173" fill={`url(#${instanceId}-halo)`} />
            <circle cx="401" cy="314" r="116" fill="none" stroke="#a8e3da" strokeOpacity=".2" strokeWidth="1" />
            <circle className={styles.coreRim} cx="401" cy="314" r="103" fill={`url(#${instanceId}-core)`} stroke="#8ce4d3" strokeOpacity=".72" strokeWidth="1.5" />
            <circle cx="401" cy="314" r="87" fill="none" stroke="#b5eee0" strokeOpacity=".25" strokeDasharray="3 8" />
            <circle cx="401" cy="314" r="72" fill="none" stroke="#b5eee0" strokeOpacity=".22" />
            <path d="M337 321L359 283L391 300L419 268L453 292L469 328L439 357L398 344L368 362Z" fill="none" stroke="#a7e9da" strokeOpacity=".51" strokeWidth="1.2" />
            <path d="M359 283L398 344L419 268M391 300L439 357M337 321L469 328M368 362L453 292" fill="none" stroke="#a7e9da" strokeOpacity=".29" />
            <circle cx="359" cy="283" r="3" fill="#a4e9da" /><circle cx="419" cy="268" r="3" fill="#a4e9da" />
            <circle cx="469" cy="328" r="3" fill="#eebd88" /><circle cx="368" cy="362" r="3" fill="#b8b8e6" />
            <circle className={styles.coreCenter} cx="401" cy="314" r="48" fill="#0e2b32" stroke="#a6ead9" strokeOpacity=".59" />
            <circle cx="401" cy="314" r="40" fill="#153a3d" fillOpacity=".78" />
            <text x="401" y="308" textAnchor="middle" className={styles.coreNumber}>03</text>
            <text x="401" y="332" textAnchor="middle" className={styles.coreTitle}>MODELO</text>
            <path d="M401 205V216M401 412V423M292 314H303M499 314H510" stroke="#b3eadc" strokeOpacity=".65" />
            <circle cx="401" cy="205" r="3" fill="#b3eadc" />

            <circle className={styles.nodeHalo} cx="641" cy="168" r="97" fill={`url(#${instanceId}-halo)`} />
            <rect className={styles.nodeFrame} x="563" y="116" width="168" height="107" rx="13" fill={`url(#${instanceId}-panel)`} stroke="#eebd88" />
            <path d="M563 149H731" stroke="#eebd88" strokeOpacity=".26" />
            <circle cx="583" cy="133" r="3.5" fill="#eebd88" />
            <text x="595" y="137" className={styles.nodeMeta}>EXTENSIÓN</text>
            <text x="582" y="178" className={styles.nodeTitleSmall}>HERRAMIENTAS</text>
            <path d="M582 197H611M620 197H648M657 197H684" stroke="#eebd88" strokeWidth="2" strokeLinecap="round" opacity=".7" />
            <circle cx="563" cy="163" r="4.5" fill="#eebd88" />
          </g>

          <g className={`${styles.focus} ${styles.focusReview}`}>
            <circle className={styles.nodeHalo} cx="649" cy="471" r="106" fill={`url(#${instanceId}-halo)`} />
            <rect className={styles.nodeFrame} x="564" y="417" width="168" height="105" rx="13" fill={`url(#${instanceId}-panel)`} stroke="#eebd88" />
            <path d="M564 450H732" stroke="#eebd88" strokeOpacity=".26" />
            <circle cx="584" cy="434" r="3.5" fill="#eebd88" />
            <text x="596" y="438" className={styles.nodeMeta}>04 / CRITERIO</text>
            <text x="583" y="480" className={styles.nodeTitleSmall}>VERIFICACIÓN</text>
            <path d="M584 499H673" stroke="#eebd88" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
            <circle cx="706" cy="484" r="12" fill="none" stroke="#eebd88" strokeWidth="1.5" />
            <path d="M700 484L705 489L713 479" fill="none" stroke="#eebd88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="564" cy="464" r="4.5" fill="#eebd88" />
          </g>

          <g className={styles.diagramAnnotations}>
            <text x="36" y="71">ENTRADA → CONTEXTO → MODELO → VERIFICACIÓN</text>
            <text x="36" y="548">UNA SECUENCIA POSIBLE / NO UNA ARQUITECTURA REAL</text>
            <text x="724" y="548" textAnchor="end">DAÍMON · MOUSEÎON</text>
          </g>
        </svg>
        <svg className={styles.mobileSvg} viewBox="0 0 320 440" role="presentation" focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id={`${instanceId}-mobile-night`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#0c222b" />
              <stop offset=".6" stopColor="#07191f" />
              <stop offset="1" stopColor="#102b2f" />
            </linearGradient>
            <radialGradient id={`${instanceId}-mobile-halo`}>
              <stop stopColor="#8ce8d3" stopOpacity=".39" />
              <stop offset="1" stopColor="#8ce8d3" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${instanceId}-mobile-route`} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#83e4d4" />
              <stop offset=".35" stopColor="#b9b7e7" />
              <stop offset=".7" stopColor="#91e2d0" />
              <stop offset="1" stopColor="#eebd88" />
            </linearGradient>
            <pattern id={`${instanceId}-mobile-grid`} width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M25 0H0V25" fill="none" stroke="#a3d2c9" strokeOpacity=".09" />
            </pattern>
          </defs>
          <rect width="320" height="440" fill={`url(#${instanceId}-mobile-night)`} />
          <rect width="320" height="440" fill={`url(#${instanceId}-mobile-grid)`} />
          <circle cx="133" cy="268" r="149" fill={`url(#${instanceId}-mobile-halo)`} opacity=".6" />
          <g fill="none" stroke="#9bd4c9" strokeOpacity=".2">
            <circle cx="129" cy="267" r="94" />
            <circle cx="129" cy="267" r="116" strokeDasharray="2 8" />
            <path d="M12 29H308M12 429H308" />
          </g>
          <g fill="#a7ded2" opacity=".65">
            <circle cx="37" cy="26" r="1.5" /><circle cx="277" cy="39" r="1" />
            <circle cx="306" cy="213" r="1.5" /><circle cx="27" cy="214" r="1" />
            <circle cx="34" cy="393" r="1.5" /><circle cx="91" cy="416" r="1" />
          </g>
          <path className={styles.flowGlow} d="M150 80C180 98 152 130 167 155C182 180 221 175 236 201C251 229 202 214 159 225C126 234 119 249 124 278C130 312 164 316 176 345C182 359 170 371 166 385" fill="none" stroke={`url(#${instanceId}-mobile-route)`} />
          <path className={styles.flowLine} d="M150 80C180 98 152 130 167 155C182 180 221 175 236 201C251 229 202 214 159 225C126 234 119 249 124 278C130 312 164 316 176 345C182 359 170 371 166 385" fill="none" stroke={`url(#${instanceId}-mobile-route)`} />
          <path className={styles.flowCurrent} d="M150 80C180 98 152 130 167 155C182 180 221 175 236 201C251 229 202 214 159 225C126 234 119 249 124 278C130 312 164 316 176 345C182 359 170 371 166 385" fill="none" stroke="#eafff4" />
          <path d="M187 266C195 264 200 264 208 269" fill="none" stroke="#eebd88" strokeWidth="2" strokeOpacity=".8" />

          <g className={`${styles.focus} ${styles.focusInput}`}>
            <circle className={styles.nodeHalo} cx="84" cy="82" r="88" fill={`url(#${instanceId}-mobile-halo)`} />
            <rect className={styles.nodeFrame} x="17" y="42" width="133" height="78" rx="10" fill="#102c34" stroke="#83e4d4" />
            <path d="M17 69H150" stroke="#83e4d4" strokeOpacity=".29" />
            <circle cx="31" cy="56" r="3" fill="#83e4d4" />
            <text x="41" y="61" className={styles.mobileMeta}>01 / SEÑAL</text>
            <text x="29" y="98" className={styles.mobileTitle}>ENTRADA</text>
            <circle cx="150" cy="80" r="4" fill="#83e4d4" />
          </g>

          <g className={`${styles.focus} ${styles.focusContext}`}>
            <circle className={styles.nodeHalo} cx="234" cy="160" r="85" fill={`url(#${instanceId}-mobile-halo)`} />
            <rect className={styles.nodeFrame} x="167" y="119" width="136" height="82" rx="10" fill="#142b39" stroke="#b9b7e7" />
            <path d="M167 146H303" stroke="#b9b7e7" strokeOpacity=".29" />
            <circle cx="181" cy="133" r="3" fill="#b9b7e7" />
            <text x="191" y="138" className={styles.mobileMeta}>02 / REFERENCIA</text>
            <text x="179" y="176" className={styles.mobileTitle}>CONTEXTO</text>
            <circle cx="167" cy="155" r="4" fill="#b9b7e7" />
          </g>

          <g className={`${styles.focus} ${styles.focusModel}`}>
            <circle className={styles.coreHalo} cx="127" cy="274" r="103" fill={`url(#${instanceId}-mobile-halo)`} />
            <circle className={styles.coreRim} cx="127" cy="274" r="70" fill="#133a3f" stroke="#8ce4d3" strokeWidth="1.6" />
            <circle cx="127" cy="274" r="58" fill="none" stroke="#b5eee0" strokeOpacity=".48" strokeDasharray="3 7" />
            <circle cx="127" cy="274" r="46" fill="none" stroke="#b5eee0" strokeOpacity=".28" />
            <path d="M84 274L106 241L138 255L165 237L177 281L144 309L106 306Z" fill="none" stroke="#b5eee0" strokeOpacity=".55" />
            <circle cx="106" cy="241" r="2.5" fill="#b5eee0" /><circle cx="177" cy="281" r="2.5" fill="#eebd88" />
            <circle className={styles.coreCenter} cx="127" cy="274" r="36" fill="#0e2b32" stroke="#a6ead9" />
            <text x="127" y="270" textAnchor="middle" className={styles.mobileCoreNumber}>03</text>
            <text x="127" y="289" textAnchor="middle" className={styles.mobileCoreTitle}>MODELO</text>
            <circle className={styles.nodeHalo} cx="256" cy="282" r="63" fill={`url(#${instanceId}-mobile-halo)`} />
            <rect className={styles.nodeFrame} x="208" y="247" width="97" height="69" rx="10" fill="#25312f" stroke="#eebd88" />
            <path d="M208 273H305" stroke="#eebd88" strokeOpacity=".29" />
            <circle cx="220" cy="260" r="3" fill="#eebd88" />
            <text x="230" y="265" className={styles.mobileMeta}>EXTENSIÓN</text>
            <text x="216" y="297" className={styles.mobileToolTitle}>HERRAMIENTAS</text>
          </g>

          <g className={`${styles.focus} ${styles.focusReview}`}>
            <circle className={styles.nodeHalo} cx="235" cy="381" r="78" fill={`url(#${instanceId}-mobile-halo)`} />
            <rect className={styles.nodeFrame} x="166" y="351" width="138" height="68" rx="10" fill="#24312e" stroke="#eebd88" />
            <path d="M166 376H304" stroke="#eebd88" strokeOpacity=".29" />
            <circle cx="180" cy="363" r="3" fill="#eebd88" />
            <text x="190" y="368" className={styles.mobileMeta}>04 / CRITERIO</text>
            <text x="178" y="401" className={styles.mobileReviewTitle}>VERIFICACIÓN</text>
            <circle cx="166" cy="385" r="4" fill="#eebd88" />
          </g>
        </svg>
      </div>

      <fieldset className={styles.stages}>
        <legend className={styles.legend}>Explora las etapas del esquema</legend>
        {stages.map((stage, index) => (
          <label className={styles.stage} key={stage.id}>
            <input
              className={styles.radio}
              type="radio"
              name={radioName}
              value={stage.id}
              aria-describedby={`${instanceId}-copy-${stage.id}`}
              defaultChecked={index === 0}
            />
            <span className={styles.stageNumber}>{stage.number}</span>
            <span className={styles.stageTitle}>{stage.title}</span>
            <span className={styles.stageArrow} aria-hidden="true">↗</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.lesson} aria-live="off">
        {stages.map((stage) => (
          <p key={stage.id} id={`${instanceId}-copy-${stage.id}`} className={`${styles.lessonItem} ${styles[`copy_${stage.id}`]}`}>
            <strong>{stage.title}.</strong> {stage.copy}
          </p>
        ))}
      </div>
      <figcaption className={styles.caption}>
        Esquema conceptual de una interacción posible con IA. No representa la arquitectura ni el estado de ningún proyecto del catálogo.
      </figcaption>
    </figure>
  );
}

export default IntelligenceScene;
