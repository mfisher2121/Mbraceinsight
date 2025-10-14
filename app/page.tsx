'use client';

// Place this file as app/page.tsx or pages/index.tsx in a Next.js project.
// TailwindCSS required. Put your photo at /public/max.jpg (or update the src below).
// PAA → FAQ Generator: replace N8N_WEBHOOK with your public webhook URL.

import React, { useState } from "react";

export default function MbraceInsightLanding() {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState<string[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setFaqs(null);
    try {
      const res = await fetch("https://N8N_WEBHOOK", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, email })
      });
      if (!res.ok) throw new Error("Webhook error");
      const data = await res.json();
      // Expect data like { faqs: ["Q1?", "Q2?", ...], delivered: true }
      setFaqs(data.faqs?.slice(0, 5) || []);
      setMsg(data.delivered
        ? "Full FAQ set + schema sent to your inbox."
        : "Here are your top FAQs. Enter an email to get the full set + schema.");
    } catch (err) {
      // graceful fallback demo FAQs
      setFaqs([
        `What is ${keyword || "my service"} and how does it work?`,
        `How long does ${keyword || "setup"} take for local businesses?`,
        `What are the costs involved with ${keyword || "this service"}?`,
        `Does ${keyword || "the solution"} improve Google Maps visibility?`,
        `How do I get started with ${keyword || "this"}?`
      ]);
      setMsg("(Demo) Replace N8N_WEBHOOK to enable live results.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-900" />
            <span className="font-semibold tracking-tight">Mbrace Insight</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#tool" className="hover:text-slate-600">Free Tool</a>
            <a href="#services" className="hover:text-slate-600">Services</a>
            <a href="#about" className="hover:text-slate-600">About</a>
          </nav>
          <a href="#cta" className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium">Book a Free Audit</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-12 grid md:grid-cols-2 items-center gap-10">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Future‑Proof Your Local Business with <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">AI‑Driven SEO</span>
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            I cover every major SEO discipline — audits, keywords, competitors, backlinks, content, and local map visibility — in plain, client‑first language.
            Each engagement delivers data‑driven insights perfect for a 10‑minute Loom you can act on today.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#tool" className="rounded-xl bg-slate-900 text-white px-5 py-3 font-medium">Try the Free PAA → FAQ Generator</a>
            <a href="#services" className="rounded-xl border border-slate-300 px-5 py-3 font-medium">What I Do</a>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Built on the latest methods: DataForSEO, structured data, SERP position tracking, competitor gap analysis, backlink evaluation, traffic analysis, keyword research, and full technical audits.
          </p>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <img src="/max.jpg" alt="Max – AI‑powered Local SEO Strategist" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl ring-1 ring-slate-200" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Full SEO Audits", d: "Find index issues, speed bottlenecks, crawl traps, and internal linking gaps — the unsexy fixes that move rankings fast." },
            { t: "Keyword Research", d: "Build topical maps that match real demand and intent. No fluff, just high‑impact targets." },
            { t: "Competitor Gap Analysis", d: "Spot what they rank for that you don’t — then build pages that leapfrog them." },
            { t: "Backlink Analysis", d: "Identify trust signals that matter and remove toxic anchors that hold you back." },
            { t: "Content Optimization", d: "Make content clear, fast, and scannable with tight internal links and rich snippets." },
            { t: "Local Maps Visibility", d: "Dominate GBP + local packs with entity signals, citations, and review strategy." }
          ].map((card) => (
            <div key={card.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">{card.t}</h3>
              <p className="mt-2 text-slate-700 text-sm">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool */}
      <section id="tool" className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-xl">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Free PAA → FAQ Generator</h2>
              <p className="mt-2 text-slate-700 max-w-2xl">
                Instantly discover the questions your customers ask — then turn them into SEO‑ready FAQs and schema. Enter a keyword below.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm">Lead magnet • No spam</span>
          </div>

          <form onSubmit={handleGenerate} className="mt-6 grid md:grid-cols-[1fr_auto_auto] gap-3">
            <input
              type="text"
              placeholder="e.g., home theater installers potomac md"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              type="email"
              placeholder="Email (optional for full set + schema)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-900 text-white px-5 py-3 font-medium disabled:opacity-60"
            >
              {loading ? "Generating…" : "Generate FAQs"}
            </button>
          </form>

          {msg && (
            <p className="mt-4 text-sm text-slate-600">{msg}</p>
          )}

          {faqs && (
            <div className="mt-6 grid gap-3">
              {faqs.map((q, i) => (
                <details key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer font-medium">Q{i + 1}. {q}</summary>
                  <p className="mt-2 text-sm text-slate-700">
                    Add a short, helpful answer here. I’ll send the full set with JSON‑LD FAQPage schema to your email.
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold">My POV: Win the AI Overview Era</h2>
          <div className="mt-4 space-y-4 text-slate-100/90">
            <p>
              Right now is the moment to get your business into Google’s AI Overview. Sites with clean structure, fast loads, and meticulous internal linking rise quickly — even over big brands with bloated blogs.
            </p>
            <p>
              I specialize in generating the right snippets and signals, placing them precisely, and finding the gaps that let you dominate. Google prefers pages that are clear, concise, and genuinely valuable — and that’s the system I build.
            </p>
            <p>
              We’ll start with quick wins and a focused 30‑day plan, then future‑proof your presence so you stay visible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">Let’s make your business stand out — and stay there.</h3>
          <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
            Time’s moving fast. The world of tech will never be slower than today. Fill out the form and I’ll send a quick video with three immediate wins.
          </p>
          <a href="#tool" className="mt-6 inline-block rounded-xl bg-slate-900 text-white px-6 py-3 font-medium">Get My Free Insight</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Mbrace Insight. Built with AI. Designed for people.
      </footer>
    </main>
  );
}
