const GroupHeading = ({ label, count }) => {

    // Today, Yesterday, This Week, Earlier

    return (
        <div className="flex items-baseline gap-4">
            <h2 className="font-serif text-2xl italic text-[#201914]">{label}</h2>
            <span className="h-px flex-1 bg-zinc-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {String(count).padStart(2, "0")}
            </span>
        </div>
    );
}

export default GroupHeading