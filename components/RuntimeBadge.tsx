interface RuntimeBadgeProps {
  runtime: "gpu-local" | "api" | "local-cpu";
  label: string;
}

export default function RuntimeBadge({ runtime, label }: RuntimeBadgeProps) {
  const classes = {
    "gpu-local": "badge-gpu",
    api: "badge-api",
    "local-cpu": "badge-local",
  }[runtime];

  const icon = {
    "gpu-local": "GPU",
    api: "API",
    "local-cpu": "CPU",
  }[runtime];

  return (
    <span className={classes} title={label}>
      {icon} — {label}
    </span>
  );
}
