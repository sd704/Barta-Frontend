import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PrevNextCard = ({ side, entry, slug }) => {
    if (!entry)
        return (
            <div className={`hidden sm:block rounded-lg bg-zinc-100 border border-zinc-300 shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] p-5 text-[#71717a] ${side === "next" ? "text-right" : ""}`}>
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">{side === "prev" ? "Start of journey" : "End of journey"}</div>
            </div>
        );
    return (
        <Link to={`/journal/${slug}/entry/${entry.id}`}
            className={`group block rounded-lg bg-zinc-100 border border-zinc-300 shadow-[0_1px_0_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] card-lift card-lift-hover p-5 ${side === "next" ? "text-right" : ""}`}>
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

export default PrevNextCard;