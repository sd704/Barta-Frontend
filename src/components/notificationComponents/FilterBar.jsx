import { Search } from "lucide-react";
import cn from "../../utils/cn"

const FILTERS = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "connections", label: "Connections" },
    { key: "journals", label: "Journals" },
    { key: "posts", label: "Posts" },
    { key: "comments", label: "Comments" },
    { key: "mentions", label: "Mentions" },
];

const FilterBar = ({ filter, setFilter, counts, query, setQuery, }) => {
    return (
        <div className="sticky top-0 z-10 border-b border-[#DCD7CF] bg-[#FDFAF4]/85 py-3 backdrop-blur supports-backdrop-filter:bg-zinc-200/70">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="-mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1">
                    {FILTERS.map((f) => {
                        const active = filter === f.key;
                        const count = counts[f.key];
                        return (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={cn(
                                    "group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-200",
                                    active
                                        ? "border-[#201914]/80 bg-[#201914] text-[#FDFAF4] shadow-[0 1px 2px rgba(32, 25, 20, 0.04), 0 8px 24px -12px rgba(32, 25, 20, 0.08)]"
                                        : "border-[#DCD7CF] bg-[#FFFDFA] text-[#6B6159] hover:border-[#201914]/30 hover:text-[#201914]",
                                )}
                            >
                                <span className="tracking-tight">{f.label}</span>
                                <span className={cn("font-mono text-[10px] tabular-nums", active ? "text-[#FDFAF4]/70" : "text-[#6B6159]/70",)}>{count}</span>
                            </button>
                        );
                    })}
                </div>
                {/* <div className="relative w-full max-w-xs">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B6159]" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search activity"
                        className="h-9 w-full rounded-full border border-[#DCD7CF] bg-[#FFFDFA] pl-9 pr-3 text-[13px] text-[#201914] placeholder:text-[#6B6159]/70 focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default FilterBar