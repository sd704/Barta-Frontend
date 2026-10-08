const NotifRowCardFirstLine = ({ icon, label, timestamp, }) => {

    // Journey · Learning to Sail the Hebrides     32m
    // Connection request      1h

    return (
        <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">
                <span className="text-[#201914]/60">{icon}</span>
                {label}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6159]">{timestamp}</span>
        </div>
    );
}

export default NotifRowCardFirstLine