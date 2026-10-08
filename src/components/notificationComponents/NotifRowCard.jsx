import cn from "../../utils/cn"

const NotifRowCard = ({ children, unread, onClick }) => {
    return (
        <article
            onClick={onClick}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-[#FFFDFA] px-5 py-5 transition-all duration-300 sm:px-6",
                "border-[#DCD7CF] hover:-translate-y-0.5 hover:border-[#201914]/20 hover:shadow-lift",
                unread && "bg-[#FFFDFA]",
            )}
        >
            {unread && (<span className="absolute left-0 top-0 h-full w-0.75 bg-orange-600" aria-hidden />)}
            {children}
        </article>
    )
}

export default NotifRowCard