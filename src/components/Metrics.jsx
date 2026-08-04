import { motion } from "framer-motion";
import clsx from "clsx";

const RATING_STYLES = {
  danger: "text-danger bg-danger/10 border-danger/20",
  warning: "text-warning bg-warning/10 border-warning/20",
  success: "text-success bg-success/10 border-success/20",
  primary: "text-primary bg-primary/10 border-primary/20",
  muted: "text-muted bg-white/5 border-card-border",
};

function SecondaryStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-card-border bg-black/20 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-black/30">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>

      <h4 className="mt-2 font-mono text-lg text-text break-words leading-snug">
        {value}
      </h4>
    </div>
  );
}

export default function Metrics({ result }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Primary Score */}
      <div>
        <div className="flex items-end gap-2">
          <span className="font-heading text-5xl md:text-6xl font-semibold text-text tabular-nums">
            {result.score}
          </span>

          <span className="mb-2 text-lg text-muted">/100</span>
        </div>

        <div
          className={clsx(
            "inline-flex items-center rounded-full border px-3 py-1 mt-3 text-sm font-medium",
            RATING_STYLES[result.rating.color],
          )}
        >
          {result.rating.label}
        </div>
      </div>

      <div className="h-px bg-card-border/60" />

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SecondaryStat
          label="Entropy"
          value={`${result.entropyBits.toFixed(0)} bits`}
        />

        <SecondaryStat
          label="Offline Attack"
          value={result.crackTimes.offline}
        />

        <SecondaryStat label="Online Attack" value={result.crackTimes.online} />

        <SecondaryStat label="Security" value={result.grade} />
      </div>
    </motion.div>
  );
}
