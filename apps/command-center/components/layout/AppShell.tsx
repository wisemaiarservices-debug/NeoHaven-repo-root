"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Sprout, Zap, Cpu, Brain, Boxes, Network,
  ListChecks, BarChart3, Settings, Presentation, CircleDot,
} from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data/mockData";

const nav = [
  { to: "/",               label: "Overview",         icon: LayoutDashboard },
  { to: "/agriculture",    label: "Agriculture / NeoAgro", icon: Sprout },
  { to: "/energy",         label: "Energy / NeoGrid",      icon: Zap },
  { to: "/infrastructure", label: "Infrastructure / NeoCell", icon: Cpu },
  { to: "/nova-core",      label: "NOVA Core AI",     icon: Brain },
  { to: "/digital-twin",   label: "Digital Twin",     icon: Boxes },
  { to: "/knowledge-graph",label: "Knowledge Graph",  icon: Network },
  { to: "/recommendations",label: "Recommendations",  icon: ListChecks },
  { to: "/impact",         label: "Impact Reports",   icon: BarChart3 },
  { to: "/walkthrough",    label: "Executive Walkthrough", icon: Presentation },
  { to: "/settings",       label: "Settings",         icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex w-full text-foreground">
      {/* Sidebar */}
      <aside className="w-[260px] shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-md flex flex-col">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-aurora-blue to-neo-green grid place-items-center font-mono text-[13px] font-bold text-midnight">N</div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-wide">NOVA OS</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.14em] uppercase">NeoHaven AI</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {nav.map(item => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-border/60 shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground border border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? "text-aurora-blue" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-sidebar-border text-[11px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <CircleDot className="w-3 h-3 text-neo-green animate-pulse-soft" />
            <span>NOVA Core v0.9.3</span>
          </div>
          <div>Live integrations shown separately</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-12 border-b border-border/70 bg-midnight/60 backdrop-blur-md flex items-center px-5 gap-4">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-mono">
            <span className="text-foreground/80">NOVA OS</span>
            <span>/</span>
            <span>{site.name}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/#live-integration" className="chip border-solar-gold/40 text-solar-gold bg-solar-gold/10 hover:border-aurora-blue/60">
              <CircleDot className="w-3 h-3" /> Integration status · verify
            </Link>
            <span className="text-[11px] text-muted-foreground font-mono">Operator approval required</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-5 lg:p-7 max-w-[1480px] mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
