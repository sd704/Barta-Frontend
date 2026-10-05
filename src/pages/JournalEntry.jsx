import { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // support for GitHub Flavored Markdown (GFM)
import { ArrowLeft, ArrowRight, Heart, Bookmark, Share2, MessageCircle, Globe, Lock, Users, CornerDownRight } from "lucide-react";
// import AppNav from "../components/journey components/AppNav"
import { journeyBySlug, author } from "../components/journey components/JourneyData";

const visibilityMeta = {
    public: { Icon: Globe, label: "Public" },
    friends: { Icon: Users, label: "Friends" },
    private: { Icon: Lock, label: "Private" },
};

function fmt(iso) {
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
}

const JournalEntry = () => {
    const { jid, eid } = useParams()
    const journey = journeyBySlug(jid);
    const entry = journey.entries.find(e => e.id === eid);

    const { date, time } = fmt(entry.date);
    const VisIcon = visibilityMeta[entry.visibility].Icon;

    const [progress, setProgress] = useState(0);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const total = h.scrollHeight - h.clientHeight;
            setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const flatEntries = useMemo(() =>
        journey.chapters
            .flatMap(c => c.entries)
            .map(id => journey.entries.find(e => e.id === id))
            .filter(e => Boolean(e)),
        [journey],
    );
    const idx = flatEntries.findIndex((e) => e.id === entry.id);
    const prev = idx > 0 ? flatEntries[idx - 1] : null;
    const next = idx >= 0 && idx < flatEntries.length - 1 ? flatEntries[idx + 1] : null;

    return (
        <div className="h-screen w-screen overflow-y-auto">
            {/* <AppNav /> */}

            {/* Reading progress */}
            <div className="sticky top-14 z-40 h-0.5 w-full bg-transparent">
                <div className="h-full bg-[#ff5c35] transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>

            <div className="mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 py-12">
                <article className="min-w-0 max-w-[68ch] mx-auto lg:mx-0 w-full">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-10">
                        <Link to="/journal" className="hover:text-[#18181b] transition-colors">Journal</Link>
                        <span>/</span>
                        <Link to={`/journal/${journey.slug}`} className="hover:text-[#18181b] transition-colors truncate max-w-[40ch]">{journey.title}</Link>
                    </nav>

                    <header className="mb-12 animate-fade-up">
                        <div className="flex items-center gap-2 flex-wrap mb-6">
                            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm bg-[#18181b] text-[#f4f3f0] px-2 py-1">{entry.type}</span>
                            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{date} · {time}</span>
                            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm border border-zinc-400 px-2 py-1 text-[#71717a] inline-flex items-center gap-1.5">
                                <VisIcon className="size-3" />
                                {visibilityMeta[entry.visibility].label}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-balance leading-[1.1]">{entry.title}</h1>
                        <p className="mt-5 text-lg text-[#71717a] leading-snug text-pretty">{entry.preview}</p>

                        <div className="mt-8 pt-6 border-t border-[rgba(0, 0, 0, 0.08)] flex items-center gap-3">
                            <div className="grid size-9 place-items-center rounded-full bg-[#efeeea] border border-black/8">
                                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">{author.initials}</span>
                            </div>
                            <div>
                                <div className="text-sm font-medium">{author.name}</div>
                                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{entry.readingTime} min read</div>
                            </div>
                        </div>
                    </header>

                    {entry.cover && (
                        <div className="mb-12 aspect-video overflow-hidden rounded-lg border border-black/8 bg-[#efeeea]">
                            <img src={entry.cover} alt="" loading="lazy" className="size-full object-cover" />
                        </div>
                    )}

                    <div className="entry-prose">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
                    </div>

                    {/* Prev / Next */}
                    <div className="mt-24 pt-10 border-t border-[rgba(0, 0, 0, 0.08)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <PrevNextCard side="prev" entry={prev} slug={journey.slug} />
                        <PrevNextCard side="next" entry={next} slug={journey.slug} />
                    </div>

                    {/* Comments */}
                    <CommentsSection comments={entry.comments} />
                </article>

                {/* Marginalia */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        <div>
                            <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-2">Mood</div>
                            <div className="text-sm font-medium">{entry.mood}</div>
                        </div>
                        {entry.tags.length > 0 && (
                            <div>
                                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-2">Tags</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {entry.tags.map(t => (
                                        <span key={t} className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm bg-[#efeeea] px-2 py-1 text-[#18181b]/70">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="pt-6 border-t border-[rgba(0, 0, 0, 0.08)]">
                            <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-3">From journey</div>
                            <Link to={`/journal/${journey.slug}`} className="group block">
                                <div className="aspect-video rounded-[6px] overflow-hidden bg-[#efeeea] border border-black/8 mb-3">
                                    <img src={journey.cover} alt="" className="size-full object-cover" />
                                </div>
                                <div className="text-sm font-medium group-hover:text-[#ff5c35] transition-colors">{journey.title}</div>
                                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mt-1">{journey.entryCount} entries</div>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Floating action rail */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full bg-[#ffffff]/95 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] border border-black/8 px-2 py-1.5">
                <ActionPill active={liked} onClick={() => setLiked((v) => !v)} Icon={Heart} activeColor="text-[#ff5c35]">
                    <span className="font-mono text-xs tabular-nums">{entry.likes + (liked ? 1 : 0)}</span>
                </ActionPill>
                <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
                <ActionPill Icon={MessageCircle}>
                    <span className="font-mono text-xs tabular-nums">{entry.comments.length}</span>
                </ActionPill>
                <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
                <ActionPill active={saved} onClick={() => setSaved((v) => !v)} Icon={Bookmark} activeColor="text-[#007aff]" />
                <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
                <ActionPill Icon={Share2} />
            </div>
        </div>
    );
}

function ActionPill({ Icon, children, active, onClick, activeColor }) {
    return (
        <button onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#efeeea] transition-colors ${active ? activeColor : "text-[#18181b]/80"}`}>
            <Icon className="size-4" strokeWidth={2.25} fill={active ? "currentColor" : "none"} />
            {children}
        </button>
    );
}

function PrevNextCard({ side, entry, slug }) {
    if (!entry)
        return (
            <div className={`hidden sm:block rounded-lg border border-zinc-400 p-5 text-[#71717a] ${side === "next" ? "text-right" : ""}`}>
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">{side === "prev" ? "Start of journey" : "End of journey"}</div>
            </div>
        );
    return (
        <Link to={`/journal/${slug}/entry/${entry.id}`}
            className={`group block rounded-lg bg-white border border-black/8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] card-lift card-lift-hover p-5 ${side === "next" ? "text-right" : ""}`}>
            <div className={`flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-3 ${side === "next" ? "justify-end" : ""}`}>
                {side === "prev" && <ArrowLeft className="size-3" />}
                {side === "prev" ? "Previous" : "Next"}
                {side === "next" && <ArrowRight className="size-3" />}
            </div>
            <h4 className="font-medium text-[#18181b] group-hover:text-[#ff5c35] transition-colors text-balance">{entry.title}</h4>
            <div className="mt-2 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">
                {entry.type} ·{" "}
                {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", })}
            </div>
        </Link>
    );
}

function CommentsSection({ comments }) {
    return (
        <section className="mt-24 pt-12 border-t border-[rgba(0, 0, 0, 0.08)]">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Responses</div>
                    <h3 className="mt-1 text-lg font-medium tracking-tight">
                        {comments.length} {comments.length === 1 ? "comment" : "comments"}
                    </h3>
                </div>
            </div>

            {/* Composer */}
            <div className="rounded-lg bg-[#fafaf8] border border-black/8 p-1 mb-12">
                <textarea
                    placeholder="Share your thoughts…"
                    className="w-full bg-[#ffffff] rounded-[6px] p-4 text-sm focus:outline-none min-h-[110px] resize-none"
                />
                <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Markdown supported · Be kind</span>
                    <button className="rounded-sm bg-[#18181b] text-[#f4f3f0] px-3 py-1.5 text-xs font-medium">Post comment</button>
                </div>
            </div>

            <div className="space-y-10">
                {comments.length === 0 ? (
                    <p className="text-sm text-[#71717a]">No responses yet. Be the first to share a thought.</p>
                ) : (
                    comments.map((c) => <CommentNode key={c.id} comment={c} />)
                )}
            </div>
        </section>
    );
}

function CommentNode({ comment, depth = 0 }) {
    return (
        <div className={depth > 0 ? "pl-6 sm:pl-8 border-l border-[rgba(0, 0, 0, 0.08)]" : ""}>
            <div className="flex gap-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#efeeea] border border-black/8">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">{comment.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{comment.timeAgo}</span>
                    </div>
                    <p className="text-sm text-[#18181b]/85 leading-relaxed">{comment.body}</p>
                    <button className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] hover:text-[#ff5c35] transition-colors">
                        <CornerDownRight className="size-3" />
                        Reply
                    </button>
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 space-y-6">
                    {comment.replies.map((r) => (<CommentNode key={r.id} comment={r} depth={depth + 1} />))}
                </div>
            )}
        </div>
    );
}
export default JournalEntry