"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 py-2 text-[0.85rem] text-foam-3 transition-colors duration-300 hover:text-foam"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-wave-3" /> : <CopyIcon className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
