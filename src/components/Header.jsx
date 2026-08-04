import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineShieldCheck className="text-primary" size={16} />
          <span className="font-heading font-semibold tracking-[0.14em] text-xs text-muted">
            FORTIFY
          </span>
        </div>

        <a
          href="https://github.com/OlatundeEmmanuelTantolorun"
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="text-muted hover:text-text transition-colors"
        >
          <FaGithub size={17} />
        </a>
      </div>
    </header>
  )
}
