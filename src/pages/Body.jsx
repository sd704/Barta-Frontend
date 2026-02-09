import Chat from "./Chat"
import Login from "./Login"
import Messages from "./Messages"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

const Body = () => {
  return (
    <>
      {/* <Login /> */}
      {/* <Messages /> */}
      <Chat />
    </>
  )
}

export default Body