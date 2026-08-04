import { motion } from 'framer-motion'
import clsx from 'clsx'

const TABS = [
  { id: 'analyze', label: 'Analyze' },
  { id: 'generate', label: 'Generate' },
]

export default function Tabs({ active, onChange }) {
  return (
    <div className="relative flex bg-black/40 border border-card-border rounded-full p-1 w-full max-w-[280px] mx-auto">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative flex-1 z-10 py-2 text-sm font-medium rounded-full transition-colors duration-200',
              isActive ? 'text-bg' : 'text-muted hover:text-text'
            )}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 -z-10 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
