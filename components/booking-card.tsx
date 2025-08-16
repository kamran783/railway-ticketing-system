"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrainIcon, CalendarIcon, UsersIcon, DownloadIcon, XIcon } from "lucide-react"
import type { Booking } from "@/lib/types"

interface BookingCardProps {
  booking: Booking
  onCancel: (pnr: string) => void
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500"
      case "RAC":
        return "bg-yellow-500"
      case "Waiting List":
        return "bg-orange-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const canCancel = booking.status !== "Cancelled" && new Date(booking.journeyDate) > new Date()

  const handleDownload = () => {
    // Mock download functionality
    const ticketData = `
INDIAN RAILWAYS E-TICKET
========================

PNR: ${booking.pnr}
Train: ${booking.trainNumber} - ${booking.trainName}
From: ${booking.from.name} (${booking.from.code})
To: ${booking.to.name} (${booking.to.code})
Journey Date: ${formatDate(booking.journeyDate)}
Class: ${booking.class}
Status: ${booking.status}

Passengers:
${booking.passengers.map((p, i) => `${i + 1}. ${p.name} (${p.age}/${p.gender})`).join("\n")}

Total Fare: ₹${booking.fare.toLocaleString()}
Booking Date: ${formatDate(booking.bookingDate)}

This is a computer generated ticket.
    `

    const blob = new Blob([ticketData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${booking.pnr}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrainIcon className="h-5 w-5" />
            {booking.trainName}
          </CardTitle>
          <Badge variant="outline" className="font-mono">
            PNR: {booking.pnr}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrainIcon className="h-4 w-4" />
              Train Details
            </div>
            <div className="font-semibold">{booking.trainNumber}</div>
            <div className="text-sm">
              {booking.from.name} → {booking.to.name}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              Journey Date
            </div>
            <div className="font-semibold">{formatDate(booking.journeyDate)}</div>
            <div className="text-sm">Class: {booking.class}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="h-4 w-4" />
              Status & Fare
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(booking.status)}`} />
              <span className="font-semibold">{booking.status}</span>
            </div>
            <div className="text-sm font-bold text-primary">₹{booking.fare.toLocaleString()}</div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {booking.passengers.length} passenger{booking.passengers.length !== 1 ? "s" : ""} • Booked on{" "}
            {formatDate(booking.bookingDate)}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
              View Details
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <DownloadIcon className="h-4 w-4 mr-1" />
              Download
            </Button>
            {canCancel && (
              <Button variant="outline" size="sm" onClick={() => setShowCancelDialog(true)} className="text-red-600">
                <XIcon className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Journey Information</h4>
                <div className="text-sm space-y-1">
                  <div>PNR: {booking.pnr}</div>
                  <div>
                    Train: {booking.trainNumber} - {booking.trainName}
                  </div>
                  <div>
                    Route: {booking.from.name} → {booking.to.name}
                  </div>
                  <div>Date: {formatDate(booking.journeyDate)}</div>
                  <div>Class: {booking.class}</div>
                  <div>Status: {booking.status}</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold">Passengers</h4>
                <div className="space-y-2">
                  {booking.passengers.map((passenger, index) => (
                    <div key={index} className="text-sm flex justify-between">
                      <span>
                        {index + 1}. {passenger.name}
                      </span>
                      <span>
                        {passenger.age}/{passenger.gender}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total Fare:</span>
                <span>₹{booking.fare.toLocaleString()}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cancel Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <div className="font-semibold">PNR: {booking.pnr}</div>
                <div>
                  {booking.trainNumber} - {booking.trainName}
                </div>
                <div>Journey Date: {formatDate(booking.journeyDate)}</div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  Keep Booking
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCancel(booking.pnr)
                    setShowCancelDialog(false)
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
