const SidebarCardStat = ({ label, value }) => {

    // New connections     5
    //New journey followers     12

    return (
        <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13.5px] text-[#6B6159]">{label}</span>
            <span className="font-serif text-2xl tabular-nums text-[#201914]">{value}</span>
        </div>
    )
}

export default SidebarCardStat