"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CalendarIcon,
  SearchIcon,
  TrainIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  LogOutIcon,
  InfoIcon,
} from "lucide-react"
import { StationSearch } from "@/components/station-search"
import { AuthModal } from "@/components/auth-modal"
import { AboutModal } from "@/components/about-modal"
import type { SearchQuery } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    from: "",
    to: "",
    date: "",
    class: "SL",
    quota: "General",
  })

  const handleSearch = () => {
    if (!searchQuery.from || !searchQuery.to || !searchQuery.date) {
      return
    }

    // Navigate to search results page with query parameters
    const params = new URLSearchParams({
      from: searchQuery.from,
      to: searchQuery.to,
      date: searchQuery.date,
      class: searchQuery.class,
      quota: searchQuery.quota,
    })

    router.push(`/search-results?${params.toString()}`)
  }

  const swapStations = () => {
    setSearchQuery((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <TrainIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-sans">Indian Railways</h1>
                <p className="text-xs sm:text-sm opacity-90">Real-time Train Booking</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm opacity-90">{user.email}</div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={logout}>
                    <LogOutIcon className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" onClick={() => setShowAuthModal(true)} size="sm">
                  <UserIcon className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Login / Sign Up</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Search Card */}
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Search Trains
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid gap-4 sm:gap-6">
              {/* Station Selection */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <StationSearch
                    value={searchQuery.from}
                    onChange={(value) => setSearchQuery((prev) => ({ ...prev, from: value }))}
                    placeholder="Enter source station"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="flex gap-2">
                    <StationSearch
                      value={searchQuery.to}
                      onChange={(value) => setSearchQuery((prev) => ({ ...prev, to: value }))}
                      placeholder="Enter destination station"
                    />
                    <Button variant="outline" size="icon" onClick={swapStations} className="shrink-0 bg-transparent">
                      ⇄
                    </Button>
                  </div>
                </div>
              </div>

              {/* Date and Class Selection */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Journey Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={searchQuery.date}
                      min={getTomorrowDate()}
                      onChange={(e) => setSearchQuery((prev) => ({ ...prev, date: e.target.value }))}
                      className="pl-10"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <select
                    id="class"
                    value={searchQuery.class}
                    onChange={(e) => setSearchQuery((prev) => ({ ...prev, class: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="SL">Sleeper (SL)</option>
                    <option value="3A">Third AC (3A)</option>
                    <option value="2A">Second AC (2A)</option>
                    <option value="1A">First AC (1A)</option>
                    <option value="CC">Chair Car (CC)</option>
                    <option value="2S">Second Sitting (2S)</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="quota">Quota</Label>
                  <select
                    id="quota"
                    value={searchQuery.quota}
                    onChange={(e) => setSearchQuery((prev) => ({ ...prev, quota: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="General">General</option>
                    <option value="Tatkal">Tatkal</option>
                    <option value="Premium Tatkal">Premium Tatkal</option>
                    <option value="Ladies">Ladies</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.from || !searchQuery.to || !searchQuery.date}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                size="lg"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search Trains
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          <Link href="/bookings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <TrainIcon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold text-sm sm:text-base">PNR Status</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Check your booking status</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/live-status">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <ClockIcon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-secondary" />
                <h3 className="font-semibold text-sm sm:text-base">Live Status</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Track train in real-time</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/bookings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <MapPinIcon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-accent" />
                <h3 className="font-semibold text-sm sm:text-base">My Bookings</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">View booking history</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8">
          <Button
            onClick={() => setShowAboutModal(true)}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-primary/20"
          >
            <InfoIcon className="h-4 w-4 mr-2" />
            About Me
          </Button>
        </div>
      </main>

      <footer className="bg-card border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Mohd Kamran Ahmed. All rights reserved.
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </div>
  )
}
