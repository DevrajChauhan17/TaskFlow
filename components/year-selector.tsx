"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

interface YearSelectorProps {
  currentYear: number
  onYearChange: (year: number) => void
}

export function YearSelector({ currentYear, onYearChange }: YearSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-1 text-white text-base font-bold leading-tight hover:text-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentYear}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#2b3640] rounded-lg shadow-lg border border-[#3d4d5c] z-10 max-h-48 overflow-y-auto min-w-[100px]">
          {years.map((year) => (
            <button
              key={year}
              className={`block w-full px-4 py-2 text-left hover:bg-[#3d4d5c] transition-colors text-sm ${
                year === currentYear ? "text-blue-400 bg-[#3d4d5c]" : "text-white"
              }`}
              onClick={() => {
                onYearChange(year)
                setIsOpen(false)
              }}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
