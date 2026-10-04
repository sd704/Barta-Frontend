import { useMemo, useState } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
// import AppNav from "../components/journey components/AppNav"
import JourneyCard from "../components/journey components/JourneyCard"
import { demoJourneys } from "../components/journey components/JourneyData"

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
            {/* <AppNav /> */}

            <main className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
                {/* Page header */}
                <header className="mb-10 sm:mb-12 animate-fade-up">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between sm:items-end">
                        <div className="min-w-0">
                            {/* <div className="label-mono text-[var(--color-te-orange)] mb-2">Archive v.01 · Personal Log</div> */}
                            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-balance">Journal</h1>
                            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
                                {demoJourneys.length} journeys · {demoJourneys.reduce((n, j) => n + j.entryCount, 0)} entries
                                logged · {demoJourneys.filter((j) => j.status === "active").length} currently active.
                            </p>
                        </div>
                        <button className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-foreground py-2 pl-2 pr-3 text-background ring-1 ring-foreground hover:bg-foreground/90 transition-colors">
                            <Plus className="size-4" strokeWidth={2.25} />
                            <span className="text-sm font-medium">Create Journey</span>
                        </button>
                    </div>
                </header>

                {/* Controls bar */}
                <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] items-center">
                    {/* Search */}
                    <div className="flex items-center gap-2 rounded-sm bg-surface px-3 py-2 hairline focus-within:border-foreground/40 transition-colors">
                        <Search className="size-4 text-muted-foreground shrink-0" />
                        <input
                            type="text"
                            placeholder="Search journeys, tags, categories…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                        />
                    </div>

                    {/* Filter chips */}
                    <div className="flex items-center gap-1 rounded-sm bg-surface p-1 hairline overflow-x-auto">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`label-mono shrink-0 px-3 py-1.5 rounded-xs transition-colors ${filter === f.value
                                    ? "bg-card text-foreground shadow-sm border border-border"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}


                        {/* Sort dropdown */}
                        <div className="relative inline-flex items-center gap-1 rounded-sm bg-surface px-3 py-2 hairline">
                            <span className="label-mono text-muted-foreground">{"Sort:"}</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="appearance-none bg-transparent pr-5 focus:outline-none cursor-pointer"
                            >
                                <option value="updated">Last updated</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="created">Created date</option>
                                <option value="manual">Manual order</option>
                            </select>
                            <ChevronDown className="size-3.5 text-muted-foreground pointer-events-none absolute right-2.5" />
                        </div>
                    </div>


                </div>

                {/* Journey grid */}
                {visible.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {visible.map((j, i) => (
                            <div key={j.slug} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                                <JourneyCard journey={j} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </main>

            <footer className="mx-auto max-w-7xl px-5 sm:px-8 py-12 mt-12 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* <span className="label-mono text-muted-foreground">Field.Operator · A quiet place for long-form progress.</span> */}
                    <span className="label-mono text-muted-foreground">A quiet place for long-form progress.</span>
                    <span className="label-mono text-muted-foreground">v0.1 · 2026</span>
                </div>
            </footer>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="mx-auto max-w-md text-center py-24">
            <div className="mx-auto mb-6 grid size-16 place-items-center rounded-sm bg-surface-2 hairline">
                <Plus className="size-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Start your first journey</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                A journey is a long-form thread of entries — building something, learning something,
                becoming something. Begin when you're ready.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-sm bg-foreground py-2 pl-2 pr-3 text-background">
                <Plus className="size-4" /> Create Journey
            </button>
        </div>
    );
}

export default JournalFeed