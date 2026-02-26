import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "motion/react"
import SearchBar from "../components/SearchBar"
import TabButtonAccent from "../components/TabButtonAccent"
import UserCard from "../components/UserCard"
import useFetchAllConnections from "../hooks/useFetchAllConnections"

const Connections = () => {
    const connectionStore = useSelector(store => store.connection)
    const FILTERS = ["DISCOVER", "RECEIVED", "PENDING", "CONNECTED", "BLOCKED"]
    const [search, setSearch] = useState("")
    const [activeTab, setActiveTab] = useState(0)
    const activeKey = FILTERS[activeTab].toLowerCase()
    let activeList = connectionStore[activeKey] || []
    let filteredList = activeList.filter(person => `${person.firstName} ${person.lastName}`.toLowerCase().includes(search.toLowerCase()))
    const variants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.05 } } }
    useFetchAllConnections()

    return (
        <div className="h-screen p-4 sm:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">PEOPLE_</h1>
                    <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">Find · Connect · Curate</p>
                </motion.div>

                {/* Search */}
                <div className="mb-6">
                    <SearchBar id="search" value={search} placeholder="Search People..." onChange={setSearch} />
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-4">
                    {FILTERS.map((tab, i) => <TabButtonAccent
                        key={tab}
                        label={tab}
                        count={connectionStore[FILTERS[i].toLowerCase()]?.length}
                        isActive={i === activeTab}
                        onClick={() => setActiveTab(i)}
                    />)}
                </div>

                {/* Status bar */}
                <div className="rounded-xl py-2.5 mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                        {FILTERS[activeTab]} · {activeList.length} results
                    </span>
                    <div className="flex gap-2">
                        {FILTERS.map((_, num) => {
                            const activeDot = num === activeTab
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
                <div>
                    <AnimatePresence mode="popLayout">
                        <motion.div key={FILTERS[activeTab]} variants={variants} initial="initial" animate="animate" className="space-y-3">
                            {filteredList.map(person => (
                                <UserCard key={person?._id} id={person?._id} mode={activeTab} userObj={person} />
                            ))}
                        </motion.div>
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