import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "motion/react"
import SearchBar from "../components/SearchBar"
import TabButtonAccent from "../components/TabButtonAccent"
import UserCard from "../components/UserCard"
import useFetchAllConnections from "../hooks/useFetchAllConnections"
import LoadingDots from '../components/LoadingDots'
import { CONNECTION_ACTIONS, CONNECTION_TABS } from "../utils/connectionConfig"
import useConnectionActions from "../hooks/useConnectionActions"

// Tabs List
const TABS = Object.keys(CONNECTION_TABS)

// For AnimatePresence
const variants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.05 } } }

const Connections = () => {
    const [loading, setLoading] = useState(true)
    const loggedInUser = useSelector(store => store.user)
    const loggedInUserId = loggedInUser?._id
    const peopleStore = useSelector(store => store.people ?? {})
    const people = Object.values(peopleStore)
    const [search, setSearch] = useState("") // Search String
    const [activeTabIndex, setActiveTabIndex] = useState(0) // Tab Index in Filters array
    const activeTab = TABS[activeTabIndex]

    const allLists = useMemo(() => (
        Object.fromEntries(
            TABS.map(tab => [tab, people.filter(p => CONNECTION_TABS[tab].filter(p, loggedInUserId))])
        )
    ), [people, loggedInUserId])

    const activeList = useMemo(() => (
        [...allLists[activeTab]].sort((a, b) => a.name.localeCompare(b.name))
    ), [allLists, activeTab])

    // Filter for search
    const filteredList = useMemo(() => (
        activeList.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    ), [activeList, search])

    useFetchAllConnections(setLoading, loggedInUserId)

    const connectionActions = useConnectionActions()

    if (loading) return (<LoadingDots />)
    return (
        <div className="h-screen p-4 sm:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">PEOPLE</h1>
                    <p className="text-zinc-500 text-xs font-mono mt-1 uppercase tracking-widest">Find · Connect · Curate</p>
                </motion.div>

                {/* Search */}
                <div className="mb-6">
                    <SearchBar id="search" value={search} placeholder="Search People..." onChange={setSearch} />
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-4">
                    {TABS.map((tab, i) => <TabButtonAccent
                        key={tab}
                        label={CONNECTION_TABS[tab].label}
                        count={allLists[tab].length}
                        isActive={i === activeTabIndex}
                        onClick={() => setActiveTabIndex(i)}
                    />)}
                </div>

                {/* Status bar */}
                <div className="rounded-xl py-2.5 mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                        {CONNECTION_TABS[activeTab].label} · {activeList.length} results
                    </span>
                    <div className="flex gap-2">
                        {TABS.map((_, i) => {
                            const activeDot = (i === activeTabIndex)
                            return <div key={i}
                                className={`w-2 h-2 rounded-full ${activeDot ? "bg-orange-600" : "bg-zinc-200"}`}
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
                        <motion.div key={activeTab} variants={variants} initial="initial" animate="animate" className="space-y-3">
                            {filteredList.map(person => (
                                <UserCard key={person?._id} id={person?._id} activeTab={activeTab} userObj={person} connectionActions={connectionActions} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* No Results Message */}
                    {filteredList.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="p-10 text-center">
                            <p className="text-zinc-500 font-mono text-sm">NO_RESULTS</p>
                            <p className="text-zinc-400 text-xs mt-1">Try a different filter or tab</p>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Connections