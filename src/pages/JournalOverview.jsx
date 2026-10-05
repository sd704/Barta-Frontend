import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from "react-router";
import { Plus, Share2, Heart, MoreHorizontal, ArrowLeft, Sparkles, Pencil, Globe, Lock, Users } from "lucide-react";
import ProgressRing from "../components/journey components/ProgressRing"
import Timeline from "../components/journey components/Timeline"
import { journeyBySlug, author } from "../components/journey components/JourneyData";

const visibilityMeta = {
  public: { Icon: Globe, label: "Public" },
  friends: { Icon: Users, label: "Friends" },
  private: { Icon: Lock, label: "Private" },
};

const JournalOverview = () => {
  const { jid } = useParams()
  const journey = journeyBySlug(jid);
  const VisibilityIcon = visibilityMeta[journey.visibility].Icon;

  const [progress, setProgress] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-auto">

      {/* Reading progress bar */}
      <div className="sticky top-14 z-40 h-0.5 w-full bg-transparent">
        <div className="h-full bg-[#ff5c35] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Back Button */}
        <Link to="/journal" className="mt-12 inline-flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] hover:text-[#18181b] transition-colors">
          <ArrowLeft className="size-3" /> Journal
        </Link>

        {/* HERO */}
        <section className="mt-6 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
            <div className="min-w-0">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img src={journey.cover} alt="" width={1280} height={720} className="size-full object-cover" />
              </div>

              {/* Project · Product, Status · active, Public */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm bg-[#18181b] text-zinc-100 px-2 py-1">Project · {journey.category}</span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm border border-zinc-400 px-2 py-1 text-zinc-500">Status · {journey.status}</span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase rounded-sm border border-zinc-400 px-2 py-1 text-zinc-500 inline-flex items-center gap-1.5">
                  <VisibilityIcon className="size-3" />
                  {visibilityMeta[journey.visibility].label}
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="mt-5 text-4xl sm:text-5xl font-medium tracking-tight text-balance">{journey.title}</h1>
              <p className="mt-4 text-lg sm:text-xl text-[#71717a] leading-snug max-w-2xl text-pretty">{journey.description}</p>

              {/* Button Row Under Heading */}
              <div className="mt-8 flex flex-wrap items-center gap-3">

                {/* Add Entry Button */}
                <button className="inline-flex items-center gap-2 rounded-sm bg-[#18181b] py-2 pl-2 pr-3 text-[#f4f3f0] hover:bg-[#18181b]/90 transition-colors">
                  <Plus className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Add Entry</span>
                </button>

                {/* Follow Button */}
                <button
                  onClick={() => setFollowing((f) => !f)}
                  className={`group inline-flex items-center gap-2 rounded-sm py-2 pl-2 pr-3 transition-colors ${following
                    ? "bg-orange-600 text-white"
                    : "bg-zinc-100 border border-zinc-300 hover:border-orange-600"
                    }`}
                >
                  <Heart className={`size-4 ${!following ? "group-hover:fill-orange-600 group-hover:stroke-orange-600" : ""}`} strokeWidth={2.25} fill={following ? "currentColor" : "none"} />
                  <span className="text-sm font-medium">{following ? "Following" : "Follow Journey"}</span>
                </button>

                {/* Share Button */}
                <button className="inline-flex items-center gap-2 rounded-sm bg-zinc-100 py-2 pl-2 pr-3 border border-zinc-300 hover:border-zinc-500 transition-colors">
                  <Share2 className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Share</span>
                </button>

                {/* Edit Button */}
                <button className="inline-flex items-center gap-2 rounded-sm bg-zinc-100 py-2 pl-2 pr-3 border border-zinc-300 hover:border-zinc-500 transition-colors">
                  <Pencil className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Edit</span>
                </button>

                {/* More Button */}
                <button className="grid place-items-center size-9 rounded-sm bg-zinc-100 border border-zinc-300 hover:border-zinc-500 transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            </div>

            {/* Stat panel */}
            <aside className="lg:sticky lg:top-18 space-y-4">
              <div className="rounded-lg bg-zinc-100 border border-black/8 p-5 h-[405px] flex flex-col">
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mb-5">Stats Monitor</div>

                {/* Days, Entries, Milestones */}
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:divide-y lg:divide-[rgba(0, 0, 0, 0.08)] border-b border-[rgba(0, 0, 0, 0.08)]">
                  <Stat label="Days" value={journey.durationDays.toString()} />
                  <Stat label="Entries" value={journey.entryCount.toString()} />
                  <Stat label="Milestones" value={journey.milestoneCount.toString()} />
                </div>
                <div className="mt-5 flex flex-1 items-center justify-between">
                  <ProgressRing value={journey.progress} size={84} stroke={5} />

                  {/* Follower Count */}
                  <div className="text-right">
                    <div className="font-mono text-2xl font-semibold tabular-nums">{journey.followers.toLocaleString()}</div>
                    <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Followers</div>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <div className="rounded-lg bg-[#d9e8f7] border border-[#007aff]/20 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-3.5 text-[#007aff]" />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#007aff]">AI Summary</span>
                </div>
                <p className="text-sm text-[#18181b]/80 leading-relaxed text-pretty">{journey.aiSummary}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* CHAPTER NAV (sticky) */}
        <nav className="sticky top-0 z-30 mt-16 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-zinc-200/85 backdrop-blur-md border-y border-[rgba(0, 0, 0, 0.08)]">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] mr-3 shrink-0">Chapters</span>
            {journey.chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#chapter-${ch.id}`}
                className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase shrink-0 rounded-sm px-2.5 py-1.5 text-[#71717a] hover:text-orange-600 transition-colors"
              >
                {ch.number} · {ch.title}
              </a>
            ))}
          </div>
        </nav>

        {/* TIMELINE */}
        <section className="mt-12 mb-20">
          <Timeline journey={journey} />
        </section>

        {/* SHARE CARD */}
        <section className="mb-24">
          <div className="rounded-[10px] bg-[#18181b] text-[#f4f3f0] p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end">
              <div>

                {/* Title and Stats */}
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">{journey.title}</h3>
                <p className="mt-2 text-[#f4f3f0]/70 text-sm max-w-md">
                  By {author.name} · {journey.durationDays} days · {journey.progress}% complete
                </p>

                {/* Days, Entries, Milestones, Followers */}
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <Stat dark label="Days" value={journey.durationDays.toString()} />
                  <Stat dark label="Entries" value={journey.entryCount.toString()} />
                  <Stat dark label="Milestones" value={journey.milestoneCount.toString()} />
                  <Stat dark label="Followers" value={journey.followers.toLocaleString()} />
                </div>
              </div>

              {/* Buttons bottom right corner */}
              <div className="flex flex-col gap-2">
                <button className="inline-flex items-center gap-2 rounded-sm bg-[#ff5c35] py-2 pl-2 pr-3 text-white hover:opacity-95 transition-opacity">
                  <Share2 className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Share to feed</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-sm bg-[#f4f3f0]/10 ring-1 ring-[#f4f3f0]/20 py-2 pl-2 pr-3 text-[#f4f3f0] hover:bg-[#f4f3f0]/15 transition-colors">
                  <span className="text-sm font-medium">Create social post</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const Stat = ({ label, value, dark }) => {
  return (
    <div className="pb-2">
      <div className={`font-mono text-2xl font-semibold tabular-nums tracking-tighter ${dark ? "text-[#f4f3f0]" : ""}`}>{value}</div>
      <div className={`font-mono text-[10px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-[#f4f3f0]/60" : "text-[#71717a]"}`}>{label}</div>
    </div>
  );
}

export default JournalOverview