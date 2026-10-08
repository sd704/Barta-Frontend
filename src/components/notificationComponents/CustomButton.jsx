import cn from "../../utils/cn"

const variants = {
    default: "bg-orange-600 text-[#FDFAF4] shadow hover:bg-orange-600",
    destructive: "bg-[#C74C41] text-[#FDFAF4] shadow-sm hover:bg-[#C74C41]/90",
    outline: "border border-[#E9E4DC] bg-[#FDFAF4] shadow-sm hover:bg-[#F0EBD9] hover:text-[#302720]",
    secondary: "bg-[#F4F0E7] text-[#302720] shadow-sm hover:bg-[#F4F0E7]/80",
    ghost: "hover:bg-[#F0EBD9] hover:text-[#302720]",
    link: "text-orange-600 underline-offset-4 hover:underline",
};

const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
};

const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const CustomButton = ({ children, className = "", variant = "default", size = "default", ...props }) => {
    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    )
}

export default CustomButton