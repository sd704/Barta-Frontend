import { Bell } from "lucide-react";

const NotifEmptyState = () => {
    return (
        // "rounded-3xl border border-dashed border-[#DCD7CF] bg-[#FFFDFA]/60 px-6 py-20"
        <div className="mt-16 flex flex-col items-center text-center">
            <Bell className="h-7 w-7 text-[#6B6159]/60" />
            <h3 className="mt-5 font-serif text-2xl italic text-[#201914]">Nothing waiting for you</h3>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#6B6159]">
                When someone responds to a journey, post, or journal entry, you'll find it here — in its own time.
            </p>
        </div>
    );
}

export default NotifEmptyState