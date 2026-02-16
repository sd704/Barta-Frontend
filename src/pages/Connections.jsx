import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import USERS from "../utils/dummyUsers"
import SearchBar from "../components/SearchBar"
import TabButtonAccent from "../components/TabButtonAccent"
import UserCard from "../components/UserCard"

const Connections = () => {
    const FILTERS = ["DISCOVER", "CONNECTED", "BLOCKED"]
    const [search, setSearch] = useState("")
    const [activeTab, setTab] = useState(FILTERS[0])
    const [filteredList, setFilteredList] = useState(USERS.slice(0, 20));

    const handleFilter = (tab) => {
        switch (tab) {
            case "DISCOVER": setFilteredList(USERS.slice(0, 20))
                break;
            case "CONNECTED": setFilteredList(USERS.slice(5, 7))
                break;
            case "BLOCKED": setFilteredList(USERS.slice(7))
                break;
            default: setFilteredList([])
                console.log(`Unknown Filter ${tab}`);
        }
        setTab(tab)
    }

    return (
        <div className="h-screen p-4 sm:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">PEOPLE_</h1>
                    <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">Find · Connect · Curate</p>
                </motion.div>

                {/* Search */}
                <div className="mb-6">
                    <SearchBar value={search} placeholder="Search People..." onChange={setSearch} />
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-4">
                    {FILTERS.map((tab, i) => <TabButtonAccent key={i} label={tab} count={filteredList.length} isActive={tab === activeTab} onClick={() => handleFilter(tab)} />)}
                </div>

                {/* Status bar */}
                <div className="rounded-xl py-2.5 mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                        {activeTab} · {filteredList.length} results
                    </span>
                    <div className="flex gap-2">
                        {[0, 1, 2].map((num) => {
                            const activeDot = num === FILTERS.indexOf(activeTab)
                            return <div key={num}
                                className={`w-2 h-2 rounded-full ${activeDot ? "bg-orange-500" : "bg-zinc-200"}`}
                                style={{
                                    boxShadow: activeDot
                                        ? "3px 3px 6px rgba(255,100,0,0.4), -2px -2px 4px rgba(255,150,50,0.3)"
                                        : "inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.7)",
                                }}
                            />
                        })}
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredList.map(person => (
                            <UserCard key={person.id} name={person.name} handle={person.handle} avatar={person.avatar} bio={person.bio} mode={activeTab}
                                onClickPrimary={() => { }} onClickSecondary={() => { }} />
                        ))}
                    </AnimatePresence>

                    {/* No Results Message */}
                    {filteredList.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="p-10 text-center">
                            <p className="text-zinc-500 font-mono text-sm">NO_RESULTS_</p>
                            <p className="text-zinc-400 text-xs mt-1">Try a different filter or tab</p>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Connections