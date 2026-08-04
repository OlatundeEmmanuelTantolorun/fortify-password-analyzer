import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import Tabs from "./Tabs";
import PasswordField from "./PasswordField";
import StrengthBar from "./StrengthBar";
import Metrics from "./Metrics";
import Checklist from "./Checklist";
import Suggestions from "./Suggestions";
import Generator from "./Generator";
import { useAnalyzer } from "../hooks/useAnalyzer";
import { useGenerator } from "../hooks/useGenerator";

const panelVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction === "generate" ? 28 : -28,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction === "generate" ? -28 : 28 }),
};

function Section({ children, className, eyebrow }) {
  return (
    <div
      className={`px-8 md:px-14 py-8 border-b border-card-border/60 last:border-b-0 ${className ?? ""}`}
    >
      <div className="max-w-2xl mx-auto">
        {eyebrow && (
          <div className="text-xs uppercase tracking-wider text-muted mb-4">
            {eyebrow}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default function Workspace() {
  const [mode, setMode] = useState("analyze");
  const [password, setPassword] = useState("");
  const result = useAnalyzer(password);
  const generatorState = useGenerator();

  const resultsRef = useRef(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (!password.trim()) {
      hasScrolled.current = false;
      return;
    }

    if (hasScrolled.current) return;

    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      hasScrolled.current = true;
    }, 700);

    return () => clearTimeout(timer);
  }, [password]);

  const handleModeChange = (next) => {
    if (next === mode) return;
    setMode(next);
  };

  const sendGeneratedToAnalyzer = () => {
    setPassword(generatorState.password);
    setMode("analyze");
    toast.success("Sent to analyzer");
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="rounded-3xl border border-card-border glass glow-border overflow-hidden">
        {/* Title */}
        <Section className="text-center !py-9">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
            FORTIFY
          </h1>
          <p className="text-muted text-sm mt-1.5 tracking-wide">
            Analyze password strength or generate secure passwords instantly.
          </p>
          <div className="mt-6">
            <Tabs active={mode} onChange={handleModeChange} />
          </div>
        </Section>

        {/* Body */}
        <AnimatePresence mode="wait" custom={mode}>
          {mode === "analyze" ? (
            <motion.div
              key="analyze"
              custom={mode}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Section>
                <PasswordField
                  value={password}
                  onChange={setPassword}
                  autoFocus
                  placeholder="Type a password to analyze…"
                />
              </Section>

              {password ? (
                <div ref={resultsRef} className="scroll-mt-24">
                  <Section eyebrow="Instant verdict">
                    <StrengthBar score={result.score} rating={result.rating} />
                    <div className="mt-6">
                      <Metrics result={result} />
                    </div>
                  </Section>

                  <Section eyebrow="Why?">
                    <Checklist checklist={result.checklist} />
                  </Section>

                  {result.suggestions.length > 0 && (
                    <Section eyebrow="How to improve">
                      <Suggestions suggestions={result.suggestions} />
                    </Section>
                  )}
                </div>
              ) : (
                <Section className="!py-10">
                  <p className="text-sm text-muted text-center">
                    Nothing is sent anywhere — analysis runs entirely in your
                    browser.
                  </p>
                </Section>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="generate"
              custom={mode}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Section className="!py-9">
                <Generator {...generatorState} />
                <button
                  onClick={sendGeneratedToAnalyzer}
                  className="w-full text-sm text-muted hover:text-primary transition-colors py-1 mt-5"
                >
                  Check this password's strength →
                </button>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
