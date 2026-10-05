import CommentNode from "./CommentNode";

const CommentsSection = ({ comments }) => {
    return (
        <section className="mt-24 pt-12 border-t border-[rgba(0, 0, 0, 0.08)]">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Responses</div>

                    {/* Comment Count */}
                    <h3 className="mt-1 text-lg font-medium tracking-tight">
                        {comments.length} {comments.length === 1 ? "comment" : "comments"}
                    </h3>
                </div>
            </div>

            {/* Comment Box */}
            <div className="rounded-lg bg-zinc-300 border border-black/8 p-1 mb-12">
                <textarea
                    placeholder="Share your thoughts…"
                    className="w-full bg-zinc-100 rounded-md p-4 text-sm focus:outline-none min-h-27.5 resize-none"
                />
                <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">Markdown supported · Be kind</span>
                    <button className="rounded-sm bg-[#18181b] text-[#f4f3f0] px-3 py-1.5 text-xs font-medium">Post comment</button>
                </div>
            </div>

            {/* Existing Comments */}
            <div className="space-y-10">
                {comments.length === 0 ? (
                    <p className="text-sm text-[#71717a]">No responses yet. Be the first to share a thought.</p>
                ) : (
                    comments.map((c) => <CommentNode key={c.id} comment={c} />)
                )}
            </div>
        </section>
    );
}

export default CommentsSection;