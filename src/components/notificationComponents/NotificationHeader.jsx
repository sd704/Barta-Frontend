import { CheckCheck, Settings2 } from "lucide-react";
import CustomButton from "./CustomButton"

const NotificationHeader = ({ unread, onMarkAll }) => {
    return (
        <header className="border-b border-[#DCD7CF] pb-8">
            {/* <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B6159]">
                — Activity / Field log
            </p> */}
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#201914] sm:text-6xl">Notifications</h1>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#6B6159]">
                        A quiet record of who responded to your journeys, journals, and writing.
                        Read in your own time — nothing here is urgent.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {unread > 0 && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#DCD7CF] bg-[#FFFDFA] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#201914] shadow-soft">
                            <span className="relative inline-flex h-1.5 w-1.5">
                                <span className="animate-notif-pulse absolute inset-0 rounded-full bg-orange-600" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-600" />
                            </span>
                            {unread} unread
                        </span>
                    )}
                    <CustomButton variant="ghost" size="sm" onClick={onMarkAll} className="gap-2 text-[#6B6159] hover:text-[#201914]">
                        <CheckCheck className="h-4 w-4" />Mark all read
                    </CustomButton>
                    <CustomButton variant="ghost" size="icon" className="text-[#6B6159] hover:text-[#201914]" aria-label="Notification settings">
                        <Settings2 className="h-4 w-4" />
                    </CustomButton>
                </div>
            </div>
        </header>
    );
}

export default NotificationHeader