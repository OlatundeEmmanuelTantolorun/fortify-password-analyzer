import { useState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineClipboard,
  HiOutlineCheck,
} from "react-icons/hi2";
import clsx from "clsx";
import { copyToClipboard } from "../utils/helpers";

export default function PasswordField({
  value,
  onChange,
  placeholder = "Type a password to analyze…",
  readOnly = false,
  autoFocus = false,
  size = "lg",
}) {
  const [visible, setVisible] = useState(readOnly);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className={clsx(
        "relative w-full rounded-2xl border bg-black/40 transition-colors",
        "border-card-border focus-within:border-primary/60 focus-within:glow-border",
        size === "lg" ? "px-5 py-4" : "px-4 py-3",
      )}
    >
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        className={clsx(
          "w-full bg-transparent outline-none font-mono text-text placeholder:text-muted/60 placeholder:font-body pr-20",
          size === "lg" ? "text-lg md:text-xl" : "text-base",
        )}
      />

      {/* Icons */}
      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="text-muted hover:text-text transition-colors p-1.5 rounded-lg hover:bg-white/5"
        >
          {visible ? (
            <HiOutlineEyeSlash size={19} />
          ) : (
            <HiOutlineEye size={19} />
          )}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy password"
          disabled={!value}
          className="text-muted hover:text-text transition-colors p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          {copied ? (
            <HiOutlineCheck size={19} className="text-success" />
          ) : (
            <HiOutlineClipboard size={19} />
          )}
        </button>
      </div>
    </div>
  );
}
