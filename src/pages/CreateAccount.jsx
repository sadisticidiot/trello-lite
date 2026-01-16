import { useState, useEffect } from "react"
import { Mars, Venus } from "lucide-react"
import clsx from "clsx"
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
]

export default function CreateAccount() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const user = session?.user

  const currentYear = new Date().getFullYear()
  const MIN_YEAR = currentYear - 120
  const MAX_YEAR = currentYear

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState("January")
  const [year, setYear] = useState(MAX_YEAR)
  const [gender, setGender] = useState(null)
  const [name, setName] = useState("")

  const [error, setError] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)

  const monthIndex = MONTHS.indexOf(month)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const years = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MAX_YEAR - i)

  useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth)
  }, [month, year])

  const birthdayStr = new Date(year, monthIndex, day).toISOString().split("T")[0]

  const handleSave = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from("users").insert({
      user_id: user.id,
      display_name: name,
      birthday: birthdayStr,
      gender
    })

    if (error) {
      setError(
        error.message.includes("violates unique constraint")
          ? "User already exists."
          : "Something went wrong."
      )
    } else {
      console.log("Profile saved successfully!")
      navigate("/app")
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/app")
    }
  }, [session])

  return (
    <div className="flex flex-col gap-4">
      <input
        placeholder="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex gap-2">
        <Dropdown
          value={month}
          open={openDropdown === "month"}
          onOpen={() => setOpenDropdown(openDropdown === "month" ? null : "month")}
        >
          {MONTHS.map(m => (
            <Option
              key={m}
              onClick={() => {
                setMonth(m)
                setOpenDropdown(null)
              }}
            >
              {m}
            </Option>
          ))}
        </Dropdown>

        <Dropdown
          value={day}
          open={openDropdown === "day"}
          onOpen={() => setOpenDropdown(openDropdown === "day" ? null : "day")}
        >
          {days.map(d => (
            <Option
              key={d}
              onClick={() => {
                setDay(d)
                setOpenDropdown(null)
              }}
            >
              {d}
            </Option>
          ))}
        </Dropdown>

        <Dropdown
          value={year}
          open={openDropdown === "year"}
          onOpen={() => setOpenDropdown(openDropdown === "year" ? null : "year")}
        >
          {years.map(y => (
            <Option
              key={y}
              onClick={() => {
                setYear(y)
                setOpenDropdown(null)
              }}
            >
              {y}
            </Option>
          ))}
        </Dropdown>
      </div>

      <div className="flex justify-center items-center gap-2">
        <GenderButton
          value="Male"
          icon={Mars}
          active={gender}
          setActive={setGender}
          color="text-sky-400"
        />
        <GenderButton
          value="Female"
          icon={Venus}
          active={gender}
          setActive={setGender}
          color="text-rose-400"
        />
      </div>

      <button onClick={handleSave}>Save Changes</button>
      {error && (
        <div className="flex gap-1 justify-center items-center">
          <span className="text-red-500">{error}</span>
          <Link to="/login" className="text-blue-400 underline font-light">
            Sign in instead?
          </Link>
        </div>
      )}
    </div>
  )
}

function Dropdown({ value, open, onOpen, children }) {
  return (
    <div className="relative w-1/3">
      <input
        value={value}
        readOnly
        onClick={onOpen}
        className="w-full border border-white/20 text-center cursor-pointer p-2 rounded"
      />
      {open && (
        <div className="absolute top-full mt-1 w-full h-[200px] overflow-y-auto bg-neutral-900 rounded no-scrollbar z-10">
          {children}
        </div>
      )}
    </div>
  )
}

function Option({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="text-center py-2 cursor-pointer hover:bg-neutral-800"
    >
      {children}
    </div>
  )
}

function GenderButton({ value, icon: Icon, active, setActive, color }) {
  return (
    <motion.button
      onClick={() => setActive(value)}
      className={clsx(
        "rounded-[0px] flex items-center justify-center",
        active === value ? `${color} border-0` : "text-white border-1"
      )}
      animate={{ backgroundColor: active === value ? "#171717" : "#00000000" }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <Icon size={20} />
    </motion.button>
  )
}
