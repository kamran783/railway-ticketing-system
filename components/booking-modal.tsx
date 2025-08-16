"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrainIcon, CheckCircleIcon } from "lucide-react"
import type { Train, Passenger, Booking } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { generatePNR } from "@/lib/mock-data"
import { PaymentMethods } from "./payment-methods"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  train: Train | null
  selectedClass: string
  onBookingComplete: (booking: Booking) => void
}

type BookingStep = "passengers" | "review" | "payment" | "confirmation"

export function BookingModal({ isOpen, onClose, train, selectedClass, onBookingComplete }: BookingModalProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState<BookingStep>("passengers")
  const [passengers, setPassengers] = useState<Passenger[]>([{ name: "", age: 0, gender: "Male" }])
  const [isProcessing, setIsProcessing] = useState(false)
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null)

  if (!train || !user) return null

  const classInfo = train.classes.find((c) => c.code === selectedClass) || train.classes[0]
  const baseFare = classInfo.fare * passengers.length
  const reservationFee = 40
  const serviceTax = Math.round(baseFare * 0.05)
  const totalFare = baseFare + reservationFee + serviceTax

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { name: "", age: 0, gender: "Male" }])
    }
  }

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index))
    }
  }

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    const updated = passengers.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    setPassengers(updated)
  }

  const isPassengersValid = () => {
    return passengers.every((p) => p.name.trim() && p.age > 0 && p.age <= 120)
  }

  const handlePayment = async (paymentData: any) => {
    setIsProcessing(true)

    // Simulate payment processing with different delays based on method
    const processingTime = paymentData.method === "upi" ? 3000 : paymentData.method === "card" ? 2000 : 1500
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    const booking: Booking = {
      pnr: generatePNR(),
      trainNumber: train.number,
      trainName: train.name,
      from: train.source,
      to: train.destination,
      journeyDate: new Date().toISOString().split("T")[0], // Mock date
      class: selectedClass,
      passengers: passengers,
      status: classInfo.availableSeats > 0 ? "Confirmed" : "Waiting List",
      fare: totalFare,
      bookingDate: new Date().toISOString(),
    }

    setCompletedBooking(booking)
    setCurrentStep("confirmation")
    setIsProcessing(false)
    onBookingComplete(booking)
  }

  const resetModal = () => {
    setCurrentStep("passengers")
    setPassengers([{ name: "", age: 0, gender: "Male" }])
    setCompletedBooking(null)
    onClose()
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {["passengers", "review", "payment", "confirmation"].map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === step
                ? "bg-primary text-primary-foreground"
                : ["passengers", "review", "payment"].indexOf(currentStep) > index
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {["passengers", "review", "payment"].indexOf(currentStep) > index ? "✓" : index + 1}
          </div>
          {index < 3 && <div className="w-12 h-0.5 bg-muted mx-2" />}
        </div>
      ))}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrainIcon className="h-5 w-5" />
            Book Ticket - {train.name}
          </DialogTitle>
        </DialogHeader>

        {currentStep !== "confirmation" && renderStepIndicator()}

        {/* Train Info Card */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{train.number}</Badge>
                  <Badge variant="outline">{train.type}</Badge>
                </div>
                <h3 className="font-semibold">{train.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {train.source.name} → {train.destination.name}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">{classInfo.name}</div>
                <div className="text-lg font-bold text-primary">₹{classInfo.fare.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per passenger</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Details Step */}
        {currentStep === "passengers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Passenger Details</h3>
              <Button variant="outline" onClick={addPassenger} disabled={passengers.length >= 6}>
                Add Passenger
              </Button>
            </div>

            {passengers.map((passenger, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Passenger {index + 1}</span>
                    {passengers.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removePassenger(index)}>
                        Remove
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, "name", e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Age</Label>
                      <Input
                        type="number"
                        min="1"
                        max="120"
                        value={passenger.age || ""}
                        onChange={(e) => updatePassenger(index, "age", Number.parseInt(e.target.value) || 0)}
                        placeholder="Age"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <select
                      value={passenger.gender}
                      onChange={(e) => updatePassenger(index, "gender", e.target.value as any)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep("review")}
                disabled={!isPassengersValid()}
                className="bg-primary hover:bg-primary/90"
              >
                Continue to Review
              </Button>
            </div>
          </div>
        )}

        {/* Review Step */}
        {currentStep === "review" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Booking</h3>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Journey Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Train:</span>
                  <span>
                    {train.number} - {train.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span>
                    {train.source.name} → {train.destination.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span>
                    {classInfo.name} ({classInfo.code})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span>{passengers.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fare Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    Base Fare ({passengers.length} × ₹{classInfo.fare.toLocaleString()}):
                  </span>
                  <span>₹{baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reservation Fee:</span>
                  <span>₹{reservationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Tax:</span>
                  <span>₹{serviceTax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{totalFare.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep("passengers")}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep("payment")} className="bg-primary hover:bg-primary/90">
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment</h3>

            <PaymentMethods totalAmount={totalFare} onPaymentSubmit={handlePayment} isProcessing={isProcessing} />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep("review")} disabled={isProcessing}>
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {currentStep === "confirmation" && completedBooking && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
            </div>

            <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-primary">PNR: {completedBooking.pnr}</div>
                  <div className="text-lg">
                    Status:{" "}
                    <Badge variant={completedBooking.status === "Confirmed" ? "default" : "secondary"}>
                      {completedBooking.status}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span>Train:</span>
                      <span>
                        {completedBooking.trainNumber} - {completedBooking.trainName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span>
                        {completedBooking.from.name} → {completedBooking.to.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers:</span>
                      <span>{completedBooking.passengers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Fare:</span>
                      <span>₹{completedBooking.fare.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              A confirmation SMS and email has been sent to your registered mobile number and email address.
            </div>

            <Button onClick={resetModal} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
