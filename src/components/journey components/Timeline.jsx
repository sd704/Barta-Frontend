import { Link } from "react-router";
import { Circle, Trophy, Lightbulb, Compass, AlertTriangle, Rocket, Heart, MessageCircle, Share2, ArrowUpRight, } from "lucide-react";

const typeMeta = {
    journal: { label: "Journal", Icon: Circle, color: "text-muted-foreground", bg: "bg-muted-foreground/15" },
    milestone: { label: "Milestone", Icon: Trophy, color: "text-[var(--color-te-orange)]", bg: "bg-[var(--color-te-orange)]/10" },
    lesson: { label: "Lesson", Icon: Lightbulb, color: "text-[var(--color-te-amber)]", bg: "bg-[var(--color-te-amber)]/10" },
    decision: { label: "Decision", Icon: Compass, color: "text-[var(--color-te-blue)]", bg: "bg-[var(--color-te-blue)]/10" },
    failure: { label: "Failure", Icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
    launch: { label: "Launch", Icon: Rocket, color: "text-[var(--color-te-green)]", bg: "bg-[var(--color-te-green)]/10" },
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
            <div className="z-10 grid size-9 shrink-0 place-items-center rounded-sm bg-foreground text-background ring-4 ring-background">
                <span className="font-mono text-[10px] font-bold">{chapter.number}</span>
            </div>
            <div>
                <div className="label-mono text-muted-foreground">Chapter {chapter.number}</div>
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
            <div className={`absolute top-1 grid place-items-center rounded-full ring-4 ring-background ${meta.bg} ${big ? "left-1 size-9" : "left-[14px] sm:left-[18px] size-6"}`}>
                <Icon className={`${meta.color} ${big ? "size-4" : "size-3"}`} strokeWidth={2.25} />
            </div>

            <Link to={`/journal/${journeySlug}/entry/${entry.id}`}
                className="group block card-soft card-lift card-lift-hover rounded-[8px] p-5 sm:p-6"
            >
                <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className={`label-mono ${meta.color}`}>{meta.label}</span>
                        <span className="size-0.5 rounded-full bg-muted-foreground/50 shrink-0" />
                        <span className="label-mono text-muted-foreground truncate">{date} · {time}</span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>

                <h4 className="text-lg font-medium tracking-tight text-balance">{entry.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">{entry.preview}</p>

                {entry.cover && (
                    <div className="mt-4 aspect-[16/7] overflow-hidden rounded-[6px] bg-surface-2">
                        <img src={entry.cover} alt="" loading="lazy" className="size-full object-cover" />
                    </div>
                )}

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                        {entry.tags.map((t) => (
                            <span key={t} className="label-mono rounded-sm bg-surface-2 px-2 py-1 text-foreground/70">{t}</span>
                        ))}
                        {entry.mood && (<span className="label-mono text-muted-foreground">Mood · {entry.mood}</span>)}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
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
            <div className="absolute left-[26px] sm:left-[34px] top-2 bottom-2 w-px bg-border" />
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