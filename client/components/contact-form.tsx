"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

const endpoint = "https://api.web3forms.com/submit";
const field =
  "w-full rounded border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50";

// Plain form POST works without JS (Web3Forms shows its own success page); with JS the result shows inline.
export function ContactForm({ labels }: { labels: Dictionary["contact"] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={endpoint} method="POST" onSubmit={submit} className="w-full space-y-4 text-left">
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
      <input type="hidden" name="subject" value={labels.subject} />
      {/* Honeypot: bots fill it, Web3Forms drops those submissions. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{labels.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{labels.email}</span>
          <input type="email" name="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{labels.message}</span>
        <textarea name="message" required rows={6} className={field} />
      </label>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs">
          {labels.notice}{" "}
          <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-500">
            {labels.noticePrivacy}
          </a>
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? labels.sending : labels.send}
        </button>
      </div>

      <p role="status" aria-live="polite" className={status === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-700 dark:text-emerald-400"}>
        {status === "success" && labels.success}
        {status === "error" && labels.error}
      </p>
    </form>
  );
}
