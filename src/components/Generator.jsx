import { motion } from 'framer-motion'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import clsx from 'clsx'
import PasswordField from './PasswordField'

const TOGGLES = [
  { key: 'upper', label: 'A-Z' },
  { key: 'lower', label: 'a-z' },
  { key: 'number', label: '0-9' },
  { key: 'symbol', label: '!@#' },
]

export default function Generator({ password, options, updateOption, regenerate }) {
  return (
    <div className="space-y-6">
      <PasswordField value={password} readOnly size="lg" />

      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted">Length</span>
          <span className="font-mono text-text">{options.length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={32}
          value={options.length}
          onChange={(e) => {
            const length = Number(e.target.value)
            updateOption('length', length)
            regenerate({ ...options, length })
          }}
          className="w-full accent-primary h-1.5 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {TOGGLES.map((t) => (
          <button
            key={t.key}
            onClick={() => updateOption(t.key, !options[t.key])}
            className={clsx(
              'py-2.5 rounded-xl border text-sm font-mono transition-colors',
              options[t.key]
                ? 'bg-primary/10 border-primary/50 text-primary'
                : 'border-card-border text-muted hover:border-card-border/80'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => regenerate()}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-bg font-semibold hover:bg-primary-dim transition-colors"
      >
        <HiOutlineArrowPath size={18} />
        Generate new password
      </motion.button>
    </div>
  )
}
