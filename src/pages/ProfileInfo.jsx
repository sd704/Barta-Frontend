import { motion, AnimatePresence } from "motion/react"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SquarePen, X, Check, User, Camera } from "lucide-react"
import InputBox from "../components/InputBox"
import InputTextArea from "../components/InputTextArea"
import InputSelect from "../components/InputSelect"
import SubmitButton from "../components/SubmitButton"
import { UPDATE_USER_URL } from "../utils/ApiRoutes"
import { updateUser } from "../redux/userSlice"
import imageCompression from "browser-image-compression"

const userOptions = ["firstName", "lastName", "about", "description", "age", "gender", "pfp"]

// With useWebWorker: true, Compression runs in background thread, it prevents UI freezing.
const imageOptions = { initialQuality: 0.6, maxWidthOrHeight: 320, useWebWorker: true }

const selectOptions = { "male": "Male", "female": "Female", "other": "Non-binary", "null": "Prefer not to say" }

const ProfileInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const [isAllowEdit, setIsAllowEdit] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const fileInputRef = useRef(null)

    const [fname, setFName] = useState(user?.firstName)
    const [lname, setLName] = useState(user?.lastName)
    const [about, setAbout] = useState(user?.about)
    const [desc, setDesc] = useState(user?.description)
    const [age, setAge] = useState(user?.age)
    const [gender, setGender] = useState(user?.gender)
    const [pfp, setPfp] = useState(user?.pfp)
    const email = user?.email

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]

        if (file) {
            const compressedFile = await imageCompression(file, imageOptions)

            // FileReader is a browser API that reads files from the user's computer
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64String = reader.result
                setPfp(base64String)
            }

            // Base64 encoded image -> of compressed file
            // readAsDataURL -> the result will be something like: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
            reader.readAsDataURL(compressedFile)
        }
    }

    const handleRefresh = () => {
        setFName(user?.firstName)
        setLName(user?.lastName)
        setAbout(user?.about)
        setDesc(user?.description)
        setAge(user?.age)
        setGender(user?.gender)
        setPfp(user?.pfp)
        setIsEditing(false)
    }

    // every() checks if all elements satisfy a condition. If any condition fails → it returns false immediately.
    const compareData = (a, b) => userOptions.every(i => a[i] === b[i])

    const handleSave = async () => {
        const updatedUserData = {
            firstName: fname,
            lastName: lname,
            about,
            description: desc,
            pfp,
            age,
            gender: (gender === "null" ? null : gender)
        }

        // If user made no changes and clicked save
        if (compareData(user, updatedUserData)) {
            setIsEditing(false)
            return
        }

        const res = await fetch(UPDATE_USER_URL, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify(updatedUserData),
        })

        if (!res.ok) {
            console.log("Something went wrong!")
        } else {
            // console.log("Data Saved")
            const updatedFields = (await res.json())?.updatedFields
            // console.log(updatedFields)
            if (updatedFields) {
                dispatch(updateUser(updatedFields))
            }
            setIsEditing(false)
        }
    }

    return (
        <div className="size-full flex items-center justify-center p-4">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-xl">

                <motion.div className="bg-zinc-200 px-8 py-10 relative rounded-3xl"
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

                    <div className="mb-8 flex flex-col items-center relative">

                        {/* Avatar */}
                        <div className={`overflow-hidden flex h-32 w-32 items-center justify-center rounded-full bg-zinc-300 ${pfp ? "" : "bg-zinc-900 text-zinc-200"}`}
                            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)" }}>
                            {pfp && <img className="w-full h-full object-cover" alt="Profile" src={`${pfp}`} />}
                            {!pfp && <User size={60} />}
                        </div>

                        {/* Name and Email */}
                        {!isEditing && <div className="mt-4 text-xl font-mono tracking-widest">{fname + " " + lname}</div>}
                        {!isEditing && <div className="text-sm text-zinc-500">{email}</div>}

                        {/* Image Upload Button */}
                        {isEditing && <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 right-44 w-10 h-10 rounded-xl flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-zinc-200"
                            style={{ boxShadow: "4px 4px 8px #CDC7C1, -4px -4px 8px #FBFAF9" }}>
                            <Camera size={16} />
                        </motion.button>}
                    </div>

                    {/* Hidden input for file Input, Only accept Images */}
                    {isEditing && <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />}

                    {isEditing && <div className="flex gap-3">
                        <InputBox label="Firstname" type="text" value={fname} accent={true} onChange={setFName} placeholder="Firstname" />
                        <InputBox label="Lastname" type="text" value={lname} accent={true} onChange={setLName} placeholder="Lastname" />
                    </div>}

                    <InputBox readOnly={!isEditing} label="About" type="text" value={about} accent={isEditing} onChange={setAbout} placeholder="A short tagline..." />
                    <InputTextArea readOnly={!isEditing} label="Description" value={desc} accent={isEditing} rows="3" onChange={setDesc} placeholder="Tell us more about yourself..." />

                    {!isEditing && (age || gender) && <InputBox
                        readOnly
                        label={age && gender ? "Age, Gender" : (age ? "Age" : "Gender")}
                        type="text"
                        value={age && gender ? `${age}, ${selectOptions[gender]}` : age || selectOptions[gender]}
                        placeholder=""
                        onChange={() => { }}
                    />}

                    {isEditing && <div className="flex gap-3">
                        <InputBox label="Age" type="number" value={age} accent={true} onChange={setAge} placeholder="Age" />
                        <InputSelect label="Gender" value={gender ? gender : "null"} options={selectOptions} accent={true} onChange={setGender} placeholder="Select..." />
                    </div>}

                    {/* {errorMsg && <p className="pr-2 text-right text-xs font-mono tracking-widest text-red-500 uppercase">{errorMsg}</p>} */}

                    {/* Submit Button */}
                    {isAllowEdit && <div className="pt-4 flex gap-3">
                        {!isEditing && <SubmitButton onClick={() => setIsEditing(true)}><SquarePen size={16} />EDIT</SubmitButton>}
                        {isEditing && <SubmitButton onClick={handleRefresh}><X size={16} />CANCEL</SubmitButton>}
                        {isEditing && <SubmitButton onClick={handleSave} style="bg-orange-600 text-zinc-200 hover:bg-orange-500"><Check size={16} />SAVE</SubmitButton>}
                    </div>}


                    {/* Corner Details - dots */}
                    <div className="flex flex-row-reverse justify-between items-center px-4 mt-6">
                        <div className="flex gap-2">
                            {[0, 1, 2].map((num) => {
                                const activeDot = num === 2
                                return <div key={num}
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
                </motion.div>

            </motion.div>
        </div >
    )
}

export default ProfileInfo

//   user: {
//     _id: '699c638ce1f1f5924fc0840c',
//     firstName: 'Yuto',
//     lastName: 'Tanaka',
//     email: 'yuto.wav@gmail.com',
//     about: 'Sound designer & modular synth enthusiast',
//     description: 'Crafting immersive soundscapes with modular synths. Tokyo-based audio innovator.\nOpen for sound design projects.',
//     age: 28,
//     gender: 'male',
//     pfp: 'https://i.pravatar.cc/150?img=11'
//   },