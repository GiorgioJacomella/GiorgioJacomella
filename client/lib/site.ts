import type { Locale } from "@/i18n/config";

// Single source for site-wide content: header, footer, pages and sitemap read from here.
// UI text lives in i18n/*.json; per-project text is localized right here with the project.
export const site = {
  name: "Giorgio Jacomella",
  url: "https://giorgio.jacomella.dev",
  email: "giorgio@jacomella.dev",
  github: "https://github.com/GiorgioJacomella",
  linkedin: "https://www.linkedin.com/in/giorgio-jacomella-095062231/",
};

export const tags = ["AI", "Web Development", "Full-Stack", "Front-End", "Data Science", "Research", "Hackathon"] as const;
export type Tag = (typeof tags)[number];

// Full class strings so Tailwind picks them up.
export const tagStyles: Record<Tag, string> = {
  AI: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  "Full-Stack": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "Front-End": "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "Data Science": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Hackathon: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "Web Development": "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Research: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
};

// Logos in public/logos: Simple Icons (CC0), C#, SQL Server and LinkedIn from Devicon (MIT, notice kept in the file).
// No logo: rendered as text only.
const tech = {
  python: { name: "Python", logo: "python", href: "https://www.python.org" },
  csharp: { name: "C#", logo: "csharp", href: "https://learn.microsoft.com/dotnet/csharp/" },
  aspnet: { name: "ASP.NET", logo: "dotnet", href: "https://dotnet.microsoft.com/apps/aspnet" },
  // No official homepage; MDN is the reference.
  javascript: { name: "JavaScript", logo: "javascript", href: "https://developer.mozilla.org/docs/Web/JavaScript" },
  typescript: { name: "TypeScript", logo: "typescript", href: "https://www.typescriptlang.org" },
  nodejs: { name: "Node.js", logo: "nodejs", href: "https://nodejs.org" },
  react: { name: "React", logo: "react", href: "https://react.dev" },
  nextjs: { name: "Next.js", logo: "nextjs", href: "https://nextjs.org" },
  mssql: { name: "MS SQL", logo: "sqlserver", href: "https://www.microsoft.com/sql-server" },
  mongodb: { name: "MongoDB", logo: "mongodb", href: "https://www.mongodb.com" },
  vercel: { name: "Vercel", logo: "vercel", href: "https://vercel.com" },
  openrouter: { name: "OpenRouter", logo: "openrouter", href: "https://openrouter.ai" },
  upstash: { name: "Upstash Redis", logo: "upstash", href: "https://upstash.com" },
  jupyter: { name: "Jupyter", logo: "jupyter", href: "https://jupyter.org" },
  renku: { name: "RenkuLab", href: "https://renkulab.io" },
  pandas: { name: "pandas", logo: "pandas", href: "https://pandas.pydata.org" },
  plotly: { name: "Plotly", logo: "plotly", href: "https://plotly.com/python/" },
  quantconnect: { name: "QuantConnect", logo: "quantconnect", href: "https://www.quantconnect.com" },
};

// Home and about page tech band.
export const stack = [
  tech.python,
  tech.csharp,
  tech.aspnet,
  tech.javascript,
  tech.typescript,
  tech.nodejs,
  tech.react,
  tech.nextjs,
  tech.mssql,
  tech.mongodb,
  tech.vercel,
  tech.openrouter,
  tech.jupyter,
  tech.quantconnect,
];

type Project = {
  slug: string;
  tags: Tag[];
  // Path under public/. Card and page header crop it, so keep the subject centered.
  image: string;
  stack: { name: string; logo?: string; href?: string }[];
  links: { href: string; label: Record<Locale, string> }[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  // One string per paragraph.
  body: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    slug: "investment-analyst",
    tags: ["AI", "Web Development", "Full-Stack", "Data Science", "Research"],
    image: "/projects/investment-analyst.jpg",
    stack: [tech.nextjs, tech.react, tech.typescript, tech.python, tech.openrouter, tech.upstash, tech.vercel],
    links: [
      { href: "https://investment-analytics-website.vercel.app/", label: { en: "Live demo", de: "Live-Demo" } },
      { href: "https://github.com/GiorgioJacomella/InvestmentAnalyticsWebsite", label: { en: "GitHub", de: "GitHub" } },
    ],
    title: { en: "Investment Analyst", de: "Investment Analyst" },
    summary: {
      en: "Does an investment idea actually work? Statistical backtesting and numerical comparison of strategies, with an AI coding assistant.",
      de: "Funktioniert eine Investment-Idee wirklich? Statistische Backtests und zahlenbasierter Vergleich von Strategien, mit einem KI-Programmierassistenten.",
    },
    body: {
      en: [
        "Investment Analyst checks whether an investment idea holds up. A strategy is tested on historical market data and compared with a simple buy-and-hold approach.",
        "Results are judged by statistics, not gut feeling: return, risk and significance metrics show whether a strategy really differs from the benchmark or just got lucky.",
        "An AI assistant turns ideas into strategy code. It only writes the code, the data decides whether the strategy works. Strategies run directly in the browser, and AI requests go through a rate-limited server route.",
        "Built with Next.js and TypeScript, Python in the browser, OpenRouter for the AI assistant and Upstash Redis for rate limiting, deployed on Vercel.",
      ],
      de: [
        "Investment Analyst prüft, ob eine Investment-Idee standhält. Eine Strategie wird mit historischen Marktdaten getestet und mit einem einfachen Buy-and-Hold-Ansatz verglichen.",
        "Bewertet wird mit Statistik statt Bauchgefühl: Rendite-, Risiko- und Signifikanzkennzahlen zeigen, ob sich eine Strategie wirklich vom Vergleichswert unterscheidet oder nur Glück hatte.",
        "Ein KI-Assistent macht aus Ideen Strategie-Code. Er schreibt nur den Code, ob die Strategie funktioniert, entscheiden die Daten. Strategien laufen direkt im Browser, KI-Anfragen gehen über eine Serverroute mit Rate Limiting.",
        "Gebaut mit Next.js und TypeScript, Python im Browser, OpenRouter für den KI-Assistenten und Upstash Redis für das Rate Limiting, gehostet auf Vercel.",
      ],
    },
  },
  {
    slug: "kanton-schwyz-onlineschalter",
    tags: ["Hackathon", "Web Development", "Front-End", "Full-Stack", "AI"],
    image: "/projects/kanton-schwyz.png",
    stack: [tech.nextjs, tech.react, tech.typescript, tech.openrouter, tech.vercel],
    links: [
      { href: "https://kantonschwyzonlineschalter.vercel.app/", label: { en: "Live demo", de: "Live-Demo" } },
      { href: "https://github.com/GiorgioJacomella/kantonschwyz-onlineschalter", label: { en: "GitHub", de: "GitHub" } },
      { href: "https://onlineschalter.sz.ch/Pages/Default.aspx", label: { en: "Current portal", de: "Aktueller Onlineschalter" } },
    ],
    title: { en: "Canton of Schwyz online services", de: "Onlineschalter Kanton Schwyz" },
    summary: {
      en: "Redesign of the Canton of Schwyz's online services portal at the Zentral Hack 2026, with an AI assistant that guides people to the right service.",
      de: "Redesign des Onlineschalters des Kantons Schwyz am Zentral Hack 2026, mit einem KI-Assistenten, der zur passenden Dienstleistung führt.",
    },
    body: {
      en: [
        "At the Zentral Hack 2026, I redesigned the online services portal of the Canton of Schwyz. The goal: a modern, accessible portal where every service is easy to find in one place.",
        "Services are grouped by topic and life situation, with a search and step-by-step forms. The AI assistant «Schwyzi» answers questions in German, French, Italian and English and links to matching services. On each service page, an assistant answers questions based only on that page's content.",
        "Accessibility was part of the concept from the start, including adjustable font size. The portal is built with Next.js and TypeScript, the AI features run through OpenRouter, and it is deployed on Vercel.",
      ],
      de: [
        "Am Zentral Hack 2026 habe ich den Onlineschalter des Kantons Schwyz neu gestaltet. Das Ziel: ein modernes, barrierefreies Portal, in dem jede Dienstleistung an einem Ort einfach zu finden ist.",
        "Die Dienstleistungen sind nach Themen und Lebenslagen geordnet, mit Suche und Formularen Schritt für Schritt. Der KI-Assistent «Schwyzi» beantwortet Fragen auf Deutsch, Französisch, Italienisch und Englisch und verlinkt passende Dienstleistungen. Auf jeder Dienstleistungsseite beantwortet ein Assistent Fragen nur anhand des Seiteninhalts.",
        "Barrierefreiheit war von Anfang an Teil des Konzepts, inklusive anpassbarer Schriftgrösse. Das Portal ist mit Next.js und TypeScript gebaut, die KI-Funktionen laufen über OpenRouter, gehostet wird auf Vercel.",
      ],
    },
  },
  {
    slug: "ev-charging-pricing-analytics",
    tags: ["Hackathon", "Data Science", "Research"],
    // Chart and hackdays badge blended side by side.
    image: "/projects/ev-charging.jpg",
    stack: [tech.python, tech.jupyter, tech.renku, tech.pandas, tech.plotly],
    links: [],
    title: { en: "EV charging pricing analytics", de: "Preisanalyse für E-Ladestationen" },
    summary: {
      en: "Data research for Energie 360° at the Energy Data Hackdays 2026: what should charging cost at each site?",
      de: "Datenanalyse für Energie 360° an den Energy Data Hackdays 2026: Was soll das Laden an jedem Standort kosten?",
    },
    body: {
      en: [
        "At the Energy Data Hackdays 2026 at FHNW in Brugg-Windisch, I worked on a challenge from Energie 360°: a data basis for setting EV charging prices per site, instead of deciding them by hand.",
        "The idea behind it: price as a function of cost, market and demand. Charging sessions were combined with energy and grid costs, nearby competitor prices, points of interest, traffic and population data to describe the context of every site.",
        "In Jupyter notebooks on RenkuLab, I analysed revenue, profit and utilisation per site and compared prices with the nearest competitors, down to heatmaps and 3D surfaces of sessions and revenue by price difference and distance. The result is decision support: the numbers behind a price proposal, not automated price setting.",
      ],
      de: [
        "An den Energy Data Hackdays 2026 an der FHNW in Brugg-Windisch habe ich an einer Challenge von Energie 360° gearbeitet: eine Datengrundlage, um Ladepreise für E-Autos pro Standort festzulegen, statt sie von Hand zu bestimmen.",
        "Die Idee dahinter: Der Preis ergibt sich aus Kosten, Markt und Nachfrage. Ladevorgänge wurden mit Energie- und Netzkosten, Preisen der Konkurrenz in der Nähe, Points of Interest, Verkehrs- und Bevölkerungsdaten verknüpft, um das Umfeld jedes Standorts zu beschreiben.",
        "In Jupyter-Notebooks auf RenkuLab habe ich Umsatz, Gewinn und Auslastung pro Standort ausgewertet und die Preise mit der nächstgelegenen Konkurrenz verglichen, bis hin zu Heatmaps und 3D-Flächen von Ladevorgängen und Umsatz nach Preisunterschied und Distanz. Das Ergebnis ist eine Entscheidungshilfe: die Zahlen hinter einem Preisvorschlag, keine automatische Preissetzung.",
      ],
    },
  },
];

// Native <script> per Next.js JSON-LD guide; escaping "<" prevents breaking out of the tag.
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
