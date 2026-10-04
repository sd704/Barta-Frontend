import { Link } from "react-router";
import { Pin, Lock, Users, Globe, MoreHorizontal } from "lucide-react";


const statusStyle = {
    active: { label: "Active", dot: "bg-[var(--color-te-green)]", text: "text-[var(--color-te-green)]" },
    completed: { label: "Completed", dot: "bg-[var(--color-te-blue)]", text: "text-[var(--color-te-blue)]" },
    paused: { label: "Paused", dot: "bg-[var(--color-te-amber)]", text: "text-[var(--color-te-amber)]" },
    archived: { label: "Archived", dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

const VisibilityIcon = ({ v }) => {
    if (v === "private") return <Lock className="size-3" />;
    if (v === "friends") return <Users className="size-3" />;
    return <Globe className="size-3" />;
};

function fmtDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const JourneyCard = ({ journey }) => {

    const s = statusStyle[journey.status];

    return (
        <Link to={`/journal/${journey.slug}`} className="group block card-soft card-lift card-lift-hover rounded-[10px] p-1.5 relative">
            {journey.pinned && (
                <div className="absolute -top-2 -right-2 z-10 grid size-7 place-items-center rounded-full bg-foreground text-background shadow-md">
                    <Pin className="size-3" strokeWidth={2.25} />
                </div>
            )}

            <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] bg-surface-2">
                <img src={journey.cover} alt="" width={1280} height={720} loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-sm bg-background/85 backdrop-blur px-2 py-1">
                    <span className={`size-1.5 rounded-full ${s.dot}`} /><span className={`label-mono ${s.text}`}>{s.label}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-sm bg-background/85 backdrop-blur px-2 py-1 text-muted-foreground">
                    <VisibilityIcon v={journey.visibility} />
                </div>
            </div>

            <div className="px-3 pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="label-mono text-muted-foreground">{journey.category}</span>
                    <button
                        className="grid size-6 place-items-center rounded-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-surface-2 transition-opacity"
                        onClick={(e) => e.preventDefault()}
                        aria-label="More actions"
                    >
                        <MoreHorizontal className="size-4" />
                    </button>
                </div>
                <h3 className="text-base font-medium tracking-tight text-foreground">{journey.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{journey.description}</p>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex gap-4">
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.entryCount}</div>
                            <div className="label-mono text-[9px] text-muted-foreground/90">Entries</div>
                        </div>
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.milestoneCount}</div>
                            <div className="label-mono text-[9px] text-muted-foreground/90">Miles</div>
                        </div>
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.followers}</div>
                            <div className="label-mono text-[9px] text-muted-foreground/90">Followers</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div className="h-1 flex-1 rounded-full bg-surface-2 overflow-hidden">
                        <div
                            className={`h-full ${journey.status === "completed" ? "bg-[var(--color-te-blue)]" : journey.status === "paused" ? "bg-[var(--color-te-amber)]" : journey.status === "archived" ? "bg-muted-foreground" : "bg-[var(--color-te-orange)]"}`}
                            style={{ width: `${journey.progress}%` }}
                        />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tabular-nums w-9 text-right">{journey.progress}%</span>
                </div>

                <div className="mt-3 label-mono text-muted-foreground/90">Updated {fmtDate(journey.lastUpdated)}</div>
            </div>
        </Link>
    );
}

export default JourneyCard;