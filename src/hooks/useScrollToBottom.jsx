import { useEffect } from "react"

const useScrollToBottom = (messages, isTyping, scrollToBottom, loading) => {
    useEffect(() => {
        if (loading) return
        scrollToBottom()
    }, [messages, isTyping, scrollToBottom, loading])
}

export default useScrollToBottom