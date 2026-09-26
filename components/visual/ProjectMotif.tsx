import type { AIComponent } from "@/lib/components-data";
import type { ReactNode } from "react";
import styles from "./ProjectMotif.module.css";

type Category = AIComponent["category"];
type MotifProps = { className?: string };

export type ProjectMotifProps = MotifProps & {
  projectKey: string;
  category: Category;
  compact?: boolean;
};

export type GroupMotifProps = MotifProps & { category: Category };

type ProjectKey =
  | "jarvis-v1"
  | "jarvis-v2"
  | "ia-gguf"
  | "mcp-swarm"
  | "mcp-agents"
  | "pdf-converter"
  | "kratos-jarvis"
  | "clawbar"
  | "night-harness"
  | "ai-usage-live"
  | "reel-forge"
  | "cauce-v3"
  | "clawbus"
  | "prizma-agent-stack"
  | "agora-mcp"
  | "cloud-delegate"
  | "talos-harness"
  | "minimax-h3"
  | "pixel-art-replicate"
  | "neuronal-learning"
  | "agora-ai-agent";

type Composition = "left" | "right" | "center" | "rise" | "drop";
type MotifSpec = { category: Category; accent: string; composition: Composition };

// Explicit editorial treatment for every catalogue key. These shapes carry no runtime data.
const PROJECT_MOTIFS: Record<ProjectKey, MotifSpec> = {
  "jarvis-v1": { category: "assistants", accent: "#8ee9d4", composition: "left" },
  "jarvis-v2": { category: "assistants", accent: "#b8a9dd", composition: "right" },
  "ia-gguf": { category: "models", accent: "#b8a9dd", composition: "left" },
  "mcp-swarm": { category: "infrastructure", accent: "#f1bb7c", composition: "left" },
  "mcp-agents": { category: "infrastructure", accent: "#8ee9d4", composition: "right" },
  "pdf-converter": { category: "tools", accent: "#f1bb7c", composition: "left" },
  "kratos-jarvis": { category: "assistants", accent: "#f1bb7c", composition: "center" },
  "clawbar": { category: "assistants", accent: "#8ee9d4", composition: "drop" },
  "night-harness": { category: "infrastructure", accent: "#b8a9dd", composition: "rise" },
  "ai-usage-live": { category: "tools", accent: "#8ee9d4", composition: "right" },
  "reel-forge": { category: "tools", accent: "#f1bb7c", composition: "center" },
  "cauce-v3": { category: "infrastructure", accent: "#8ee9d4", composition: "drop" },
  "clawbus": { category: "infrastructure", accent: "#f1bb7c", composition: "center" },
  "prizma-agent-stack": { category: "infrastructure", accent: "#b8a9dd", composition: "left" },
  "agora-mcp": { category: "infrastructure", accent: "#8ee9d4", composition: "right" },
  "cloud-delegate": { category: "infrastructure", accent: "#b8a9dd", composition: "rise" },
  "talos-harness": { category: "infrastructure", accent: "#f1bb7c", composition: "drop" },
  "minimax-h3": { category: "tools", accent: "#b8a9dd", composition: "rise" },
  "pixel-art-replicate": { category: "tools", accent: "#8ee9d4", composition: "drop" },
  "neuronal-learning": { category: "models", accent: "#f1bb7c", composition: "right" },
  "agora-ai-agent": { category: "assistants", accent: "#b8a9dd", composition: "rise" },
};

const GROUP_ACCENTS: Record<Category, string> = {
  assistants: "#8ee9d4",
  infrastructure: "#f1bb7c",
  models: "#b8a9dd",
  tools: "#8ee9d4",
};

function Field({ category }: { category: Category }) {
  switch (category) {
    case "assistants":
      return (
        <g className={styles.field} fill="none" stroke="#517f80" strokeWidth="1.5">
          <path d="M-8 50C40 50 31 88 75 88M-8 65C38 65 37 103 75 103M-8 80C40 80 37 118 75 118" />
          <path d="M327 103C357 103 358 66 410 66M327 118C358 118 360 82 410 82M327 133C358 133 361 98 410 98" />
          <circle cx="58" cy="96" r="3" fill="#8ee9d4" stroke="none" />
          <circle cx="349" cy="112" r="3" fill="#8ee9d4" stroke="none" />
        </g>
      );
    case "infrastructure":
      return (
        <g className={styles.field} fill="none" stroke="#6e7366" strokeWidth="1.3">
          <path d="M0 33H71V70H106M0 184H70V153H106M400 38H338V78H307M400 186H338V149H307" />
          <path d="M15 123H73M328 111H389" strokeDasharray="3 6" />
          <path d="M63 65l7 7 7-7-7-7zM331 73l7 7 7-7-7-7zM331 144l7 7 7-7-7-7z" fill="#f1bb7c" stroke="none" />
        </g>
      );
    case "models":
      return (
        <g className={styles.field} fill="none" stroke="#777096" strokeWidth="1.2">
          <path d="M30 0V220M47 0V220M64 0V220M336 0V220M353 0V220M370 0V220" strokeDasharray="2 9" />
          <path d="M0 35H400M0 185H400" strokeDasharray="5 9" />
          <circle cx="46" cy="48" r="4" fill="#b8a9dd" stroke="none" />
          <circle cx="353" cy="172" r="4" fill="#b8a9dd" stroke="none" />
        </g>
      );
    case "tools":
      return (
        <g className={styles.field} fill="none" stroke="#697971" strokeWidth="1.3">
          <path d="M16 23h66M16 23v58M384 23h-66M384 23v58M16 197h66M16 197v-58M384 197h-66M384 197v-58" />
          <path d="M0 109H59M341 109H400" strokeDasharray="3 7" />
          <path d="M27 36h36M27 47h25M337 173h36M348 184h25" />
        </g>
      );
  }
}

// Four abstract materials: conversation, construction, study, and making.
// Their lines are ornamental and deliberately do not describe a running system.
function Scene({ category }: { category: Category }) {
  switch (category) {
    case "assistants":
      return (
        <g className={styles.scene}>
          <ellipse className={styles.glow} cx="200" cy="111" rx="116" ry="87" />
          <ellipse className={styles.surface} cx="200" cy="111" rx="133" ry="78" />
          <ellipse className={styles.edge} cx="200" cy="111" rx="119" ry="68" />
          <path className={styles.etch} d="M66 110c28-41 65-67 113-76m42 152c48-9 85-35 113-76M79 68c-12 15-19 29-22 43m264 41c10-12 17-26 21-42" />
          <circle className={styles.pin} cx="73" cy="110" r="3" />
          <circle className={styles.pin} cx="327" cy="110" r="3" />
        </g>
      );
    case "infrastructure":
      return (
        <g className={styles.scene}>
          <path className={styles.glow} d="M58 165 200 205l142-40-142-41Z" />
          <path className={styles.floor} d="m71 163 129 34 129-34-129-33z" />
          <path className={styles.surface} d="M90 43h220l22 23v91l-22 23H90l-22-23V66z" />
          <path className={styles.edge} d="M98 53h204l19 19v79l-19 19H98l-19-19V72z" />
          <path className={styles.etch} d="M68 66h31M68 157h31m202-91h31m-31 91h31M90 180l110 29 110-29" />
          <path className={styles.pin} d="m200 17 7 7-7 7-7-7z" />
        </g>
      );
    case "models":
      return (
        <g className={styles.scene}>
          <ellipse className={styles.glow} cx="204" cy="111" rx="148" ry="83" />
          <path className={styles.floor} d="m91 58 192-18 31 114-191 23z" />
          <path className={styles.surface} d="m100 48 195 16-10 118-195-16z" />
          <path className={styles.edge} d="m113 58 171 14-9 97-171-14z" />
          <path className={styles.etch} d="m74 46 32 3M296 64l32 3M90 166l-31-2m226 18 31 3M46 107h38m234 5h36" />
          <circle className={styles.pin} cx="56" cy="107" r="3" />
          <circle className={styles.pin} cx="344" cy="112" r="3" />
        </g>
      );
    case "tools":
      return (
        <g className={styles.scene}>
          <path className={styles.glow} d="M45 54h310v134H45z" />
          <path className={styles.floor} d="M55 176h290l-21 18H76z" />
          <path className={styles.surface} d="M72 43h256l27 26v101l-27 20H72l-27-20V69z" />
          <path className={styles.edge} d="M85 56h230l25 22v82l-25 17H85l-25-17V78z" />
          <path className={styles.etch} d="M60 78h24m232 0h24M60 160h24m232 0h24M86 190h228" />
          <circle className={styles.pin} cx="59" cy="56" r="3" />
          <circle className={styles.pin} cx="341" cy="177" r="3" />
        </g>
      );
  }
}

function Ambient({ category }: { category: Category }) {
  switch (category) {
    case "assistants":
      return <g className={styles.ambient}><circle cx="200" cy="110" r="91" /><circle cx="200" cy="110" r="103" /><path d="M19 35h82m198 150h82" /></g>;
    case "infrastructure":
      return <g className={styles.ambient}><path d="M42 27h316v166H42zM29 42h44m254 136h44M29 178h44M327 42h44" /><path d="m42 27 27-17m289 17-27-17M42 193l27 17m289-17-27 17" /></g>;
    case "models":
      return <g className={styles.ambient}><ellipse cx="200" cy="110" rx="149" ry="91" /><ellipse cx="200" cy="110" rx="132" ry="105" /><path d="M12 110h51m274 0h51M200 10v26m0 148v26" /></g>;
    case "tools":
      return <g className={styles.ambient}><path d="M23 33h72m-72 0v45m354-45h-72m72 0v45M23 187h72m-72 0v-45m354 45h-72m72 0v-45" /><path d="M36 43h22m284 0h22M36 177h22m284 0h22" /></g>;
  }
}

function Countermark({ composition }: { composition: Composition }) {
  switch (composition) {
    case "left":
      return <g className={styles.countermark} fill="none" stroke="currentColor" strokeLinecap="round"><path d="M0 0h42m-42 9h25m-25 9h34" /><circle cx="49" cy="0" r="2" fill="currentColor" stroke="none" /></g>;
    case "right":
      return <g className={styles.countermark} fill="none" stroke="currentColor" strokeLinecap="round"><circle cx="15" cy="11" r="10" /><path d="M15-4v-8m0 46v-8M0 11h-8m46 0h-8m-15-5v10" /></g>;
    case "center":
      return <g className={styles.countermark} fill="none" stroke="currentColor"><path d="m4 10 8-8 8 8-8 8zM30 10l5-5 5 5-5 5z" /><path d="M0 26h44" /></g>;
    case "rise":
      return <g className={styles.countermark} fill="none" stroke="currentColor"><path d="M0 20h10V10h10V0h10m-30 29h40" /><circle cx="35" cy="0" r="2" fill="currentColor" stroke="none" /></g>;
    case "drop":
      return <g className={styles.countermark} fill="none" stroke="currentColor"><path d="M0 0h11v10h11v10h11m-33 9h42" /><circle cx="38" cy="20" r="2" fill="currentColor" stroke="none" /></g>;
  }
}

function ProjectGlyph({ projectKey }: { projectKey: ProjectKey }) {
  switch (projectKey) {
    case "jarvis-v1":
      return <g><path d="M197 47c-24-21-64-3-62 28-31-1-39 36-17 52-12 27 15 53 41 43 20 23 47 12 47-7V64c0-9-3-14-9-17Zm14 0c24-21 64-3 62 28 31-1 39 36 17 52 12 27-15 53-41 43-20 23-47 12-47-7V64c0-9 3-14 9-17Z" /><path d="M159 71c18 0 29 13 29 27m-48 28c22-5 37 3 43 20m52-70c-13 6-19 18-19 33m52 22c-22-6-38 0-46 18" /><circle cx="180" cy="98" r="4" fill="currentColor" /><circle cx="224" cy="111" r="4" fill="currentColor" /></g>;
    case "jarvis-v2":
      return <g><rect x="100" y="55" width="76" height="91" rx="10" /><rect x="230" y="76" width="76" height="91" rx="10" /><path d="M117 80h42m-42 16h34m-34 16h42m130-11h-42m42 16h-30m30 16h-42M179 104c14-20 29-20 43 0m-43 24c14 20 29 20 43 0" /><rect x="179" y="94" width="43" height="43" rx="12" fill="#143338" /><path d="m191 116 9-10 9 10-9 10z" fill="currentColor" /></g>;
    case "ia-gguf":
      return <g><path d="M106 61h187v98H106zM106 85h187M106 110h187M106 135h187M144 61v98M182 61v98M220 61v98M258 61v98" /><path d="M115 69h20v8h-20zm38 25h20v8h-20zm38 25h20v8h-20zm38 25h20v8h-20zm38-75h17v8h-17z" fill="currentColor" stroke="none" /></g>;
    case "mcp-swarm":
      return <g><path d="M94 109h49m0 0 45-48m-45 48 45 0m-45 0 45 48m36-96 45 48-45 48m-36-96h36m-36 48h36m-36 48h36m45-48h39" /><circle cx="94" cy="109" r="10" fill="currentColor" /><circle cx="188" cy="61" r="9" fill="currentColor" /><circle cx="188" cy="109" r="9" fill="currentColor" /><circle cx="188" cy="157" r="9" fill="currentColor" /><rect x="264" y="99" width="20" height="20" rx="3" fill="currentColor" /></g>;
    case "mcp-agents":
      return <g><path d="M111 52h67v116h-67zM222 52h67v116h-67zM179 83h42M179 137h42" /><path d="M127 76h35m-35 17h25m-25 45h35m76-62h35m-35 17h25m-25 45h35" /><circle cx="200" cy="110" r="19" fill="#183237" /><path d="M190 110h20m-10-10v20" /></g>;
    case "pdf-converter":
      return <g><path d="M108 45h106l29 29v106H108zM214 45v29h29M266 77h44v103H204" /><path d="M128 100h91m-91 18h77m-77 18h63m75-32h28m-28 18h28m-28 18h21M240 145h21m-9-9 9 9-9 9" /></g>;
    case "kratos-jarvis":
      return <g><path d="M200 42 279 73v49c0 38-29 59-79 78-50-19-79-40-79-78V73z" /><path d="M143 114v18m16-34v50m16-68v82m16-49v18m16-28v40m16-57v68m16-43v22m16-28v35" strokeWidth="3" /><path d="M154 175h92" opacity=".4" /></g>;
    case "clawbar":
      return <g><rect x="87" y="76" width="226" height="69" rx="17" /><path d="m109 98 15 13-15 13m25 0h34M194 95v31m12-31v31M235 101h54m-54 16h37" /><circle cx="281" cy="111" r="6" fill="currentColor" /></g>;
    case "night-harness":
      return <g><path d="M119 56a53 53 0 1 0 75 69 55 55 0 0 1-75-69Z" fill="currentColor" opacity=".3" /><path d="M104 165h207M124 154v22m39-22v22m39-22v22m39-22v22m39-22v22" /><circle cx="124" cy="165" r="5" fill="currentColor" /><circle cx="202" cy="165" r="5" fill="currentColor" /><circle cx="280" cy="165" r="5" fill="currentColor" /><path d="m255 76 7-16 7 16 16 7-16 7-7 16-7-16-16-7z" /></g>;
    case "ai-usage-live":
      return <g><path d="M100 176V84m43 92V118m43 58V65m43 111V99m43 77V50m43 126V129M81 176h239" strokeWidth="9" /><path d="M100 64h71m-71 13h42M228 68h40" opacity=".45" /></g>;
    case "reel-forge":
      return <g><rect x="89" y="57" width="220" height="113" rx="7" /><path d="M89 81h220M89 145h220M122 57v113m54-113v113m55-113v113m54-113v113" /><path d="m179 96 39 17-39 17z" fill="currentColor" /><circle cx="106" cy="69" r="3" fill="currentColor" /><circle cx="289" cy="157" r="3" fill="currentColor" /></g>;
    case "cauce-v3":
      return <g><path d="M84 62c87 0 74 96 153 96h79M84 110h232M84 158c87 0 74-96 153-96h79" strokeWidth="3" /><path d="M105 48v124M292 48v124" opacity=".5" /><circle cx="105" cy="62" r="6" fill="currentColor" /><circle cx="105" cy="110" r="6" fill="currentColor" /><circle cx="105" cy="158" r="6" fill="currentColor" /><circle cx="292" cy="62" r="6" fill="currentColor" /><circle cx="292" cy="110" r="6" fill="currentColor" /><circle cx="292" cy="158" r="6" fill="currentColor" /></g>;
    case "clawbus":
      return <g><path d="M77 110h246" /><path d="M91 66h72v52h-17l-15 14v-14H91zM166 114h73v51h-15l-15 14v-14h-43zM242 61h73v52h-17l-15 14v-14h-41z" /><path d="M106 84h42m-42 15h27m48 33h42m-42 15h27m49-68h42m-42 15h27" /></g>;
    case "prizma-agent-stack":
      return <g><path d="m200 44 100 42-100 42L100 86zM100 111l100 42 100-42M100 136l100 42 100-42" /><path d="M200 128v50M100 86v50m200-50v50" opacity=".55" /><circle cx="200" cy="86" r="12" fill="currentColor" /></g>;
    case "agora-mcp":
      return <g><path d="M91 169h218M106 92h188M119 92v77m42-77v77m78-77v77m42-77v77M99 83l101-43 101 43z" /><path d="M183 114h34v55h-34z" /><circle cx="200" cy="62" r="5" fill="currentColor" /></g>;
    case "cloud-delegate":
      return <g><path d="M127 132c-20 0-34-14-34-34 0-18 14-32 33-34 9-29 58-38 78-13 28-10 59 9 62 37 18 0 31 13 31 29 0 17-14 29-30 29H127z" /><path d="M165 146v27h69v-27M183 162h33" /><path d="m164 116 27-18 27 18m-27-18v42" /></g>;
    case "talos-harness":
      return <g><path d="M107 58h187v117H107zM107 86h187M136 110h32v32h-32zM184 110h32v32h-32zM232 110h32v32h-32z" /><path d="m141 125 9 9 16-20m68 14 7 7 17-22" /><circle cx="124" cy="72" r="4" fill="currentColor" /><circle cx="138" cy="72" r="4" fill="currentColor" /></g>;
    case "minimax-h3":
      return <g><path d="M115 42h170v138H115zM133 66h134M133 84h134M133 105h58v54h-58zM206 105h61m-61 17h61m-61 17h52m-61 17h61" /><path d="M115 42h170v14H115z" fill="currentColor" opacity=".25" /></g>;
    case "pixel-art-replicate":
      return <g><path d="M110 53h30v30h-30zm30 0h30v30h-30zm60 0h30v30h-30zm30 30h30v30h-30zm-120 30h30v30h-30zm30 0h30v30h-30zm30 0h30v30h-30zm30 0h30v30h-30zm60 0h30v30h-30zm-120 30h30v30h-30zm60 0h30v30h-30zm60 0h30v30h-30z" /><path d="M170 83h30v30h-30zm-30 60h30v30h-30zm90 0h30v30h-30z" fill="currentColor" /></g>;
    case "neuronal-learning":
      return <g><path d="M102 68 195 51l98 29M102 68l93 49 98-37M102 152l93-35 98 38M102 152l93-101 98 104M195 51v66m0 0v67" opacity=".7" /><circle cx="102" cy="68" r="10" fill="currentColor" /><circle cx="102" cy="152" r="10" fill="currentColor" /><circle cx="195" cy="51" r="10" fill="currentColor" /><circle cx="195" cy="117" r="14" fill="#162d34" /><circle cx="195" cy="184" r="10" fill="currentColor" /><circle cx="293" cy="80" r="10" fill="currentColor" /><circle cx="293" cy="155" r="10" fill="currentColor" /></g>;
    case "agora-ai-agent":
      return <g><path d="M108 58h116v82h-33l-20 20v-20h-63zM200 92h102v76h-28l-16 16v-16h-58" /><path d="M125 82h75m-75 17h58m-58 17h42m54-3h61m-61 17h48m-48 17h33" /><path d="m232 70 6-11 6 11 11 6-11 6-6 11-6-11-11-6z" fill="currentColor" /></g>;
  }
}

function GroupGlyph({ category }: { category: Category }) {
  switch (category) {
    case "assistants":
      return <g><path d="M89 76c36-38 79-38 111 0s75 38 111 0M89 108c36-38 79-38 111 0s75 38 111 0M89 140c36-38 79-38 111 0s75 38 111 0" /><circle cx="89" cy="108" r="7" fill="currentColor" /><circle cx="311" cy="108" r="7" fill="currentColor" /></g>;
    case "infrastructure":
      return <g><path d="M200 41v138M94 72h212M94 110h212M94 148h212M94 72v76m53-76v76m106-76v76m53-76v76" /><path d="m200 89 21 21-21 21-21-21z" fill="currentColor" /><circle cx="94" cy="72" r="6" fill="currentColor" /><circle cx="306" cy="148" r="6" fill="currentColor" /></g>;
    case "models":
      return <g><path d="M96 164V86m26 78V60m26 104V111m26 53V45m26 119V83m26 81V58m26 106V102m26 62V75m26 89V122" strokeWidth="13" /><path d="M89 180h222" strokeWidth="1" /></g>;
    case "tools":
      return <g><path d="M99 54h153l47 46v82H99zM252 54v46h47M125 87h94m-94 18h94m-94 18h150m-150 18h150m-150 18h101" /><path d="m296 41 8-18 8 18 18 8-18 8-8 18-8-18-18-8z" fill="currentColor" /></g>;
  }
}

function MotifFrame({ category, accent, composition, className, compact = false, children }: {
  category: Category;
  accent: string;
  composition: Composition;
  className?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <svg
      className={`${styles.motif} ${className ?? ""}`}
      data-category={category}
      data-composition={composition}
      data-compact={compact ? "true" : undefined}
      viewBox="0 0 400 220"
      preserveAspectRatio={compact ? "xMidYMid slice" : undefined}
      aria-hidden="true"
      focusable="false"
      style={{ color: accent }}
    >
      {!compact && <Ambient category={category} />}
      <Field category={category} />
      <g className={styles.subject}>
        <Scene category={category} />
        {compact ? (
          <g className={styles.glyph} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {children}
          </g>
        ) : (
          <g className={styles.glyphLift}>
            <g className={styles.glyphShadow} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {children}
            </g>
            <g className={styles.glyph} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {children}
            </g>
          </g>
        )}
      </g>
      {!compact && <Countermark composition={composition} />}
      {!compact && <g className={styles.glint} fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="m46 111 5-11 5 11 11 5-11 5-5 11-5-11-11-5z" />
        <path d="m348 60 3-7 3 7 7 3-7 3-3 7-3-7-7-3z" />
      </g>}
    </svg>
  );
}

/** Decorative and deterministic; project shapes do not claim runtime topology or data. */
export function ProjectMotif({ projectKey, category, className, compact }: ProjectMotifProps) {
  const knownKey = Object.prototype.hasOwnProperty.call(PROJECT_MOTIFS, projectKey)
    ? (projectKey as ProjectKey)
    : null;
  const spec = knownKey ? PROJECT_MOTIFS[knownKey] : {
    category,
    accent: GROUP_ACCENTS[category],
    composition: "center" as Composition,
  };

  return (
    <MotifFrame category={spec.category} accent={spec.accent} composition={spec.composition} className={className} compact={compact}>
      {knownKey ? <ProjectGlyph projectKey={knownKey} /> : <GroupGlyph category={category} />}
    </MotifFrame>
  );
}

/** Four visual families for catalogue sections, with the same ornamental treatment. */
export function GroupMotif({ category, className }: GroupMotifProps) {
  return (
    <MotifFrame category={category} accent={GROUP_ACCENTS[category]} composition="center" className={className}>
      <GroupGlyph category={category} />
    </MotifFrame>
  );
}
