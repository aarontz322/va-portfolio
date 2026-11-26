import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/nav";
import { industries, portfolioProjects, type Industry } from "@/lib/portfolio-projects";
import { pageMetadata } from "@/lib/site-url";

type PageProps = { params: Promise<{ industry?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ industry: [] }, ...Object.keys(industries).map((key) => ({ industry: [key] }))];
}

function selectedIndustry(parts?: string[]): Industry | undefined {
  if (!parts?.length) return undefined;
  const key = parts[0];
  if (parts.length !== 1 || !Object.hasOwn(industries, key)) notFound();
  return key as Industry;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const active = selectedIndustry((await params).industry);
  const projects = portfolioProjects.filter(project => project.industry === active);
  const cover = projects[0];
  const title = active ? `${industries[active]} website projects | Aaron Novicio` : "Website portfolio | Aaron Novicio";
  let description = "Browse websites and redesign concepts by Aaron Novicio. Open the demos to explore storefronts, service websites and campaign films.";
  if (active && cover) {
    description = projects.length === 1 ? `${cover.title}. ${cover.desc}` : `Explore Aaron Novicio’s ${industries[active].toLowerCase()} website projects, including ${cover.title}. Open a live demo to try each design.`;
  }
  return pageMetadata({
    title, description, path: active ? "/portfolio/" + active : "/portfolio",
    image: cover ? `/works/${cover.slug}.webp` : "/website-portfolio.jpg",
    imageAlt: cover ? cover.alt : "Three website projects by Aaron Novicio, Slatewell Roofing, VERANE and CORVANE PRECISION",
  });
}

export default async function PortfolioPage({ params }: PageProps) {
  const active = selectedIndustry((await params).industry);
  const projects = portfolioProjects.filter((project) => !active || project.industry === active);
  const filters = [["", "All industries"], ...Object.entries(industries)];
  const filterLinks = filters.map(([key, label]) => {
    const current = key === (active ?? "");
    return <Link
      key={label}
      href={key ? "/portfolio/" + key : "/portfolio"}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium transition-colors ${current
        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/12%)] text-[hsl(var(--primary))]"
        : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--primary))]"}`}
    >{label}</Link>;
  });

  return (
    <>
      <Nav />
      <main id="main" className="relative z-10 mx-auto max-w-6xl px-[5%] pb-20 pt-28 lg:px-8 lg:pt-32">
        <h1 className="font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-7xl">
          {active ? industries[active] : "Website portfolio"}
        </h1>
        {active ? null : <p className="mt-4 max-w-2xl text-base leading-relaxed text-[hsl(var(--foreground)/80%)] md:text-lg">
          Explore the websites, redesign concepts and campaign films I’ve made across industries.
        </p>}
        <nav aria-label="Filter projects by industry" className="mt-6">
          <details key={active ?? "all"} className="group md:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 text-sm [&::-webkit-details-marker]:hidden">
              <span className="text-[hsl(var(--muted-foreground))]">Industry</span>
              <span className="font-semibold">{active ? industries[active] : "All industries"}</span>
              <svg aria-hidden="true" className="ml-auto size-4 shrink-0 group-open:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 7.5 5 5 5-5" /></svg>
            </summary>
            <div className="mt-2 flex flex-wrap gap-2">{filterLinks}</div>
          </details>
          <div className="hidden flex-wrap gap-2 md:flex">{filterLinks}</div>
        </nav>
        <p className="mb-4 mt-5 text-sm text-[hsl(var(--muted-foreground))]">{projects.length} {projects.length === 1 ? "project" : "projects"}</p>
        <section aria-label={active ? industries[active] + " projects" : "All projects"} className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
              <a
                href={"/work/" + project.slug}
                aria-label={"Open live demo for " + project.title}
                className="group flex h-full flex-col focus-visible:outline-offset-[-3px]"
              >
                <Image
                  src={"/works/" + project.slug + ".webp"}
                  alt={project.alt} width={1120} height={700}
                  sizes="(max-width: 767px) 90vw, (max-width: 1152px) 46vw, 530px"
                  className="aspect-[8/5] w-full border-b border-[hsl(var(--border))] object-cover"
                />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-sm font-medium text-[hsl(var(--primary))]">{industries[project.industry]}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{project.title}</h2>
                  <p className="mb-4 mt-2 flex-1 leading-relaxed text-[hsl(var(--foreground)/78%)]">{project.desc}</p>
                  <span className="font-semibold underline decoration-[hsl(var(--primary))] underline-offset-4 group-hover:text-[hsl(var(--primary))]">Open live demo</span>
                </div>
              </a>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
