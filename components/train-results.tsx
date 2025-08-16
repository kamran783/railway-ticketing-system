"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrainIcon, ClockIcon } from "lucide-react"
import type { Train, SearchQuery, Booking } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { BookingModal } from "./booking-modal"
import { AuthModal } from "./auth-modal"

interface TrainResultsProps {
  results: Train[]
  searchQuery: SearchQuery
  isLoading: boolean
  onBookingComplete?: (booking: Booking) => void
}

export function TrainResults({ results, searchQuery, isLoading, onBookingComplete }: TrainResultsProps) {
  const { user } = useAuth()
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Searching for trains...</p>
        </CardContent>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <TrainIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No trains found</h3>
          <p className="text-muted-foreground">
            No trains available for the selected route and date. Please try different stations or dates.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getClassInfo = (train: Train, classCode: string) => {
    return train.classes.find((c) => c.code === classCode) || train.classes[0]
  }

  const getAvailabilityStatus = (available: number, waiting: number) => {
    if (available > 10) return { text: "Available", color: "bg-green-500" }
    if (available > 0) return { text: `Available ${available}`, color: "bg-yellow-500" }
    if (waiting > 0) return { text: `WL ${waiting}`, color: "bg-red-500" }
    return { text: "Not Available", color: "bg-gray-500" }
  }

  const handleBookNow = (train: Train, classCode: string) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }

    setSelectedTrain(train)
    setSelectedClass(classCode)
    setShowBookingModal(true)
  }

  const handleBookingComplete = (booking: Booking) => {
    onBookingComplete?.(booking)
    setShowBookingModal(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {results.length} train{results.length !== 1 ? "s" : ""} found
        </h2>
        <div className="text-sm text-muted-foreground">
          {searchQuery.date} • {searchQuery.class} Class
        </div>
      </div>

      {results.map((train) => {
        const classInfo = getClassInfo(train, searchQuery.class || "SL")
        const availability = getAvailabilityStatus(classInfo.availableSeats, classInfo.waitingList)

        return (
          <Card key={train.number} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                {/* Train Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono">
                      {train.number}
                    </Badge>
                    <Badge variant="outline">{train.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{train.name}</h3>
                  <div className="text-sm text-muted-foreground">Runs: {train.runsOn.join(", ")}</div>
                </div>

                {/* Timing */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{train.departureTime}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-semibold">{train.arrivalTime}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Duration: {train.duration}</div>
                  <div className="text-xs text-muted-foreground">
                    {train.source.name} → {train.destination.name}
                  </div>
                </div>

                {/* Class & Fare */}
                <div className="space-y-2">
                  <div className="font-semibold">
                    {classInfo.name} ({classInfo.code})
                  </div>
                  <div className="text-lg font-bold text-primary">₹{classInfo.fare.toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${availability.color}`} />
                    <span className="text-sm">{availability.text}</span>
                  </div>
                </div>

                {/* Book Button */}
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full"
                    disabled={classInfo.availableSeats === 0 && classInfo.waitingList === 0}
                    onClick={() => handleBookNow(train, classInfo.code)}
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        train={selectedTrain}
        selectedClass={selectedClass}
        onBookingComplete={handleBookingComplete}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab="login" />
    </div>
  )
}
