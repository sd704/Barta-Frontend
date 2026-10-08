import ChapterDivider from "./ChapterDivider"
import TimelineEntry from "./TimelineEntry"

const Timeline = ({ journey }) => {
    return (
        <div className="relative">

            {/* Line connecting the nodes */}
            <div className="absolute left-6.5 top-2 bottom-0 w-px bg-zinc-400" />

            {journey.chapters.map((chapter) => {
                const entries = chapter.entries
                    .map((id) => journey.entries.find((e) => e.id === id))
                    .filter((e) => Boolean(e));
                return (
                    <div key={chapter.id}>

                        {/* Chapter 01 Planning */}
                        <ChapterDivider chapter={chapter} />

                        <div className="space-y-8 sm:space-y-10">
                            {entries.map((e) => (<TimelineEntry key={e.id} entry={e} journeySlug={journey.slug} />))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Timeline;