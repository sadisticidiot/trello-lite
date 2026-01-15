import { useState, useEffect } from "react"
import { Mars, Venus } from "lucide-react"
import clsx from "clsx"
import { motion } from "motion/react"

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
]

export default function CreateAccount() {
  const currentYear = new Date().getFullYear()
  const MIN_YEAR = currentYear - 120
  const MAX_YEAR = currentYear

  const [day, setDay] = useState(1)
  const [month, setMonth] = useState("January")
  const [year, setYear] = useState(MAX_YEAR)

  const [gender, setGender] = useState(null)

  const [openDay, setOpenDay] = useState(false)
  const [openMonth, setOpenMonth] = useState(false)
  const [openYear, setOpenYear] = useState(false)
  const [isActive, setIsActive] = useState(null)

  const monthIndex = MONTHS.indexOf(month)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const years = Array.from(
    { length: MAX_YEAR - MIN_YEAR + 1 },
    (_, i) => MAX_YEAR - i
  )

  useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth)
    }
  }, [month, year])

  return (
    <div className="flex flex-col gap-4">

      <input placeholder="Display Name" />


      <div className="flex gap-2">

        <Dropdown
          value={month}
          open={openMonth}
          onOpen={() => {
            setOpenMonth(o => !o)
            setOpenDay(false)
            setOpenYear(false)
          }}
        >
          {MONTHS.map(m => (
            <Option key={m} onClick={() => setMonth(m)}>
              {m}
            </Option>
          ))}
        </Dropdown>

        <Dropdown
          value={day}
          open={openDay}
          onOpen={() => {
            setOpenDay(o => !o)
            setOpenMonth(false)
            setOpenYear(false)
          }}
        >
          {days.map(d => (
            <Option key={d} onClick={() => setDay(d)}>
              {d}
            </Option>
          ))}
        </Dropdown>

        <Dropdown
          value={year}
          open={openYear}
          onOpen={() => {
            setOpenYear(o => !o)
            setOpenDay(false)
            setOpenMonth(false)
          }}
        >
          {years.map(y => (
            <Option key={y} onClick={() => setYear(y)}>
              {y}
            </Option>
          ))}
        </Dropdown>

      </div>

      <div className="flex justify-center items-center">
        <motion.button 
            onClick={() => setIsActive("male")} 
            className={clsx(
                "rounded-[0px]", 
                "flex items-center justify-center",
                isActive === "male" && "text-sky-400 border-0",
                isActive !== "male" && "text-white border-1"
            )}
            animate={{
                backgroundColor: isActive === "male" ? "#171717" : "#00000000"
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
        >
            <Mars size={20}/>
        </motion.button>
        <motion.button 
            onClick={() => setIsActive("female")} 
            className={clsx(
                "rounded-[0px]", 
                "flex items-center justify-center",
                isActive === "female" && "text-rose-400 border-0",
                isActive !== "female" && "text-white border-1"
            )}
            animate={{
                backgroundColor: isActive === "female" ? "#171717" : "#00000000"
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
        >
            <Venus size={20}/>
        </motion.button>
      </div>

      <button>Save Changes</button>

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
        <div className="absolute no-scrollbar top-full mt-1 w-full h-[200px] overflow-y-auto bg-neutral-900 rounded">
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
      className="text-center py-2 md:hover:bg-neutral-800 cursor-pointer"
    >
      {children}
    </div>
  )
}
