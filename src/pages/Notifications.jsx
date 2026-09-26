import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Bell, CheckCheck, Heart, MessageCircle, Quote, Search, Settings2, UserPlus, Users } from "lucide-react";
import { notifications as seedNotifications, filterCounts, sidebarData } from "../utils/notificationDummyData"
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
function cn(...inputs) { return twMerge(clsx(inputs)) }

const FILTERS = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "connections", label: "Connections" },
    { key: "journals", label: "Journals" },
    { key: "posts", label: "Posts" },
    { key: "comments", label: "Comments" },
    { key: "mentions", label: "Mentions" },
];

const GROUP_ORDER = ["Today", "Yesterday", "This Week", "Earlier"];

function matchesFilter(n, f) {
    switch (f) {
        case "all": return true;
        case "unread": return n.unread;
        case "connections": return n.type === "connection_request" || n.type === "connection_accepted";
        case "journals": return (n.type === "journey_entry" || n.type === "journey_followed" || n.type === "journal_comment");
        case "posts": return n.type === "post_likes" || n.type === "post_comment";
        case "comments": return (n.type === "post_comment" || n.type === "comment_reply" || n.type === "journal_comment");
        case "mentions": return n.type === "mention";
    }
}

const Notifications = () => {
    const [items, setItems] = useState(seedNotifications);
    const [filter, setFilter] = useState("all") // type FilterKey =  | "all"  | "unread"  | "connections"  | "journals"  | "posts"  | "comments"  | "mentions";
    const [query, setQuery] = useState("");
    const counts = useMemo(() => filterCounts(items), [items]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((n) => {
            if (!matchesFilter(n, filter)) return false;
            if (!q) return true;
            return JSON.stringify(n).toLowerCase().includes(q);
        });
    }, [items, filter, query]);

    const grouped = useMemo(() => {
        const map = new Map();
        for (const g of GROUP_ORDER) map.set(g, []);
        for (const n of filtered) map.get(n.group)?.push(n);
        return GROUP_ORDER.filter((g) => (map.get(g) ?? []).length > 0).map((g) => [g, map.get(g)]);
    }, [filtered]);

    const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    const markRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

    return (
        // bg-[#FDFAF4]
        <div className="h-screen text-[#201914] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
                {/* <TopNav /> */}

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <main>
                        <Header unread={counts.unread} onMarkAll={markAllRead} />

                        <FilterBar filter={filter} setFilter={setFilter} counts={counts} query={query} setQuery={setQuery} />

                        {grouped.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className="mt-8 space-y-14">
                                {grouped.map(([group, list]) => (
                                    <section key={group}>
                                        <GroupHeading label={group} count={list.length} />
                                        <ul className="mt-5 space-y-3">
                                            {list.map((n, i) => (
                                                <li
                                                    key={n.id}
                                                    className="animate-notif-enter"
                                                    style={{ animationDelay: `${Math.min(i * 40, 240)}ms` }}
                                                >
                                                    <NotificationRow n={n} onRead={markRead} />
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        )}
                    </main>

                    <ActivitySidebar />
                </div>
            </div>
        </div>
    )
}

/* ------------------------------ Layout pieces ----------------------------- */

// function TopNav() {
//     return (
//         <nav className="flex items-center justify-between">
//             <Link to="/" className="font-serif text-2xl tracking-tight text-[#201914]">
//                 Field<span className="italic text-orange-600">Notes</span>
//             </Link>
//             <div className="hidden items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B6159] sm:flex">
//                 <span>v.01</span>
//                 <span className="mx-2 h-3 w-px bg-border" />
//                 <span>quiet edition</span>
//             </div>
//         </nav>
//     );
// }

function Header({ unread, onMarkAll }) {
    return (
        <header className="border-b border-[#DCD7CF] pb-8">
            {/* <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B6159]">
                — Activity / Field log
            </p> */}
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#201914] sm:text-6xl">
                        Notifications
                    </h1>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B6159]">
                        A quiet record of who responded to your journeys, journals, and writing.
                        Read in your own time — nothing here is urgent.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {unread > 0 && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#DCD7CF] bg-[#FFFDFA] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#201914] shadow-soft">
                            <span className="relative inline-flex h-1.5 w-1.5">
                                <span className="animate-notif-pulse absolute inset-0 rounded-full bg-orange-600" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-600" />
                            </span>
                            {unread} unread
                        </span>
                    )}
                    <NewButton variant="ghost" size="sm" onClick={onMarkAll} className="gap-2 text-[#6B6159] hover:text-[#201914]">
                        <CheckCheck className="h-4 w-4" />Mark all read
                    </NewButton>
                    <NewButton variant="ghost" size="icon" className="text-[#6B6159] hover:text-[#201914]" aria-label="Notification settings">
                        <Settings2 className="h-4 w-4" />
                    </NewButton>
                </div>
            </div>
        </header>
    );
}

function FilterBar({ filter, setFilter, counts, query, setQuery, }) {
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
                                <span
                                    className={cn(
                                        "font-mono text-[10px] tabular-nums",
                                        active ? "text-[#FDFAF4]/70" : "text-[#6B6159]/70",
                                    )}
                                >
                                    {count}
                                </span>
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

function GroupHeading({ label, count }) {
    return (
        <div className="flex items-baseline gap-4">
            <h2 className="font-serif text-2xl italic text-[#201914]">{label}</h2>
            <span className="h-px flex-1 bg-[#DCD7CF]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6159]">
                {String(count).padStart(2, "0")}
            </span>
        </div>
    );
}

/* ----------------------------- Row dispatcher ----------------------------- */

function NotificationRow({ n, onRead, }) {
    return (
        <CardShell unread={n.unread} onClick={() => n.unread && onRead(n.id)}>
            {n.type === "connection_request" && <ConnectionRequestBody n={n} />}
            {n.type === "connection_accepted" && <ConnectionAcceptedBody n={n} />}
            {n.type === "journey_entry" && <JourneyEntryBody n={n} />}
            {n.type === "post_comment" && <PostCommentBody n={n} />}
            {n.type === "comment_reply" && <CommentReplyBody n={n} />}
            {n.type === "post_likes" && <PostLikesBody n={n} />}
            {n.type === "journey_followed" && <JourneyFollowedBody n={n} />}
            {n.type === "journal_comment" && <JournalCommentBody n={n} />}
            {n.type === "mention" && <MentionBody n={n} />}
        </CardShell>
    );
}

function CardShell({ children, unread, onClick }) {
    return (
        <article
            onClick={onClick}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-[#FFFDFA] px-5 py-5 transition-all duration-300 sm:px-6",
                "border-[#DCD7CF] hover:-translate-y-0.5 hover:border-[#201914]/20 hover:shadow-lift",
                unread && "bg-[#FFFDFA]",
            )}
        >
            {unread && (<span className="absolute left-0 top-0 h-full w-0.75 bg-orange-600" aria-hidden />)}
            {children}
        </article>
    );
}

/* ----------------------------- Activity sidebar --------------------------- */

function ActivitySidebar() {
    const s = sidebarData;
    return (
        <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
                <SidebarCard title="This week" mono="WK 26 / 26">
                    <div className="space-y-5">
                        <Stat label="New connections" value={s.connectionsThisWeek.length} />
                        <div className="flex -space-x-2">
                            {s.connectionsThisWeek.map((p) => (
                                <img key={p.handle} src={p.avatar} alt={p.name}
                                    className="h-8 w-8 rounded-full border-2 border-[#FFFDFA] object-cover" />
                            ))}
                        </div>
                        <div className="h-px bg-[#DCD7CF]" />
                        <Stat label="New journey followers" value={s.newJourneyFollowers} />
                        <Stat label="Unread messages" value={s.unreadMessages} />
                    </div>
                </SidebarCard>

                <SidebarCard title="Most active journey" mono="Live">
                    <p className="font-serif text-[18px] leading-snug text-[#201914]">{s.mostActiveJourney.title}</p>
                    <p className="mt-1 text-[13px] text-[#6B6159]">{s.mostActiveJourney.activity}</p>
                </SidebarCard>

                <SidebarCard title="Recent mentions" mono={`${s.recentMentions.length}`}>
                    <ul className="space-y-4">
                        {s.recentMentions.map((m, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <img src={m.from.avatar} alt={m.from.name}
                                    className="h-8 w-8 rounded-full border border-[#DCD7CF] object-cover" />
                                <div className="min-w-0">
                                    <p className="text-[13.5px] text-[#201914]">
                                        <span className="font-medium">{m.from.name}</span>
                                    </p>
                                    <p className="truncate text-[12.5px] text-[#6B6159]">{m.where}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </SidebarCard>

                <p className="px-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#6B6159]/80">
                    — A quiet log. No alerts, no badges.
                </p>
            </div>
        </aside>
    );
}

function SidebarCard({ title, mono, children }) {
    return (
        <section className="rounded-2xl border border-[#DCD7CF] bg-[#FFFDFA] p-5 shadow-soft">
            <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-serif text-[17px] italic text-[#201914]">{title}</h3>
                {mono && (<span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">{mono}</span>)}
            </div>
            {children}
        </section>
    );
}

function Stat({ label, value }) {
    return (
        <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] text-[#6B6159]">{label}</span>
            <span className="font-serif text-2xl tabular-nums text-[#201914]">{value}</span>
        </div>
    );
}

/* ----------------------------- NewButton --------------------------- */

const variants = {
    default: "bg-orange-600 text-[#FDFAF4] shadow hover:bg-orange-600",
    destructive: "bg-[#C74C41] text-[#FDFAF4] shadow-sm hover:bg-[#C74C41]/90",
    outline: "border border-[#E9E4DC] bg-[#FDFAF4] shadow-sm hover:bg-[#F0EBD9] hover:text-[#302720]",
    secondary: "bg-[#F4F0E7] text-[#302720] shadow-sm hover:bg-[#F4F0E7]/80",
    ghost: "hover:bg-[#F0EBD9] hover:text-[#302720]",
    link: "text-orange-600 underline-offset-4 hover:underline",
};

const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
};

const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

function NewButton({ children, className = "", variant = "default", size = "default", ...props }) {
    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    );
}

/* --------------------------------- Bodies --------------------------------- */

function Avatar({ p, size = 40 }) {
    return (
        <img src={p.avatar} alt={p.name} width={size} height={size} style={{ width: size, height: size }}
            className="rounded-full border border-[#DCD7CF] object-cover" />
    );
}

function Meta({ icon, label, timestamp, }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">
                <span className="text-[#201914]/60">{icon}</span>
                {label}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">
                {timestamp}
            </span>
        </div>
    );
}

function PersonLine({ p, action }) {
    return (
        <p className="text-[15px] leading-relaxed text-[#201914]">
            <span className="font-medium">{p.name}</span>{" "}
            <span className="text-[#6B6159]">{action}</span>
        </p>
    );
}

function ConnectionRequestBody({ n }) {
    return (
        <div>
            <Meta icon={<UserPlus className="h-3 w-3" />} label="Connection request" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} size={48} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action={`would like to follow your journeys · ${n.mutuals} mutual`} />
                    {n.note && (
                        <blockquote className="mt-3 border-l-2 border-[#DCD7CF] pl-4 font-serif text-[16px] italic leading-relaxed text-[#201914]/80">
                            “{n.note}”
                        </blockquote>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                        <NewButton size="sm" className="rounded-full bg-[#201914] text-[#FDFAF4] hover:bg-[#201914]/90">Accept</NewButton>
                        <NewButton size="sm" variant="ghost" className="rounded-full text-[#6B6159] hover:text-[#201914]">Later</NewButton>
                        <NewButton size="sm" variant="ghost" className="rounded-full text-[#6B6159] hover:text-[#201914]">View profile</NewButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ConnectionAcceptedBody({ n }) {
    return (
        <div>
            <Meta icon={<Users className="h-3 w-3" />} label="Now connected" timestamp={n.timestamp} />
            <div className="mt-4 flex items-center gap-4">
                <Avatar p={n.from} />
                <PersonLine p={n.from} action="accepted your connection. Say hello when you have a moment." />
            </div>
        </div>
    );
}

function JourneyEntryBody({ n }) {
    return (
        <div>
            <Meta icon={<ArrowUpRight className="h-3 w-3" />} label={`Journey · ${n.journeyTitle}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action="added a new entry to a journey you follow." />
                    <div className="mt-4 flex gap-4 overflow-hidden rounded-xl border border-[#DCD7CF] bg-[#FDFAF4]/60">
                        <img src={n.cover} alt="" className="h-24 w-28 shrink-0 object-cover sm:h-28 sm:w-32" />
                        <div className="min-w-0 flex-1 py-3 pr-4">
                            <p className="font-serif text-[18px] leading-snug text-[#201914]">{n.entryTitle}</p>
                            <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-[#6B6159]">{n.entryExcerpt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostCommentBody({ n }) {
    return (
        <div>
            <Meta icon={<MessageCircle className="h-3 w-3" />} label={`Comment · ${n.postTitle}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action="commented on your post." />
                    <p className="mt-3 rounded-lg bg-[#F2EEE6]/50 px-4 py-3 text-[14px] leading-relaxed text-[#201914]/85">{n.comment}</p>
                </div>
            </div>
        </div>
    );
}

function CommentReplyBody({ n }) {
    return (
        <div>
            <Meta icon={<MessageCircle className="h-3 w-3" />} label="Reply" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action={`replied to ${n.context}.`} />
                    <p className="mt-3 rounded-lg bg-[#F2EEE6]/50 px-4 py-3 text-[14px] leading-relaxed text-[#201914]/85">{n.reply}</p>
                </div>
            </div>
        </div>
    );
}

function PostLikesBody({ n }) {
    const visible = n.people.slice(0, 4);
    const extras = Math.max(0, n.totalCount - visible.length);
    return (
        <div>
            <Meta icon={<Heart className="h-3 w-3 animate-heart-pulse" />} label="Appreciation" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <div className="flex -space-x-2">
                    {visible.map((p) => (
                        <img key={p.handle} src={p.avatar} alt={p.name} className="h-9 w-9 rounded-full border-2 border-[#FFFDFA] object-cover" />
                    ))}
                    {extras > 0 && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFFDFA] bg-[#F2EEE6] font-mono text-[11px] text-[#201914]">
                            +{extras}
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-relaxed text-[#201914]">
                        <span className="font-medium">{visible[0].name}</span>
                        <span className="text-[#6B6159]">
                            {" "}and {n.totalCount - 1} others responded to{" "}
                        </span>
                        <span className="font-serif italic text-[#201914]">“{n.postTitle}”</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function JourneyFollowedBody({ n }) {
    return (
        <div>
            <Meta icon={<ArrowUpRight className="h-3 w-3" />} label="New follower" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine
                        p={n.from}
                        action={
                            <>
                                started following{" "}
                                <span className="font-serif italic text-[#201914]">“{n.journeyTitle}”</span>.
                            </>
                        }
                    />

                    <div className="mt-3 inline-flex items-center gap-3 rounded-lg border border-[#DCD7CF] bg-[#FDFAF4]/60 p-2 pr-4">
                        <img src={n.cover} alt="" className="h-12 w-12 rounded-md object-cover" />
                        <span className="font-serif text-[15px] text-[#201914]">{n.journeyTitle}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JournalCommentBody({ n }) {
    return (
        <div>
            <Meta icon={<MessageCircle className="h-3 w-3" />} label={`Journal · ${n.entryTitle}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action="left a note on your journal entry." />
                    <p className="mt-3 rounded-lg bg-[#F2EEE6]/50 px-4 py-3 text-[14px] leading-relaxed text-[#201914]/85">{n.comment}</p>
                </div>
            </div>
        </div>
    );
}

function MentionBody({ n }) {
    return (
        <div>
            <Meta icon={<Quote className="h-3 w-3" />} label={`Mention · ${n.where}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <PersonLine p={n.from} action="mentioned you." />
                    <blockquote className="mt-3 border-l-2 border-orange-600 pl-4 font-serif text-[16px] italic leading-relaxed text-[#201914]/85">
                        {n.excerpt}
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------ Empty state ------------------------------- */

function EmptyState() {
    return (
        <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-[#DCD7CF] bg-[#FFFDFA]/60 px-6 py-20 text-center">
            <Bell className="h-7 w-7 text-[#6B6159]/60" />
            <h3 className="mt-5 font-serif text-2xl italic text-[#201914]">Nothing waiting for you</h3>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6B6159]">
                When someone responds to a journey, post, or journal entry, you'll find it here —
                in its own time.
            </p>
            <Link to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#DCD7CF] bg-[#FFFDFA] px-4 py-2 text-[13px] text-[#201914] hover:border-[#201914]/30">
                Open a new journey <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
        </div>
    );
}


export default Notifications