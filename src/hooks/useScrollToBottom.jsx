import { useEffect } from "react"

const useScrollToBottom = (messages, isTyping, messagesEndRef, loading) => {
    useEffect(() => {
        if (loading) return
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping, messagesEndRef, loading])
}

export default useScrollToBottom