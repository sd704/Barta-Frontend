import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link } from "react-router";
import { Plus, Share2, Heart, MoreHorizontal, ArrowLeft, Sparkles, Pencil, Globe, Lock, Users } from "lucide-react";
// import AppNav from "../components/journey components/AppNav"
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
      {/* <AppNav /> */}

      {/* Reading progress bar */}
      <div className="sticky top-14 z-40 h-0.5 w-full bg-transparent">
        <div className="h-full bg-[var(--color-te-orange)] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Breadcrumb */}
        <Link to="/" className="mt-8 inline-flex items-center gap-2 label-mono text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-3" /> Journal
        </Link>

        {/* HERO */}
        <section className="mt-6 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
            <div className="min-w-0">
              <div className="aspect-[16/9] overflow-hidden rounded-[8px] hairline bg-surface-2">
                <img src={journey.cover} alt="" width={1280} height={720} className="size-full object-cover" />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="label-mono rounded-sm bg-foreground text-background px-2 py-1">Project · {journey.category}</span>
                <span className="label-mono rounded-sm hairline px-2 py-1 text-muted-foreground">Status · {journey.status}</span>
                <span className="label-mono rounded-sm hairline px-2 py-1 text-muted-foreground inline-flex items-center gap-1.5">
                  <VisibilityIcon className="size-3" />
                  {visibilityMeta[journey.visibility].label}
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-medium tracking-tight text-balance">{journey.title}</h1>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-snug max-w-2xl text-pretty">{journey.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-sm bg-foreground py-2 pl-2 pr-3 text-background ring-1 ring-foreground hover:bg-foreground/90 transition-colors">
                  <Plus className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Add Entry</span>
                </button>
                <button
                  onClick={() => setFollowing((f) => !f)}
                  className={`inline-flex items-center gap-2 rounded-sm py-2 pl-2 pr-3 ring-1 transition-colors ${following
                    ? "bg-[var(--color-te-orange)] text-white ring-[var(--color-te-orange)]"
                    : "bg-card ring-border hover:border-foreground/40"
                    }`}
                >
                  <Heart className="size-4" strokeWidth={2.25} fill={following ? "currentColor" : "none"} />
                  <span className="text-sm font-medium">{following ? "Following" : "Follow Journey"}</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-sm bg-card py-2 pl-2 pr-3 hairline hover:border-foreground/40 transition-colors">
                  <Share2 className="size-4 text-muted-foreground" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-sm bg-card py-2 pl-2 pr-3 hairline hover:border-foreground/40 transition-colors">
                  <Pencil className="size-4 text-muted-foreground" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button className="grid place-items-center size-9 rounded-sm bg-card hairline hover:border-foreground/40 transition-colors">
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Stat panel */}
            <aside className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-[8px] bg-card hairline p-5">
                <div className="label-mono text-muted-foreground mb-5">Stats Monitor</div>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-0 lg:divide-y lg:divide-border">
                  <Stat label="Days" value={journey.durationDays.toString()} />
                  <Stat label="Entries" value={journey.entryCount.toString()} />
                  <Stat label="Milestones" value={journey.milestoneCount.toString()} />
                </div>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <ProgressRing value={journey.progress} size={84} stroke={5} />
                  <div className="text-right">
                    <div className="font-mono text-2xl font-semibold tabular-nums">{journey.followers.toLocaleString()}</div>
                    <div className="label-mono text-muted-foreground">Followers</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[8px] bg-[var(--color-te-blue)]/5 border border-[var(--color-te-blue)]/20 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-3.5 text-[var(--color-te-blue)]" />
                  <span className="label-mono text-[var(--color-te-blue)]">AI Summary</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed text-pretty">{journey.aiSummary}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* CHAPTER NAV (sticky) */}
        <nav className="sticky top-0 z-30 mt-16 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-background/85 backdrop-blur-md border-y border-border">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="label-mono text-muted-foreground mr-3 shrink-0">Chapters</span>
            {journey.chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#chapter-${ch.id}`}
                className="label-mono shrink-0 rounded-sm px-2.5 py-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors"
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
          <div className="rounded-[10px] bg-foreground text-background p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-end">
              <div>
                <div className="label-mono text-background/60 mb-3">Share Card</div>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">{journey.title}</h3>
                <p className="mt-2 text-background/70 text-sm max-w-md">
                  By {author.name} · {journey.durationDays} days · {journey.progress}% complete
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <Stat dark label="Days" value={journey.durationDays.toString()} />
                  <Stat dark label="Entries" value={journey.entryCount.toString()} />
                  <Stat dark label="Milestones" value={journey.milestoneCount.toString()} />
                  <Stat dark label="Followers" value={journey.followers.toLocaleString()} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-te-orange)] py-2 pl-2 pr-3 text-white hover:opacity-95 transition-opacity">
                  <Share2 className="size-4" strokeWidth={2.25} />
                  <span className="text-sm font-medium">Share to feed</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-sm bg-background/10 ring-1 ring-background/20 py-2 pl-2 pr-3 text-background hover:bg-background/15 transition-colors">
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

function Stat({ label, value, dark }) {
  return (
    <div className={`lg:py-4 lg:first:pt-0 lg:last:pb-0`}>
      <div className={`font-mono text-2xl font-semibold tabular-nums tracking-tighter ${dark ? "text-background" : ""}`}>{value}</div>
      <div className={`label-mono ${dark ? "text-background/60" : "text-muted-foreground"}`}>{label}</div>
    </div>
  );
}

export default JournalOverview