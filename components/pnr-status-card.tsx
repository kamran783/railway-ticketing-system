"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircleIcon } from "lucide-react"
import type { PNRStatus } from "@/lib/types"

interface PNRStatusCardProps {
  pnrStatus: PNRStatus
}

export function PNRStatusCard({ pnrStatus }: PNRStatusCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    if (status.includes("CNF")) return "text-green-600"
    if (status.includes("RAC")) return "text-yellow-600"
    if (status.includes("WL")) return "text-orange-600"
    return "text-gray-600"
  }

  return (
    <Card className="border-green-200 bg-green-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <CheckCircleIcon className="h-5 w-5" />
          PNR Status Found
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">PNR Number</div>
              <div className="font-mono text-lg font-bold">{pnrStatus.pnr}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Train Details</div>
              <div className="font-semibold">
                {pnrStatus.trainNumber} - {pnrStatus.trainName}
              </div>
              <div className="text-sm">
                {pnrStatus.from.name} → {pnrStatus.to.name}
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Journey Date</div>
              <div className="font-semibold">{formatDate(pnrStatus.journeyDate)}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Class</div>
              <Badge variant="outline">{pnrStatus.class}</Badge>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Chart Status</div>
              <Badge variant={pnrStatus.chartStatus === "Prepared" ? "default" : "secondary"}>
                {pnrStatus.chartStatus}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="text-sm text-muted-foreground mb-3">Passenger Details</div>
          <div className="space-y-3">
            {pnrStatus.passengers.map((passenger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <div className="font-semibold">{passenger.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {passenger.age} years, {passenger.gender}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getStatusColor(passenger.currentStatus)}`}>
                    {passenger.currentStatus}
                  </div>
                  {passenger.seatNumber && passenger.coachNumber && (
                    <div className="text-sm text-muted-foreground">
                      Coach {passenger.coachNumber}, Seat {passenger.seatNumber}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-sm">
          <div className="font-semibold text-blue-800 mb-1">Status Legend:</div>
          <div className="text-blue-700 space-y-1">
            <div>• CNF - Confirmed</div>
            <div>• RAC - Reservation Against Cancellation</div>
            <div>• WL - Waiting List</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
