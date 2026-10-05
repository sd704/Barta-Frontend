import { useMemo, useState } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import JourneyCard from "../components/journey components/JourneyCard"
import { demoJourneys } from "../components/journey components/JourneyData"
import { motion } from "motion/react"

const FILTERS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Paused", value: "paused" },
    { label: "Archived", value: "archived" },
];

// type Sort = "updated" | "alpha" | "created" | "manual";

const JournalFeed = () => {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("updated");
    const [query, setQuery] = useState("");

    const visible = useMemo(() => {
        let list = [...demoJourneys];
        if (filter !== "all") list = list.filter((j) => j.status === filter);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((j) => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q) || j.category.toLowerCase().includes(q),);
        }
        list.sort((a, b) => {
            if (sort === "alpha") return a.title.localeCompare(b.title);
            if (sort === "created") return +new Date(b.startedAt) - +new Date(a.startedAt);
            if (sort === "updated") return +new Date(b.lastUpdated) - +new Date(a.lastUpdated);
            return 0;
        });
        // pinned first
        list.sort((a, b) => Number(b.pinned) - Number(a.pinned));
        return list;
    }, [filter, sort, query]);

    return (
        <div className="h-screen w-screen overflow-y-auto">

            <main className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">

                {/* Page header */}
                <motion.header className="mb-10 sm:mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between sm:items-end">
                        <div className="min-w-0">
                            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">Journal</h1>
                            
                            {/* 6 journeys · 443 entries logged · 3 currently active. */}
                            <p className="mt-2 text-sm sm:text-base text-[#71717A] max-w-xl">
                                {demoJourneys.length} journeys · {demoJourneys.reduce((n, j) => n + j.entryCount, 0)} entries
                                logged · {demoJourneys.filter((j) => j.status === "active").length} currently active.
                            </p>
                        </div>
                        <button className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-[#18181B] py-2 pl-2 pr-3 text-[#f4f3f0] ring-1 ring-[#18181B] hover:bg-[#18181B]/90 transition-colors">
                            <Plus className="size-4" strokeWidth={2.25} />
                            <span className="text-sm font-medium">Create Journey</span>
                        </button>
                    </div>
                </motion.header>

                {/* Controls bar */}
                <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3 items-center">
                    {/* Search */}
                    <div className="flex items-center gap-2 rounded-sm bg-zinc-100 px-3 py-2 border border-zinc-300 hover:border-zinc-500 focus-within:border-zinc-500 transition-colors">
                        {/* Search Icon */}
                        <Search className="size-4 text-zinc-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search journeys, tags, categories…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 rounded-sm bg-zinc-100 p-1 border border-zinc-300 overflow-x-auto">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase shrink-0 px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${filter === f.value
                                    ? "bg-[#ffffff] text-[#18181b] shadow-sm border border-[rgba(0, 0, 0, 0.08)]"
                                    : "text-[#71717a] hover:text-[#18181b]"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative inline-flex items-center rounded-sm bg-zinc-100 px-3 py-2.5 border border-zinc-300 hover:border-zinc-500 transition-colors cursor-pointer">
                        <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{"Sort:"}</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="appearance-none bg-zinc-100 font-mono text-[12px] font-medium pl-3 pr-5 focus:outline-none cursor-pointer"
                        >
                            <option value="updated">Last updated</option>
                            <option value="alpha">Alphabetical</option>
                            <option value="created">Created date</option>
                            <option value="manual">Manual order</option>
                        </select>
                        <ChevronDown className="size-3.5 text-[#71717a] pointer-events-none absolute right-2.5" />
                    </div>

                </div>

                {/* Journey grid */}
                {visible.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {visible.map((j, i) => (
                            // className="animate-fade-up"
                            <motion.div key={j.slug} style={{ animationDelay: `${i * 60}ms` }}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <JourneyCard journey={j} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </main>

            <footer className="mx-auto max-w-7xl px-5 sm:px-8 py-12 mt-12 border-t border-[rgba(0, 0, 0, 0.08)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Field.Operator · A quiet place for long-form progress.</span> */}
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">A quiet place for long-form progress.</span>
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">v0.1 · 2026</span>
                </div>
            </footer>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="mx-auto max-w-md text-center py-64">
            <h3 className="text-xl font-medium tracking-tight">Start your first journey</h3>
            <p className="mt-2 text-sm text-[#71717a]">
                A journey is a long-form thread of entries — building something, learning something,
                becoming something. Begin when you're ready.
            </p>
        </div>
    );
}

export default JournalFeed