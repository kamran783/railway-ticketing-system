"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { getStationSuggestions } from "@/lib/mock-data"
import type { Station } from "@/lib/types"

interface StationSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function StationSearch({ value, onChange, placeholder }: StationSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Station[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 0) {
      const results = getStationSuggestions(query)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setSuggestions(getStationSuggestions(""))
      setShowSuggestions(false)
    }
  }, [query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setSelectedStation(null)
    onChange("")
  }

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station)
    setQuery(`${station.name} (${station.code})`)
    onChange(station.code)
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="w-full"
      />

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((station) => (
              <div
                key={station.code}
                onClick={() => handleStationSelect(station)}
                className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
              >
                <div>
                  <div className="font-medium">{station.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {station.city}, {station.state}
                  </div>
                </div>
                <div className="text-sm font-mono bg-primary/10 text-primary px-2 py-1 rounded">{station.code}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
