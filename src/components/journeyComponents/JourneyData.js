const coverMusic = "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1280&h=720&fit=crop&q=80"
const coverKanji = "https://images.unsplash.com/photo-1505940545481-2cac7ae15782?w=1280&h=720&fit=crop&q=80"
const coverPorsche = "https://images.unsplash.com/photo-1611651186486-415f04eb78e4?w=1280&h=720&fit=crop&q=80"
const coverBook = "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=1280&h=720&fit=crop&q=80"
const coverFitness = "https://images.unsplash.com/photo-1562771242-a02d9090c90c?w=1280&h=720&fit=crop&q=80"
const coverReact = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1280&h=720&fit=crop&q=80"

export const author = { name: "John Doe", handle: "johndoe", initials: "JD" };

// ---------------- Music platform entries ----------------

const musicEntries = [
    {
        id: "m-01",
        chapterId: "c1",
        type: "journal",
        title: "First sketch — what would this even be?",
        preview: "Spent the morning at a cafe drawing boxes and arrows. A platform for independent jazz, where the algorithm respects taste.",
        body: `## The shape of an idea

Started this morning with nothing but a notebook and a flat white. The question I kept circling: *what would a music platform look like if it was built for the listener who actually cares?*

Not for the algorithm. Not for ad inventory. For the person who spent three hours last Tuesday searching for the perfect Sunday morning record.

## What I sketched

- A discovery layer that weights *taste*, not popularity
- Curation circles — small groups whose early signals matter
- No infinite scroll. Sessions, not feeds.

The whole thing is still a hand wave. But I can see the silhouette of it now.`,
        date: "2024-01-08T09:14:00Z",
        readingTime: 2,
        mood: "Curious",
        tags: ["origin", "sketching"],
        visibility: "public",
        likes: 42,
        comments: [],
    },
    {
        id: "m-02",
        chapterId: "c1",
        type: "decision",
        title: "Switching to Canvas for the sequencer grid",
        preview:
            "SVG just isn't cutting it on older hardware. Moving the entire sequencer UI to a 2D Canvas context.",
        body: `## Why

SVG was beautiful in development. Every note was a real DOM element, every interaction was free. But on a 2019 MacBook Air with a 200-bar arrangement, the page hitched every time you scrubbed the playhead.

## The decision

Moving the entire piano-roll surface to a 2D Canvas. I lose accessibility tree, I lose CSS, I lose the comfortable React mental model.

> Precision is the only thing that separates a tool from a toy.

I gain 60fps on a five-year-old laptop. That trade is not close.`,
        date: "2024-02-19T14:02:00Z",
        readingTime: 3,
        mood: "Decisive",
        tags: ["Architecture", "Performance"],
        visibility: "public",
        likes: 88,
        comments: [],
    },
    {
        id: "m-03",
        chapterId: "c2",
        type: "milestone",
        title: "First successful audio handshake",
        preview:
            "Got the Web Audio API talking to the worker thread without dropping frames. Latency dropped from 45ms to 8ms.",
        body: `## A small, real victory

After three weeks of fighting with \`AudioWorkletNode\` and message ports, the scheduler finally locked in.

\`\`\`ts
function scheduler() {
  while (nextNoteTime < ctx.currentTime + lookAhead) {
    scheduleNote(current16th, nextNoteTime)
    nextNote()
  }
}
\`\`\`

8ms. On a budget Chromebook. I almost cried into my keyboard.`,
        date: "2024-04-03T11:30:00Z",
        readingTime: 4,
        mood: "Elated",
        tags: ["Milestone", "Audio"],
        visibility: "public",
        cover: coverMusic,
        likes: 214,
        comments: [
            {
                id: "c-01",
                author: "Marcus V.",
                initials: "MV",
                timeAgo: "2h ago",
                body: "Have you tried moving the scheduler entirely into an AudioWorklet? Avoids main-thread jitter completely.",
                replies: [
                    {
                        id: "c-01-r1",
                        author: "Sagar Pradhan",
                        initials: "SP",
                        timeAgo: "1h ago",
                        body: "Next on the roadmap. Currently sorting out cross-browser WASM support first.",
                    },
                ],
            },
            {
                id: "c-02",
                author: "Elena Thorne",
                initials: "ET",
                timeAgo: "5h ago",
                body: "This whole journey has been such a clean read. The way you frame engineering decisions is rare.",
            },
        ],
    },
    {
        id: "m-04",
        chapterId: "c2",
        type: "failure",
        title: "The migration that ate a weekend",
        preview: "Tried to move from SQLite to Postgres on a Friday night. Saturday and Sunday were a mess.",
        body: `## What went wrong

Underestimated the foreign-key surface area. Underestimated how many of my dev fixtures relied on \`AUTOINCREMENT\` semantics. Underestimated the size of the artist-followers join table.

By Sunday at 11pm I had reverted everything and ordered pizza.

## What I learned

- Migrations need a written rollback plan before they start
- "It's just SQL" is a lie I keep telling myself
- Pizza is non-negotiable`,
        date: "2024-05-12T22:11:00Z",
        readingTime: 3,
        mood: "Humbled",
        tags: ["Postmortem"],
        visibility: "friends",
        likes: 67,
        comments: [],
    },
    {
        id: "m-05",
        chapterId: "c2",
        type: "lesson",
        title: "Latency is a design problem, not a code problem",
        preview: "Three months of micro-optimizations did less than one good UI affordance. The pre-roll loader changed everything.",
        body: `## The realization

I had been chasing milliseconds in the audio stack. Real users didn't notice 8ms vs 12ms — they noticed the *2 seconds* before the first sound played.

The fix was not technical. It was a 200-line component: a pre-roll loader that buffered the first beat *during* the spacebar press, before \`play()\` was ever called. Perception of instantaneous response.

## The lesson

Performance work without a user model is just craft for craft's sake. I needed to be specific about *whose time* I was saving.`,
        date: "2024-07-01T08:45:00Z",
        readingTime: 3,
        mood: "Reflective",
        tags: ["Design", "Lesson"],
        visibility: "public",
        likes: 156,
        comments: [],
    },
    {
        id: "m-06",
        chapterId: "c3",
        type: "launch",
        title: "Beta to the first 100 listeners",
        preview: "Quietly opened the door this morning. By lunch, the first concurrent stream went live and the infrastructure held.",
        body: `## We're live

Sent invite codes to the first 100 listeners at 7am. By 11:30 the first live stream — a 23-minute set from a Brooklyn quintet — had 48 concurrent listeners.

Nothing fell over. The CPU graphs barely twitched. Every assumption from the last 287 days got tested at once, and most of them held.

> Today felt like opening a door I built myself, and watching people walk through it.

## What's next

- Onboarding flow for the first 1,000
- Curation circles v0
- A real conversation with the artists about payouts`,
        date: "2024-10-22T18:00:00Z",
        readingTime: 5,
        mood: "Elated",
        tags: ["Launch", "Beta"],
        visibility: "public",
        cover: coverMusic,
        likes: 412,
        comments: [
            {
                id: "c-03",
                author: "Priya Sundar",
                initials: "PS",
                timeAgo: "1d ago",
                body: "Congratulations. Followed this from entry one — well earned.",
            },
        ],
    },
];

const musicJourney = {
    slug: "music-platform",
    title: "Building a music platform",
    description: "Designing and building a discovery-first listening platform for independent jazz. From the first sketch to a functional beta.",
    category: "Product",
    status: "active",
    visibility: "public",
    pinned: true,
    cover: coverMusic,
    startedAt: "2024-01-08",
    durationDays: 287,
    progress: 68,
    followers: 1284,
    entryCount: 84,
    milestoneCount: 17,
    lastUpdated: "2024-10-22",
    aiSummary: "Over 287 days, Sagar has moved a music platform from a single notebook sketch to a working beta with 100 listeners. The arc tracks a deliberate shift in attention — from infrastructure and audio plumbing in the early chapters, to user perception and product polish in the later ones.",
    chapters: [
        { id: "c1", number: "01", title: "Planning", entries: ["m-01", "m-02"] },
        { id: "c2", number: "02", title: "Building MVP", entries: ["m-03", "m-04", "m-05"] },
        { id: "c3", number: "03", title: "First listeners", entries: ["m-06"] },
    ],
    entries: musicEntries,
};

// ---------------- Other (lighter) journeys ----------------

const simpleEntry = (id, type, title, preview, date, chapterId, extras = {},) => ({
    id,
    type,
    title,
    preview,
    body: `## ${title}\n\n${preview}\n\nMore of the story to come — this is a seeded entry for the demo.`,
    date,
    readingTime: 2,
    mood: "Focused",
    tags: [],
    visibility: "public",
    chapterId,
    likes: 12,
    comments: [],
    ...extras,
});

const kanjiJourney = {
    slug: "learning-kanji",
    title: "Learning Kanji",
    description: "Daily log of 2,136 Jōyō kanji study and stroke order practice.",
    category: "Language",
    status: "active",
    visibility: "public",
    pinned: true,
    cover: coverKanji,
    startedAt: "2024-06-01",
    durationDays: 142,
    progress: 45,
    followers: 312,
    entryCount: 90,
    milestoneCount: 4,
    lastUpdated: "2024-10-20",
    aiSummary: "A steady, almost meditative practice. Sagar has been showing up nearly every day for 142 days, working through the Jōyō list in small, deliberate sets.",
    chapters: [
        { id: "k1", number: "01", title: "First 300", entries: ["k-01", "k-02"] },
        { id: "k2", number: "02", title: "Radicals as scaffolding", entries: ["k-03"] },
    ],
    entries: [
        simpleEntry("k-01", "journal", "Day one — the radical 水", "Started with water. Six strokes, two pronunciations, and suddenly everything looked like rain.", "2024-06-01T07:00:00Z", "k1"),
        simpleEntry("k-02", "milestone", "First 100 kanji", "Took 32 days. Surprisingly more about pattern recognition than memorization.", "2024-07-03T07:00:00Z", "k1", { type: "milestone", likes: 88 }),
        simpleEntry("k-03", "lesson", "Why radicals click on day 60", "After two months, individual characters started decomposing into their parts automatically. The trick was waiting.", "2024-08-12T07:00:00Z", "k2"),
    ],
};

const porscheJourney = {
    slug: "porsche-911",
    title: "Restoring the 911 engine",
    description: "A full mechanical restoration of a 1974 air-cooled flat six.",
    category: "Mechanical",
    status: "paused",
    visibility: "friends",
    pinned: false,
    cover: coverPorsche,
    startedAt: "2024-03-14",
    durationDays: 84,
    progress: 22,
    followers: 84,
    entryCount: 18,
    milestoneCount: 3,
    lastUpdated: "2024-06-30",
    aiSummary: "An on-and-off project. Real progress in March and April; paused since June while parts are on order from Stuttgart.",
    chapters: [
        { id: "p1", number: "01", title: "Teardown", entries: ["p-01"] },
    ],
    entries: [simpleEntry("p-01", "journal", "Pulling the engine, day one", "Six hours, two friends, one engine hoist. Forty-eight bolts I had to look up.", "2024-03-14T09:00:00Z", "p1")],
};

const bookJourney = {
    slug: "writing-a-novel",
    title: "Writing a novel",
    description: "Drafting a quiet science-fiction novel — 80,000 words across one year.",
    category: "Writing",
    status: "active",
    visibility: "private",
    pinned: false,
    cover: coverBook,
    startedAt: "2024-04-02",
    durationDays: 195,
    progress: 38,
    followers: 0,
    entryCount: 47,
    milestoneCount: 2,
    lastUpdated: "2024-10-18",
    aiSummary: "Private writing journal. 47 sessions, around 30,000 words on the page.",
    chapters: [{ id: "b1", number: "01", title: "Act One", entries: ["b-01"] }],
    entries: [simpleEntry("b-01", "journal", "The first chapter, third try", "Threw out the previous opening. The new one starts in a kitchen, mid-conversation.", "2024-04-02T20:00:00Z", "b1")],
};

const fitnessJourney = {
    slug: "fitness-transformation",
    title: "Fitness transformation",
    description: "A two-year strength and conditioning project — kettlebells, climbing, and recovery.",
    category: "Health",
    status: "completed",
    visibility: "public",
    pinned: false,
    cover: coverFitness,
    startedAt: "2022-09-01",
    durationDays: 720,
    progress: 100,
    followers: 642,
    entryCount: 168,
    milestoneCount: 22,
    lastUpdated: "2024-08-30",
    aiSummary: "Completed. A patient two-year arc with consistent weekly entries and a clear endpoint.",
    chapters: [{ id: "f1", number: "01", title: "Year one", entries: ["f-01"] }],
    entries: [simpleEntry("f-01", "milestone", "First unbroken pull-up", "Two years of negatives finally added up to a single clean rep.", "2023-01-12T07:00:00Z", "f1", { type: "milestone" })],
};

const reactJourney = {
    slug: "learning-react",
    title: "Learning React, properly",
    description: "Going back to fundamentals — hooks, suspense, server components.",
    category: "Engineering",
    status: "archived",
    visibility: "public",
    pinned: false,
    cover: coverReact,
    startedAt: "2023-06-01",
    durationDays: 120,
    progress: 100,
    followers: 198,
    entryCount: 36,
    milestoneCount: 6,
    lastUpdated: "2023-10-04",
    aiSummary: "Archived. A focused 4-month sprint through React 18 and 19 patterns.",
    chapters: [{ id: "r1", number: "01", title: "Hooks deep dive", entries: ["r-01"] }],
    entries: [simpleEntry("r-01", "lesson", "useEffect is a lifecycle escape hatch", "Most of my useEffect calls in 2022 should have been event handlers. Took me a year to admit it.", "2023-06-20T10:00:00Z", "r1")],
};

export const demoJourneys = [musicJourney, kanjiJourney, porscheJourney, bookJourney, fitnessJourney, reactJourney];

export const journeyBySlug = (slug) => demoJourneys.find((j) => j.slug === slug)