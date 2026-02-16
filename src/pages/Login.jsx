import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/userSlice"
import { motion, AnimatePresence } from "motion/react"
import ModeSwitch from "../components/ModeSwitch"
import LoginInputBox from "../components/LoginInputBox"
import SubmitButton from "../components/SubmitButton"
import { LOGIN_URL, SIGNUP_URL } from "../utils/ApiRoutes"
import { validateEmail, validatePass } from "../utils/validate"

const Login = () => {
    const dispatch = useDispatch()
    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errorMsg, setError] = useState(null)
    const [index, setIndex] = useState(2)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async () => {

        // Email validation
        if (!validateEmail(email.trim())) {
            setError("Invalid Email!")
            return
        }

        // Password validation
        if (!validatePass(password)) {
            setError("Your password must be 8-60 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.")
            return
        }

        // Signup-only validation
        if (isSignup) {
            if (!firstName.trim()) {
                setError("Firstname required!");
                return;
            }

            if (!lastName.trim()) {
                setError("Lastname required!");
                return;
            }
        }

        setError(null)
        setIsProcessing(true)

        try {
            // Authentication
            const URL = isSignup ? SIGNUP_URL : LOGIN_URL
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                credentials: "include",
                body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password }),
            }) // API will ignore name if its login route

            const data = await res.json()

            if (!res.ok) {
                const message = data?.message?.toLowerCase()
                if (message.includes("duplicate key error")) {
                    setError("User already exists!");
                } else {
                    setError(data?.message || "Something went wrong")
                }
                setIsProcessing(false)
                return
            }

            // Success
            dispatch(addUser(data?.data))
        } catch (err) {
            setIsProcessing(false)
            setError("Something went wrong!")
        }
    }

    useEffect(() => {
        if (!isProcessing) return;

        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % 3); // rotates 0 → 1 → 2 → 0
        }, 500);

        return () => clearInterval(interval); // cleanup
    }, [isProcessing]);

    return (
        <div className="min-h-screen bg-zinc-200 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">

                {/* Header */}
                <div className="mb-12 text-center">
                    {/* Clock */}
                    <motion.div className="inline-block mb-8 relative" animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <div className="w-16 h-16 bg-zinc-200 rounded-full relative flex items-center justify-center"
                            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.2), -8px -8px 16px rgba(255,255,255,0.8)" }}>
                            <div className="w-12 h-12 bg-zinc-200 rounded-full"
                                style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.7)" }}>
                                <div className="absolute top-3 left-1/2 w-0.5 h-4 bg-orange-500 origin-bottom" />
                            </div>
                        </div>
                    </motion.div>
                    <h1 className="text-2xl font-mono tracking-widest text-zinc-900 mb-2">AUTHENTICATE</h1>
                    <p className="text-xs font-mono text-zinc-500 tracking-wider">SYSTEM ACCESS CONTROL</p>
                </div>

                {/* Mode Switch */}
                <div className="flex justify-center mb-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-mono text-zinc-400 tracking-wider">{isSignup ? "NEW USER" : "EXISTING USER"}</div>
                        <ModeSwitch isOn={isSignup} onToggle={() => {
                            setError(null)
                            setIsSignup(!isSignup)
                        }} />
                    </div>
                </div>


                {/* Form Container */}
                <motion.div className="bg-zinc-200 p-8 relative rounded-3xl"
                    style={{ boxShadow: "12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.8)" }}>

                    {/* Corner Details - Neumorphic dots */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                        style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                    <div className="absolute top-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                        style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                        style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                        style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />

                    <AnimatePresence mode="wait">
                        {isSignup && (
                            <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                                className="m-0">
                                <LoginInputBox label="Firstname" type="text" value={firstName} onChange={setFirstName} placeholder="Enter your firstname" />
                                <LoginInputBox label="Lastname" type="text" value={lastName} onChange={setLastName} placeholder="Enter your lastname" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <LoginInputBox label="Email" type="email" value={email} onChange={setEmail} placeholder="user@domain.com" />
                    <LoginInputBox label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

                    {errorMsg && <p className="pr-2 text-right text-xs font-mono tracking-widest text-red-500 uppercase">{errorMsg}</p>}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <SubmitButton onClick={handleSubmit} variant="primary">{isSignup ? "CREATE ACCOUNT" : "LOG IN"}</SubmitButton>
                    </div>


                    {/* Corner Details - dots */}
                    <div className="flex flex-row-reverse justify-between items-center px-4 mt-6">
                        <div className="flex gap-2">
                            {[0, 1, 2].map((num) => {
                                const activeDot = num === index
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
                </motion.div>


                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-3 text-xs font-mono text-zinc-500 px-4 py-2 bg-zinc-200 rounded-xl"
                        style={{ boxShadow: "4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                            style={{ boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                        <span>SECURE CONNECTION</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login