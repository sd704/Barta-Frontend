const ProgressRing = ({ value, size = 96, stroke = 6, color = "#ff5c35", trackColor = "#e4e4e7" }) => {

    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (value / 100) * c;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
                />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                    <div className="font-mono text-lg font-semibold tracking-tighter tabular-nums">{value}%</div>
                    <div className="font-mono font-semibold tracking-[0.18em] uppercase text-[8px] text-[#71717a] -mt-0.5">Complete</div>
                </div>
            </div>
        </div>
    );
}

export default ProgressRing;