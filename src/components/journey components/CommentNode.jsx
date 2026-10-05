import { CornerDownRight } from "lucide-react";

const CommentNode = ({ comment, depth = 0 }) => {
    return (
        <div className={depth > 0 ? "pl-6 sm:pl-8 border-l border-[rgba(0, 0, 0, 0.08)]" : ""}>
            <div className="flex gap-4">

                {/* User Initials/Avatar */}
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-100 border border-black/8">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">{comment.initials}</span>
                </div>

                <div className="flex-1 min-w-0">

                    {/* Marcus 2H Ago */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a]">{comment.timeAgo}</span>
                    </div>

                    {/* Comment Body */}
                    <p className="text-sm text-[#18181b]/85 leading-relaxed">{comment.body}</p>

                    {/* Reply button */}
                    <button className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#71717a] hover:text-[#ff5c35] transition-colors">
                        <CornerDownRight className="size-3" />Reply
                    </button>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 space-y-6">
                    {comment.replies.map((r) => (<CommentNode key={r.id} comment={r} depth={depth + 1} />))}
                </div>
            )}
        </div>
    );
}

export default CommentNode;