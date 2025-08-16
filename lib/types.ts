export interface Station {
  code: string
  name: string
  city: string
  state: string
}

export interface Train {
  number: string
  name: string
  type: "Express" | "Superfast" | "Passenger" | "Rajdhani" | "Shatabdi" | "Duronto" | "Garib Rath"
  source: Station
  destination: Station
  departureTime: string
  arrivalTime: string
  duration: string
  runsOn: string[] // Days of week
  classes: TrainClass[]
}

export interface TrainClass {
  code: "SL" | "3A" | "2A" | "1A" | "CC" | "EC" | "2S" | "FC"
  name: string
  totalSeats: number
  availableSeats: number
  waitingList: number
  fare: number
}

export interface SearchQuery {
  from: string
  to: string
  date: string
  class?: string
  quota?: "General" | "Tatkal" | "Premium Tatkal" | "Ladies" | "Senior Citizen"
}

export interface Passenger {
  name: string
  age: number
  gender: "Male" | "Female" | "Transgender"
  berth?: "Lower" | "Middle" | "Upper" | "Side Lower" | "Side Upper"
}

export interface Booking {
  pnr: string
  trainNumber: string
  trainName: string
  from: Station
  to: Station
  journeyDate: string
  class: string
  passengers: Passenger[]
  status: "Confirmed" | "RAC" | "Waiting List" | "Cancelled"
  fare: number
  bookingDate: string
}

export interface PNRStatus {
  pnr: string
  trainNumber: string
  trainName: string
  from: Station
  to: Station
  journeyDate: string
  class: string
  passengers: (Passenger & {
    currentStatus: string
    seatNumber?: string
    coachNumber?: string
  })[]
  chartStatus: "Not Prepared" | "Prepared"
}

export interface LiveTrainStatus {
  trainNumber: string
  trainName: string
  currentStation?: string
  delay: number // in minutes
  lastUpdated: string
  nextStations: {
    station: string
    scheduledTime: string
    expectedTime: string
    platform?: string
  }[]
}
