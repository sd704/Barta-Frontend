const SidebarCard = ({ title, mono, children }) => {
    return (
        <section className="rounded-2xl border border-[#DCD7CF] bg-[#FFFDFA] p-5 shadow-soft">
            <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-serif text-[17px] italic text-[#201914]">{title}</h3>
                {mono && (<span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">{mono}</span>)}
            </div>
            {children}
        </section>
    )
}

export default SidebarCard