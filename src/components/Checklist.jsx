import { HiCheck, HiXMark } from "react-icons/hi2";
import clsx from "clsx";

const GROUPS = [
  {
    title: "Character variety",
    items: [
      { key: "upper", label: "Uppercase" },
      { key: "lower", label: "Lowercase" },
      { key: "number", label: "Numbers" },
      { key: "symbol", label: "Symbols" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { key: "noSequential", label: "No keyboard or sequential pattern" },
      { key: "noRepeats", label: "No repeated characters" },
      { key: "notCommon", label: "Not a known breached password" },
    ],
  },
  {
    title: "Length",
    items: [{ key: "length", label: "12+ characters" }],
  },
];

function Item({ checklist, item }) {
  const pass = checklist[item.key]?.pass;
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span
        className={clsx(
          "flex items-center justify-center rounded-full shrink-0",
          pass ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
        )}
        style={{ width: 18, height: 18 }}
      >
        {pass ? <HiCheck size={12} /> : <HiXMark size={12} />}
      </span>
      <span className={pass ? "text-text" : "text-muted"}>{item.label}</span>
    </div>
  );
}

export default function Checklist({ checklist }) {
  return (
    <div className="space-y-5">
      {GROUPS.map((group, i) => (
        <div
          key={group.title}
          className={clsx(i > 0 && "pt-5 border-t border-card-border/40")}
        >
          <div className="text-xs uppercase tracking-wider text-muted mb-2.5">
            {group.title}
          </div>
          <div className="space-y-2">
            {group.items.map((item) => (
              <Item key={item.key} checklist={checklist} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
