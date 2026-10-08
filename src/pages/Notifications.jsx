import { useMemo, useState } from "react";
import { notifications as seedNotifications, filterCounts } from "../utils/notificationDummyData"
import NotificationHeader from "../components/notificationComponents/NotificationHeader";
import FilterBar from "../components/notificationComponents/FilterBar";
import GroupHeading from "../components/notificationComponents/GroupHeading";
import Sidebar from "../components/notificationComponents/Sidebar";
import NotificationRow from "../components/notificationComponents/NotificationRow"
import NotifEmptyState from "../components/notificationComponents/NotifEmptyState"

const GROUP_ORDER = ["Today", "Yesterday", "This Week", "Earlier"];

const matchesFilter = (n, f) => {
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
        <div className="h-screen text-[#201914] overflow-y-scroll">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <main>
                        <NotificationHeader unread={counts.unread} onMarkAll={markAllRead} />

                        <FilterBar filter={filter} setFilter={setFilter} counts={counts} query={query} setQuery={setQuery} />

                        {grouped.length === 0 ? (
                            <NotifEmptyState />
                        ) : (
                            <div className="mt-8 space-y-14">
                                {grouped.map(([group, list]) => (
                                    <section key={group}>
                                        <GroupHeading label={group} count={list.length} />
                                        <ul className="mt-5 space-y-3">
                                            {list.map((n, i) => (
                                                <li key={n.id} className="animate-notif-enter" style={{ animationDelay: `${Math.min(i * 40, 240)}ms` }}>
                                                    <NotificationRow n={n} onRead={markRead} />
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        )}
                    </main>

                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Notifications