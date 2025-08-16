"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrainIcon, SearchIcon, ClockIcon, ArrowLeftIcon, RefreshCwIcon, MapPinIcon } from "lucide-react"
import type { LiveTrainStatus } from "@/lib/types"
import { SAMPLE_TRAINS } from "@/lib/mock-data"
import Link from "next/link"

export default function LiveStatusPage() {
  const [trainQuery, setTrainQuery] = useState("")
  const [liveStatus, setLiveStatus] = useState<LiveTrainStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Auto-refresh live status every 30 seconds
  useEffect(() => {
    if (liveStatus) {
      const interval = setInterval(() => {
        updateLiveStatus()
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [liveStatus])

  const updateLiveStatus = () => {
    if (liveStatus) {
      // Simulate real-time updates
      const updatedStatus: LiveTrainStatus = {
        ...liveStatus,
        delay: Math.max(0, liveStatus.delay + Math.floor(Math.random() * 10) - 5), // Random delay change
        lastUpdated: new Date().toISOString(),
        nextStations: liveStatus.nextStations.map((station, index) => ({
          ...station,
          expectedTime: new Date(
            new Date(station.scheduledTime).getTime() + (liveStatus.delay + Math.floor(Math.random() * 10)) * 60000,
          ).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        })),
      }
      setLiveStatus(updatedStatus)
      setLastUpdated(new Date())
    }
  }

  const handleTrainSearch = async () => {
    if (!trainQuery.trim()) {
      setError("Please enter a train number")
      return
    }

    setIsSearching(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Find train in sample data or create mock status
    const train = SAMPLE_TRAINS.find((t) => t.number === trainQuery) || SAMPLE_TRAINS[0]

    const mockStatus: LiveTrainStatus = {
      trainNumber: train.number,
      trainName: train.name,
      currentStation: "Agra Cantt",
      delay: Math.floor(Math.random() * 60), // Random delay 0-60 minutes
      lastUpdated: new Date().toISOString(),
      nextStations: [
        {
          station: "Mathura Junction",
          scheduledTime: "14:25",
          expectedTime: "14:35",
          platform: "2",
        },
        {
          station: "Faridabad",
          scheduledTime: "15:10",
          expectedTime: "15:20",
          platform: "1",
        },
        {
          station: "New Delhi",
          scheduledTime: "16:00",
          expectedTime: "16:10",
          platform: "12",
        },
        {
          station: "Ghaziabad",
          scheduledTime: "16:45",
          expectedTime: "16:55",
          platform: "4",
        },
      ],
    }

    setLiveStatus(mockStatus)
    setIsSearching(false)
    setLastUpdated(new Date())
  }

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDelayColor = (delay: number) => {
    if (delay === 0) return "text-green-600"
    if (delay <= 15) return "text-yellow-600"
    return "text-red-600"
  }

  const getDelayBadge = (delay: number) => {
    if (delay === 0) return <Badge className="bg-green-500">On Time</Badge>
    if (delay <= 15) return <Badge className="bg-yellow-500">Delayed {delay}m</Badge>
    return <Badge className="bg-red-500">Delayed {delay}m</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent border-secondary-foreground/20">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <ClockIcon className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold font-sans">Live Train Status</h1>
              <p className="text-sm opacity-90">Real-time train tracking</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Track Train</TabsTrigger>
            <TabsTrigger value="running">Running Trains</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SearchIcon className="h-5 w-5" />
                  Track Train Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trainNumber">Train Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="trainNumber"
                      placeholder="Enter train number (e.g., 12301)"
                      value={trainQuery}
                      onChange={(e) => {
                        setTrainQuery(e.target.value)
                        setError("")
                      }}
                    />
                    <Button onClick={handleTrainSearch} disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Tracking...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="h-4 w-4 mr-2" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Enter any train number to see live status updates.</p>
                  <p className="mt-1">Try: 12301, 12002, 12951, 12626, or 12840</p>
                </div>
              </CardContent>
            </Card>

            {liveStatus && (
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <TrainIcon className="h-5 w-5" />
                      {liveStatus.trainNumber} - {liveStatus.trainName}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={updateLiveStatus} className="bg-transparent">
                        <RefreshCwIcon className="h-4 w-4 mr-1" />
                        Refresh
                      </Button>
                      {getDelayBadge(liveStatus.delay)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Current Location</div>
                        <div className="font-semibold flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4" />
                          {liveStatus.currentStation}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Running Status</div>
                        <div className={`font-semibold ${getDelayColor(liveStatus.delay)}`}>
                          {liveStatus.delay === 0 ? "Running on time" : `Delayed by ${liveStatus.delay} minutes`}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                        <div className="font-semibold">
                          {lastUpdated.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">Auto-refreshes every 30 seconds</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-3">Upcoming Stations</div>
                    <div className="space-y-3">
                      {liveStatus.nextStations.map((station, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                          <div>
                            <div className="font-semibold">{station.station}</div>
                            {station.platform && (
                              <div className="text-sm text-muted-foreground">Platform {station.platform}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Scheduled: {station.scheduledTime}</div>
                            <div className={`font-semibold ${getDelayColor(liveStatus.delay)}`}>
                              Expected: {station.expectedTime}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <div className="font-semibold text-blue-800 mb-1">Live Updates:</div>
                    <div className="text-blue-700">
                      This page automatically refreshes every 30 seconds to show the latest train position and timing
                      updates.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="running" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Currently Running Trains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SAMPLE_TRAINS.slice(0, 3).map((train, index) => {
                    const delay = [0, 15, 45][index] // Mock delays
                    return (
                      <div key={train.number} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">
                            {train.number} - {train.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {train.source.name} → {train.destination.name}
                          </div>
                        </div>
                        <div className="text-right">
                          {getDelayBadge(delay)}
                          <div className="text-sm text-muted-foreground mt-1">Departure: {train.departureTime}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
