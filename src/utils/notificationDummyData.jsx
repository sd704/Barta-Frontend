// export type TimeGroup = "Today" | "Yesterday" | "This Week" | "Earlier";

const p = (name, handle, seed) => ({ name, handle, avatar: `https://i.pravatar.cc/120?u=${seed}`, });

const maya = p("Maya Lindgren", "mayal", "maya-l");
const idris = p("Idris Okafor", "idris", "idris-o");
const sora = p("Sora Tanabe", "sora", "sora-t");
const eli = p("Eli Brandt", "elib", "eli-b");
const noor = p("Noor Hassan", "noor", "noor-h");
const june = p("June Park", "junep", "june-p");
const theo = p("Theo Marchetti", "theo", "theo-m");
const ines = p("Inès Caron", "ines", "ines-c");
const kavi = p("Kavi Rao", "kavi", "kavi-r");

export const notifications = [
    {
        id: "n1",
        type: "journey_entry",
        unread: true,
        timestamp: "32m",
        group: "Today",
        from: maya,
        journeyTitle: "Learning to Sail the Hebrides",
        entryTitle: "Day 14 — The first solo tack",
        entryExcerpt:
            "The wind shifted just past Tobermory and for the first time it felt less like fighting and more like listening.",
        cover:
            "https://images.unsplash.com/photo-1500627964684-141351970a7f?w=800&q=80",
    },
    {
        id: "n2",
        type: "connection_request",
        unread: true,
        timestamp: "1h",
        group: "Today",
        from: idris,
        mutuals: 4,
        note: "We met briefly at the Lagos writing circle — would love to follow along.",
    },
    {
        id: "n3",
        type: "post_likes",
        unread: true,
        timestamp: "2h",
        group: "Today",
        postTitle: "On keeping a slow notebook in a fast year",
        people: [sora, eli, noor, june, theo],
        totalCount: 24,
    },
    {
        id: "n4",
        type: "mention",
        unread: false,
        timestamp: "4h",
        group: "Today",
        from: ines,
        where: "in a comment on Theo's journey",
        excerpt:
            "…this reminds me of what @you wrote about returning to the same trail in different weather.",
    },
    {
        id: "n5",
        type: "comment_reply",
        unread: false,
        timestamp: "7h",
        group: "Today",
        from: kavi,
        context: "your reply on “A small room, a long winter”",
        reply: "Yes — exactly that. I've been keeping the same hour every morning for a year now.",
    },
    {
        id: "n6",
        type: "connection_accepted",
        unread: false,
        timestamp: "Yesterday, 18:40",
        group: "Yesterday",
        from: sora,
    },
    {
        id: "n7",
        type: "journal_comment",
        unread: false,
        timestamp: "Yesterday, 14:12",
        group: "Yesterday",
        from: eli,
        entryTitle: "Notes from the second week of quiet",
        comment:
            "The bit about leaving the phone in another room — I've been trying the same thing. It's harder than I expected.",
    },
    {
        id: "n8",
        type: "journey_followed",
        unread: false,
        timestamp: "Yesterday, 09:02",
        group: "Yesterday",
        from: june,
        journeyTitle: "Rebuilding a 1962 Vespa",
        cover:
            "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&q=80",
    },
    {
        id: "n9",
        type: "post_comment",
        unread: false,
        timestamp: "Tue",
        group: "This Week",
        from: theo,
        postTitle: "What I learned re-reading my old journals",
        comment:
            "The line about your handwriting changing with the season — I had to stop and sit with that.",
    },
    {
        id: "n10",
        type: "journey_entry",
        unread: false,
        timestamp: "Mon",
        group: "This Week",
        from: noor,
        journeyTitle: "A Year Without New Books",
        entryTitle: "Month 6 — Re-reading Berger",
        entryExcerpt:
            "I thought I'd remember more. Instead it felt like meeting a friend who had quietly changed.",
        cover:
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80",
    },
    {
        id: "n11",
        type: "post_likes",
        unread: false,
        timestamp: "Sun",
        group: "This Week",
        postTitle: "Three questions I ask at the end of every journey",
        people: [maya, idris, kavi],
        totalCount: 11,
    },
    {
        id: "n12",
        type: "mention",
        unread: false,
        timestamp: "May 14",
        group: "Earlier",
        from: theo,
        where: "in the journey “Walking the Camino, slowly”",
        excerpt:
            "…borrowing the framing @you used — that arriving is also a form of leaving.",
    },
    {
        id: "n13",
        type: "connection_accepted",
        unread: false,
        timestamp: "May 11",
        group: "Earlier",
        from: ines,
    },
];

export const filterCounts = (items) => ({
    all: items.length,
    unread: items.filter((n) => n.unread).length,
    connections: items.filter((n) => ["connection_request", "connection_accepted"].includes(n.type)).length,
    journals: items.filter((n) => ["journey_entry", "journey_followed", "journal_comment"].includes(n.type)).length,
    posts: items.filter((n) => ["post_likes", "post_comment"].includes(n.type)).length,
    comments: items.filter((n) => ["post_comment", "comment_reply", "journal_comment"].includes(n.type)).length,
    mentions: items.filter((n) => n.type === "mention").length,
});

export const sidebarData = {
    connectionsThisWeek: [maya, idris, sora, eli, noor],
    newJourneyFollowers: 12,
    unreadMessages: 3,
    mostActiveJourney: { title: "Learning to Sail the Hebrides", activity: "8 new responses this week" },
    recentMentions: [{ from: ines, where: "Theo's journey" }, { from: theo, where: "Walking the Camino, slowly" }],
};
