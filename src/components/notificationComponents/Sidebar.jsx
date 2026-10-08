import SidebarCard from "./SidebarCard";
import SidebarCardStat from "./SidebarCardStat";
import { sidebarData } from "../../utils/notificationDummyData"

const Sidebar = () => {
    const s = sidebarData;
    return (
        <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
                <SidebarCard title="This week" mono="WK 26 / 26">
                    <div className="space-y-5">
                        <SidebarCardStat label="New connections" value={s.connectionsThisWeek.length} />
                        <div className="flex -space-x-2">
                            {s.connectionsThisWeek.map((p) => (
                                <img key={p.handle} src={p.avatar} alt={p.name} className="h-8 w-8 rounded-full border-2 border-[#FFFDFA] object-cover" />
                            ))}
                        </div>
                        <div className="h-px bg-[#DCD7CF]" />
                        <SidebarCardStat label="New journey followers" value={s.newJourneyFollowers} />
                        <SidebarCardStat label="Unread messages" value={s.unreadMessages} />
                    </div>
                </SidebarCard>

                <SidebarCard title="Most active journey" mono="Live">
                    <p className="font-serif text-[18px] leading-snug text-[#201914]">{s.mostActiveJourney.title}</p>
                    <p className="mt-1 text-[13px] text-[#6B6159]">{s.mostActiveJourney.activity}</p>
                </SidebarCard>

                <SidebarCard title="Recent mentions" mono={`${s.recentMentions.length}`}>
                    <ul className="space-y-4">
                        {s.recentMentions.map((m, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <img src={m.from.avatar} alt={m.from.name} className="h-8 w-8 rounded-full border border-[#DCD7CF] object-cover" />
                                <div className="min-w-0">
                                    <p className="text-[13.5px] text-[#201914]">
                                        <span className="font-medium">{m.from.name}</span>
                                    </p>
                                    <p className="truncate text-[12.5px] text-[#6B6159]">{m.where}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </SidebarCard>

                <p className="px-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#6B6159]/80">
                    — A quiet log. No alerts, no badges.
                </p>
            </div>
        </aside>
    );
}

export default Sidebar