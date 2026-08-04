import { motion } from 'framer-motion'
import clsx from 'clsx'

const COLOR_MAP = {
  danger: 'bg-danger',
  warning: 'bg-warning',
  success: 'bg-success',
  primary: 'bg-primary',
  muted: 'bg-card-border',
}

export default function StrengthBar({ score, rating }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-muted">Strength</span>
        <span
          className={clsx(
            'text-sm font-semibold font-heading',
            rating.color === 'danger' && 'text-danger',
            rating.color === 'warning' && 'text-warning',
            rating.color === 'success' && 'text-success',
            rating.color === 'primary' && 'text-primary',
            rating.color === 'muted' && 'text-muted'
          )}
        >
          {rating.label}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-card-border/50 overflow-hidden">
        <motion.div
          className={clsx('h-full rounded-full', COLOR_MAP[rating.color])}
          initial={false}
          animate={{ width: `${score}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        />
      </div>
    </div>
  )
}
