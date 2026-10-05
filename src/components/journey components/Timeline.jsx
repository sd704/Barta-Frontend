import { Link } from "react-router";
import { Circle, Trophy, Lightbulb, Compass, AlertTriangle, Rocket, Heart, MessageCircle, Share2, ArrowUpRight, } from "lucide-react";

const typeMeta = {
    journal: { label: "Journal", Icon: Circle, color: "text-[#71717a]", bg: "bg-[#71717a]/15" },
    milestone: { label: "Milestone", Icon: Trophy, color: "text-[#ff5c35]", bg: "bg-[#ff5c35]/10" },
    lesson: { label: "Lesson", Icon: Lightbulb, color: "text-[#f5a524]", bg: "bg-[#f5a524]/10" },
    decision: { label: "Decision", Icon: Compass, color: "text-[#007aff]", bg: "bg-[#007aff]/10" },
    failure: { label: "Failure", Icon: AlertTriangle, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
    launch: { label: "Launch", Icon: Rocket, color: "text-[#32d74b]", bg: "bg-[#32d74b]/10" },
};

function fmtDateTime(iso) {
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
}

export function ChapterDivider({ chapter }) {
    return (
        <div className="relative my-12 flex items-center gap-5 pl-1 sm:pl-2" id={`chapter-${chapter.id}`}>
            <div className="z-10 grid size-9 shrink-0 place-items-center rounded-sm bg-[#18181b] text-[#f4f3f0]">
                <span className="font-mono text-[10px] font-bold">{chapter.number}</span>
            </div>
            <div>
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Chapter {chapter.number}</div>
                <h3 className="text-lg font-medium tracking-tight">{chapter.title}</h3>
            </div>
        </div>
    );
}

export function TimelineEntry({ entry, journeySlug }) {
    const meta = typeMeta[entry.type];
    const { date, time } = fmtDateTime(entry.date);
    const Icon = meta.Icon;
    const big = entry.type === "milestone" || entry.type === "launch";
    return (
        <div className="relative pl-12 sm:pl-16">
            {/* Node */}
            <div className={`absolute top-1 grid place-items-center rounded-full bg-zinc-200 ${big ? "left-2 size-9" : "left-3.5 size-6"}`}>
                <div className={` grid place-items-center rounded-full ${meta.bg} ${big ? "left-2 size-9" : "left-3.5 size-6"}`}>
                    <Icon className={`${meta.color} ${big ? "size-4" : "size-3"}`} strokeWidth={2.25} />
                </div>
            </div>

            <Link to={`/journal/${journeySlug}/entry/${entry.id}`}
                className="group block bg-white border border-black/8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] card-lift card-lift-hover rounded-lg p-5 sm:p-6"
            >
                <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${meta.color}`}>{meta.label}</span>
                        <span className="size-0.5 rounded-full bg-[#71717a]/50 shrink-0" />
                        <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] truncate">{date} · {time}</span>
                    </div>
                    <ArrowUpRight className="size-4 text-[#71717a] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>

                <h4 className="text-lg font-medium tracking-tight text-balance">{entry.title}</h4>
                <p className="mt-2 text-sm text-[#71717a] leading-relaxed text-pretty">{entry.preview}</p>

                {entry.cover && (
                    <div className="mt-4 aspect-video overflow-hidden rounded-md bg-[#efeeea]">
                        <img src={entry.cover} alt="" loading="lazy" className="size-full object-cover" />
                    </div>
                )}

                <div className="mt-5 pt-4 border-t border-[rgba(0, 0, 0, 0.08)] flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        {entry.tags.map((t) => (
                            <span key={t} className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm bg-[#efeeea] px-2 py-1 text-[#18181b]/70">{t}</span>
                        ))}
                        {entry.mood && (<span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Mood · {entry.mood}</span>)}
                    </div>
                    <div className="flex items-center gap-4 text-[#71717a]">
                        <span className="flex items-center gap-1.5 text-xs">
                            <Heart className="size-3.5" />
                            <span className="font-mono tabular-nums">{entry.likes}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs">
                            <MessageCircle className="size-3.5" />
                            <span className="font-mono tabular-nums">{entry.comments.length}</span>
                        </span>
                        <Share2 className="size-3.5" />
                    </div>
                </div>
            </Link>
        </div>
    );
}

const Timeline = ({ journey }) => {
    return (
        <div className="relative">
            <div className="absolute left-6.5 top-2 bottom-0 w-px bg-zinc-400" />
            {journey.chapters.map((chapter) => {
                const entries = chapter.entries
                    .map((id) => journey.entries.find((e) => e.id === id))
                    .filter((e) => Boolean(e));
                return (
                    <div key={chapter.id}>
                        <ChapterDivider chapter={chapter} />
                        <div className="space-y-8 sm:space-y-10">
                            {entries.map((e) => (<TimelineEntry key={e.id} entry={e} journeySlug={journey.slug} />))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Timeline;