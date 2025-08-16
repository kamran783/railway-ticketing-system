"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrainIcon, SearchIcon, TicketIcon, ArrowLeftIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import type { Booking, PNRStatus } from "@/lib/types"
import { PNRStatusCard } from "@/components/pnr-status-card"
import { BookingCard } from "@/components/booking-card"
import Link from "next/link"

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [pnrQuery, setPnrQuery] = useState("")
  const [pnrStatus, setPnrStatus] = useState<PNRStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Load bookings from localStorage (in real app, this would be from API)
    const savedBookings = localStorage.getItem("railway_bookings")
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings))
      } catch (error) {
        console.error("Error loading bookings:", error)
      }
    }
  }, [])

  const handlePNRSearch = async () => {
    if (!pnrQuery.trim()) {
      setError("Please enter a PNR number")
      return
    }

    if (pnrQuery.length !== 10) {
      setError("PNR number must be 10 digits")
      return
    }

    setIsSearching(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock PNR status - in real app, this would call API
    const mockStatus: PNRStatus = {
      pnr: pnrQuery,
      trainNumber: "12301",
      trainName: "Rajdhani Express",
      from: { code: "NDLS", name: "New Delhi", city: "Delhi", state: "Delhi" },
      to: { code: "BCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra" },
      journeyDate: "2024-12-25",
      class: "3A",
      passengers: [
        {
          name: "John Doe",
          age: 30,
          gender: "Male",
          currentStatus: "CNF/B1/25",
          seatNumber: "25",
          coachNumber: "B1",
        },
        {
          name: "Jane Doe",
          age: 28,
          gender: "Female",
          currentStatus: "CNF/B1/26",
          seatNumber: "26",
          coachNumber: "B1",
        },
      ],
      chartStatus: "Prepared",
    }

    setPnrStatus(mockStatus)
    setIsSearching(false)
  }

  const handleCancelBooking = (pnr: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.pnr === pnr ? { ...booking, status: "Cancelled" as const } : booking,
    )
    setBookings(updatedBookings)
    localStorage.setItem("railway_bookings", JSON.stringify(updatedBookings))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <TrainIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-4">Please login to view your bookings</p>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="secondary" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <TrainIcon className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold font-sans">My Bookings</h1>
              <p className="text-sm opacity-90">Manage your train tickets</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="pnr">PNR Status</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <Badge variant="outline">
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <TicketIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
                  <Link href="/">
                    <Button>Book Your First Ticket</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings
                  .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
                  .map((booking) => (
                    <BookingCard key={booking.pnr} booking={booking} onCancel={handleCancelBooking} />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pnr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SearchIcon className="h-5 w-5" />
                  Check PNR Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pnr">PNR Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="pnr"
                      placeholder="Enter 10-digit PNR number"
                      value={pnrQuery}
                      onChange={(e) => {
                        setPnrQuery(e.target.value.replace(/\D/g, "").slice(0, 10))
                        setError("")
                      }}
                      maxLength={10}
                    />
                    <Button onClick={handlePNRSearch} disabled={isSearching || pnrQuery.length !== 10}>
                      {isSearching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="h-4 w-4 mr-2" />
                          Check
                        </>
                      )}
                    </Button>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Enter your 10-digit PNR number to check the current status of your booking.</p>
                  <p className="mt-1">Demo PNR: Try any 10-digit number (e.g., 1234567890)</p>
                </div>
              </CardContent>
            </Card>

            {pnrStatus && <PNRStatusCard pnrStatus={pnrStatus} />}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
