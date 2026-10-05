import { Link } from "react-router";
import { motion } from "motion/react"
import { Pin, Lock, Users, Globe, MoreHorizontal } from "lucide-react";

const statusStyle = {
    active: { label: "Active", dot: "bg-orange-500", text: "text-orange-500" },
    completed: { label: "Completed", dot: "bg-green-600", text: "text-green-600" },
    paused: { label: "Paused", dot: "bg-[#f5a524]", text: "text-[#f5a524]" },
    archived: { label: "Archived", dot: "bg-[#71717a]", text: "text-[#71717a]" },
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
    const MotionLink = motion.create(Link)

    return (
        <MotionLink to={`/journal/${journey.slug}`} className="group block bg-zinc-100 rounded-[10px] p-1.5 relative"
            whileHover={{ y: -2, boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02), 0 12px 28px -12px rgba(24, 24, 27, 0.18)", borderColor: "rgba(0, 0, 0, 0.14)" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1], }}
        >
            {journey.pinned && (
                <div className="absolute -top-2 -right-2 z-10 grid size-7 place-items-center rounded-full bg-[#18181b] text-[#f4f3f0] shadow-md">
                    <Pin className="size-3" strokeWidth={2.25} />
                </div>
            )}

            <div className="relative aspect-video overflow-hidden rounded-md bg-[#efeeea]">
                <img src={journey.cover} alt="" width={1280} height={720} loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-sm bg-[#f4f3f0]/85 backdrop-blur px-2 py-1">
                    <span className={`size-1.5 rounded-full ${s.dot}`} />
                    <span className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${s.text}`}>{s.label}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-sm bg-[#f4f3f0]/85 backdrop-blur px-2 py-1 text-[#71717a]">
                    <VisibilityIcon v={journey.visibility} />
                </div>
            </div>

            <div className="px-3 pt-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{journey.category}</span>
                    <button
                        className="grid size-6 place-items-center rounded-sm text-[#71717a] opacity-0 group-hover:opacity-100 hover:bg-[#efeeea] transition-opacity"
                        onClick={(e) => e.preventDefault()}
                        aria-label="More actions"
                    >
                        <MoreHorizontal className="size-4" />
                    </button>
                </div>
                <h3 className="text-base font-medium tracking-tight text-[#18181b]">{journey.title}</h3>
                <p className="mt-1.5 min-h-12 text-sm text-[#71717a] line-clamp-2 leading-relaxed">{journey.description}</p>

                <div className="mt-5 pt-4 border-t border-[rgba(0, 0, 0, 0.08)] flex items-center justify-between">
                    <div className="flex gap-4">
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.entryCount}</div>
                            <div className="font-mono font-semibold tracking-[0.18em] uppercase text-[9px] text-[#71717a]/90">Entries</div>
                        </div>
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.milestoneCount}</div>
                            <div className="font-mono font-semibold tracking-[0.18em] uppercase text-[9px] text-[#71717a]/90">Miles</div>
                        </div>
                        <div>
                            <div className="font-mono text-[13px] font-semibold tabular-nums">{journey.followers}</div>
                            <div className="font-mono font-semibold tracking-[0.18em] uppercase text-[9px] text-[#71717a]/90">Followers</div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <div className="h-1 flex-1 rounded-full bg-zinc-200 overflow-hidden">
                        <div
                            className={`h-full ${journey.status === "completed" ?
                                "bg-green-600" : journey.status === "paused" ?
                                    "bg-[#f5a524]" : journey.status === "archived" ?
                                        "bg-[#71717a]" : "bg-orange-500"}`}
                            style={{ width: `${journey.progress}%` }}
                        />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tabular-nums w-9 text-right">{journey.progress}%</span>
                </div>

                <div className="mt-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]/90">Updated {fmtDate(journey.lastUpdated)}</div>
            </div>
        </MotionLink>
    );
}

export default JourneyCard;