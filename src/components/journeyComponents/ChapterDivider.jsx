const ChapterDivider = ({ chapter }) => {
    return (
        <div className="relative my-12 flex items-center gap-5 pl-1 sm:pl-2" id={`chapter-${chapter.id}`}>

            {/* Chapter 01 */}
            <div className="grid size-9 shrink-0 place-items-center rounded-sm bg-zinc-900 text-[#f4f3f0]">
                <span className="font-mono text-[10px] font-bold">{chapter.number}</span>
            </div>

            {/* Chapter Name */}
            <div>
                <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Chapter {chapter.number}</div>
                <h3 className="text-lg font-medium tracking-tight">{chapter.title}</h3>
            </div>
        </div>
    );
}

export default ChapterDivider;