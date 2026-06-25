import Link from "next/link";
import { ExternalLink, GitPullRequest, ShieldCheck } from "lucide-react";
import { productModules } from "@/data/mockData";

const statusClass = (status: string) => {
  if (status.includes("ready")) return "border-neo-green/40 text-neo-green bg-neo-green/10";
  if (status.includes("pending")) return "border-solar-gold/40 text-solar-gold bg-solar-gold/10";
  return "border-aurora-blue/40 text-aurora-blue bg-aurora-blue/10";
};

export function ProductStatusPanel() {
  return (
    <section className="glass-panel p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="stat-label">Product UI integration</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">Working module links and readiness</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            NOVA OS can route operators to the product modules while PRs move through review.
          </p>
        </div>
        <span className="chip border-neo-green/40 text-neo-green bg-neo-green/10">
          <ShieldCheck className="h-3.5 w-3.5" /> Operator approval mode
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {productModules.map((module) => {
          const internal = module.href.startsWith("/");
          const content = (
            <article className="h-full rounded-md border border-border/60 bg-panel-elevated/60 p-3 transition-colors hover:border-aurora-blue/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="stat-label">{module.product}</div>
                  <h3 className="mt-1 text-[14px] font-semibold">{module.name}</h3>
                </div>
                {internal ? <ExternalLink className="h-4 w-4 text-muted-foreground" /> : <ExternalLink className="h-4 w-4 text-aurora-blue" />}
              </div>
              <p className="mt-2 min-h-[48px] text-[12px] leading-5 text-muted-foreground">{module.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`chip ${statusClass(module.status)}`}>{module.status}</span>
                {module.pr ? (
                  <a className="chip border-border/70 text-muted-foreground hover:text-foreground" href={module.pr} target="_blank" rel="noreferrer">
                    <GitPullRequest className="h-3.5 w-3.5" /> PR
                  </a>
                ) : null}
              </div>
            </article>
          );

          return internal ? (
            <Link key={module.name} href={module.href}>
              {content}
            </Link>
          ) : (
            <a key={module.name} href={module.href} target="_blank" rel="noreferrer">
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
