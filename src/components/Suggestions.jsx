import { AnimatePresence, motion } from 'framer-motion'

export default function Suggestions({ suggestions }) {
  if (!suggestions?.length) return null

  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted mb-3">
        Improve your password
      </div>
      <ul className="divide-y divide-card-border/40 border-t border-b border-card-border/40">
        <AnimatePresence initial={false}>
          {suggestions.map((s) => (
            <motion.li
              key={s.text}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-between gap-4 py-3"
            >
              <span className="text-sm text-text">{s.text}</span>
              <span className="text-sm font-mono text-primary shrink-0">+{s.points}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="text-xs text-muted mt-2.5">
        Point values are estimates and may overlap — fixing the top issue first goes furthest.
      </p>
    </div>
  )
}
