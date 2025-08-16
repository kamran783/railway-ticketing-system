"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, TrainIcon, SearchIcon, AlertCircleIcon } from "lucide-react"
import { TrainResults } from "@/components/train-results"
import type { SearchQuery, Train, Booking } from "@/lib/types"
import { searchTrains } from "@/lib/mock-data"
import Link from "next/link"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()

  const searchQuery: SearchQuery = useMemo(
    () => ({
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      date: searchParams.get("date") || "",
      class: searchParams.get("class") || "SL",
      quota: (searchParams.get("quota") || "General") as any,
    }),
    [searchParams],
  )

  const searchResults: Train[] = useMemo(() => {
    if (!searchQuery.from || !searchQuery.to || !searchQuery.date) {
      return []
    }
    return searchTrains(searchQuery.from, searchQuery.to, searchQuery.date)
  }, [searchQuery.from, searchQuery.to, searchQuery.date])

  if (!searchQuery.from || !searchQuery.to || !searchQuery.date) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircleIcon className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Missing Search Parameters</h2>
            <p className="text-muted-foreground mb-4">Please provide valid search parameters to view train results.</p>
            <Link href="/">
              <Button>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleBookingComplete = (booking: Booking) => {
    const existingBookings = JSON.parse(localStorage.getItem("railway_bookings") || "[]")
    const updatedBookings = [...existingBookings, booking]
    localStorage.setItem("railway_bookings", JSON.stringify(updatedBookings))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="secondary" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <TrainIcon className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold font-sans">Search Results</h1>
                <p className="text-sm opacity-90">
                  {searchQuery.from} → {searchQuery.to} | {searchQuery.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SearchIcon className="h-5 w-5" />
              Search Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold text-muted-foreground">From:</span>
                <div className="font-medium">{searchQuery.from}</div>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">To:</span>
                <div className="font-medium">{searchQuery.to}</div>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Date:</span>
                <div className="font-medium">{searchQuery.date}</div>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Class:</span>
                <div className="font-medium">
                  {searchQuery.class} | {searchQuery.quota}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <TrainResults
          results={searchResults}
          searchQuery={searchQuery}
          isLoading={false}
          onBookingComplete={handleBookingComplete}
        />
      </main>
    </div>
  )
}
