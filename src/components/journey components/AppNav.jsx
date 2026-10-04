import { Link } from "react-router";
import { Plus, Search } from "lucide-react";

const AppNav = () => {

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="grid size-7 place-items-center rounded-sm bg-foreground text-background">
                        <span className="label-mono text-[8px]">F·O</span>
                    </div>
                    <span className="label-mono text-foreground/80 group-hover:text-foreground transition-colors">Field.Operator</span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5">
                        <span className="size-1.5 rounded-full bg-[var(--color-te-green)] shadow-[0_0_8px_var(--color-te-green)]" />
                        <span className="label-mono text-muted-foreground">System Active</span>
                    </div>
                    <div className="h-4 w-px bg-border mx-1" />
                    <button className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 hover:bg-surface-2 transition-colors">
                        <Search className="size-3.5 text-muted-foreground" />
                        <span className="label-mono text-muted-foreground">Search</span>
                        <kbd className="label-mono ml-2 rounded-sm border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground/80">⌘K</kbd>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="hidden sm:inline-flex items-center gap-2 rounded-sm bg-foreground py-2 pl-2 pr-3 text-background ring-1 ring-foreground/90 hover:bg-foreground/90 transition-colors">
                        <Plus className="size-4" strokeWidth={2.25} /><span className="text-sm font-medium">New Journey</span>
                    </button>
                    <button className="grid size-9 place-items-center rounded-full bg-surface-2 hairline">
                        <span className="label-mono text-foreground">SP</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default AppNav;
