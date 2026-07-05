import { useState, useRef } from "react"
import Toast from "../components/Toast"
import { AnimatePresence } from "motion/react"

const useToast = () => {

    const [toasts, setToasts] = useState([])
    const timer = useRef()

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const triggerToast = (toastProps, duration = 1000) => {
        const id = crypto.randomUUID() // Create id for toast
        setToasts(prev => [...prev, { ...toastProps, id }]) // Add to toasts array, newest first
        setTimeout(() => { removeToast(id) }, duration)
    }

    const ToastComponent = (<div className="fixed bottom-6 right-6 z-60 flex flex-col-reverse gap-3">
        <AnimatePresence>
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </AnimatePresence>
    </div>)
    return { ToastComponent, triggerToast }

}

export default useToast