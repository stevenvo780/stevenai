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

/**
 * Ilustración didáctica general. No describe la arquitectura de los proyectos del catálogo.
 * Los radios y el CSS cambian el foco y el texto sin JavaScript.
 */
export function IntelligenceScene({ variant = "hero", className }: IntelligenceSceneProps) {
  const instanceId = useId();
  const radioName = `${instanceId}-stage`;

  return (
    <figure className={`${styles.scene} ${variant === "compact" ? styles.compact : ""} ${className ?? ""}`}>
      <div className={styles.visual}>
        <svg
          className={styles.svg}
          viewBox="0 0 960 500"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id={`${instanceId}-wash`} cx="52%" cy="47%" r="60%">
              <stop offset="0%" stopColor="#14393d" stopOpacity=".76" />
              <stop offset="68%" stopColor="#0a2026" stopOpacity=".34" />
              <stop offset="100%" stopColor="#071519" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${instanceId}-flow`} x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#8ee9d4" />
              <stop offset=".55" stopColor="#b6abde" />
              <stop offset="1" stopColor="#f1bb7c" />
            </linearGradient>
          </defs>

          <rect width="960" height="500" fill="#071519" />
          <rect width="960" height="500" fill={`url(#${instanceId}-wash)`} />

          <g className={styles.grid} stroke="#54727a" strokeWidth="1" opacity=".12">
            <path d="M0 86H960M0 166H960M0 246H960M0 326H960M0 406H960" />
            <path d="M80 0V500M240 0V500M400 0V500M560 0V500M720 0V500M880 0V500" />
          </g>

          <g fill="none" stroke="#6b9599" strokeWidth="1.5" opacity=".38">
            <path d="M195 244H249Q267 244 267 226V158Q267 137 289 137H316" />
            <path d="M196 256H351Q372 256 391 256H421" />
            <path d="M430 155Q430 179 447 187" />
            <path d="M626 237H664Q682 237 682 218V156Q682 138 701 138H720" />
            <path d="M626 276H676Q698 276 698 302V353Q698 371 718 371H738" />
            <path d="M786 213V284Q786 303 799 318" />
          </g>

          <g className={`${styles.focus} ${styles.focusInput}`}>
            <path d="M195 256H420" fill="none" stroke="#8ee9d4" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <rect x="57" y="174" width="139" height="141" rx="22" fill="#10272b" stroke="#8ee9d4" strokeWidth="1.7" />
            <path d="M79 211L92 225L79 239M104 239H133" stroke="#8ee9d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M79 262H173M79 278H145" stroke="#8ee9d4" strokeWidth="2" opacity=".52" strokeLinecap="round" />
            <circle cx="195" cy="256" r="5" fill="#8ee9d4" />
            <text x="57" y="156" className={styles.nodeLabel}>01 / ENTRADA</text>
          </g>

          <g className={`${styles.focus} ${styles.focusContext}`}>
            <path d="M195 244H249Q267 244 267 226V158Q267 137 289 137H315" fill="none" stroke="#b6abde" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <path d="M430 155Q430 179 447 187" fill="none" stroke="#b6abde" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <rect x="310" y="62" width="138" height="101" rx="17" fill="#111f2e" stroke="#b6abde" strokeWidth="1.5" />
            <rect x="322" y="74" width="138" height="101" rx="17" fill="#162b37" stroke="#b6abde" strokeWidth="1.5" />
            <path d="M344 106H426M344 124H415M344 142H393" stroke="#b6abde" strokeWidth="2" strokeLinecap="round" opacity=".85" />
            <circle cx="428" cy="143" r="5" fill="#b6abde" />
            <text x="322" y="50" className={styles.nodeLabel}>02 / CONTEXTO</text>
          </g>

          <g className={`${styles.focus} ${styles.focusModel}`}>
            <path d="M626 237H664Q682 237 682 218V156Q682 138 701 138H720" fill="none" stroke="#f1bb7c" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <path d="M626 276H676Q698 276 698 302V353Q698 371 718 371H738" fill="none" stroke="#f1bb7c" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <rect x="419" y="186" width="209" height="163" rx="27" fill="#102b30" stroke="#8ee9d4" strokeWidth="1.8" />
            <rect x="439" y="205" width="169" height="124" rx="18" fill="#17373a" stroke="#457e82" strokeWidth="1" />
            <path d="M459 228H588M459 309H588" stroke="#8ee9d4" strokeWidth="1" opacity=".46" />
            <path d="M464 265H487L500 244L518 286L535 253L550 272H582" stroke="#8ee9d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="467" cy="228" r="3" fill="#f1bb7c" />
            <circle cx="580" cy="309" r="3" fill="#f1bb7c" />
            <rect x="715" y="91" width="160" height="122" rx="20" fill="#2b2424" stroke="#f1bb7c" strokeWidth="1.5" />
            <path d="M740 139H850M740 164H824" stroke="#f1bb7c" strokeWidth="2" strokeLinecap="round" opacity=".74" />
            <circle cx="747" cy="113" r="6" fill="#f1bb7c" />
            <circle cx="768" cy="113" r="6" fill="#f1bb7c" opacity=".5" />
            <text x="419" y="173" className={styles.nodeLabel}>03 / MODELO</text>
            <text x="715" y="79" className={styles.nodeLabel}>HERRAMIENTAS</text>
          </g>

          <g className={`${styles.focus} ${styles.focusReview}`}>
            <path d="M786 213V284Q786 303 799 318" fill="none" stroke="#f1bb7c" strokeWidth="2.5" strokeDasharray="4 8" className={styles.trace} />
            <rect x="738" y="318" width="164" height="105" rx="20" fill="#23302c" stroke="#f1bb7c" strokeWidth="1.7" />
            <circle cx="779" cy="368" r="21" fill="none" stroke="#f1bb7c" strokeWidth="2.5" />
            <path d="M768 368L776 376L791 358" fill="none" stroke="#f1bb7c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M816 351H878M816 368H867M816 385H854" stroke="#f1bb7c" strokeWidth="2" opacity=".7" strokeLinecap="round" />
            <text x="738" y="306" className={styles.nodeLabel}>04 / VERIFICACIÓN</text>
          </g>

          <g fill="none" opacity=".38">
            <path d="M56 388H335" stroke={`url(#${instanceId}-flow)`} strokeWidth="1" />
            <path d="M56 392H233" stroke="#8ee9d4" strokeWidth="1" />
            <circle cx="56" cy="390" r="3" fill="#8ee9d4" />
            <circle cx="335" cy="388" r="3" fill="#f1bb7c" />
          </g>
          <text x="57" y="449" className={styles.canvasNote}>INTELIGENCIA / LECTURA DE UNA POSIBLE SECUENCIA</text>
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
