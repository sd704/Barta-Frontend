import { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // support for GitHub Flavored Markdown (GFM)
import { ArrowLeft, Globe, Lock, Users } from "lucide-react";
import { journeyBySlug, author } from "../components/journey components/JourneyData";
import PrevNextCard from "../components/journey components/PrevNextCard";
import CommentsSection from "../components/journey components/CommentsSection";
import FloatingDock from "../components/journey components/FloatingDock";

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

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    // Progress tracker for the reading progress bar at the top of the page
    // const [progress, setProgress] = useState(0);
    // useEffect(() => {
    //     const onScroll = () => {
    //         const h = document.documentElement;
    //         const total = h.scrollHeight - h.clientHeight;
    //         setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    //     };
    //     onScroll();
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, []);

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
        <div className="h-screen w-screen overflow-y-scroll ">

            <div className="mx-auto max-w-6xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 py-12">
                <article className="min-w-0 max-w-[68ch] mx-auto lg:mx-0 w-full">

                    {/* Back Links */}
                    <nav className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-10">
                        <ArrowLeft className="size-3" />
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

                    {/* Entry Body */}
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

                        {/* Tags -> Top right Corner */}
                        {entry.tags.length > 0 && (
                            <div>
                                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-2">Tags</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {entry.tags.map(t => (
                                        <span key={t} className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm bg-zinc-100 px-2 py-1 text-[#18181b]/70">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cover Image with Title -> below tags */}
                        <div className="pt-6 border-t border-[rgba(0, 0, 0, 0.08)]">
                            <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-3">From journey</div>
                            <Link to={`/journal/${journey.slug}`} className="group block">
                                <div className="aspect-video rounded-md overflow-hidden bg-[#efeeea] border border-black/8 mb-3">
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
            <FloatingDock entry={entry} liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} />
        </div>
    );
}

export default JournalEntry