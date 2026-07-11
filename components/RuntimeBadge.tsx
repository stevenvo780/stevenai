interface RuntimeBadgeProps {
  runtime: "gpu-local" | "api" | "local-cpu";
  label: string;
}

export default function RuntimeBadge({ runtime, label }: RuntimeBadgeProps) {
  // Fallback classes to prevent undefined className
  const classMap: Record<string, string> = {
    "gpu-local": "badge-gpu",
    api: "badge-api",
    "local-cpu": "badge-local",
  };
  const classes = classMap[runtime] ?? "badge-gpu";

  const iconMap: Record<string, string> = {
    "gpu-local": "GPU",
    api: "API",
    "local-cpu": "CPU",
  };
  const icon = iconMap[runtime] ?? "CPU";

  return (
    <span
      className={classes}
      title={label}
      aria-label={label}
      role="status"
    >
      {icon} — {label}
    </span>
  );
}
