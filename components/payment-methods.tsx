"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCardIcon, SmartphoneIcon, BuildingIcon, WalletIcon } from "lucide-react"

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet"

interface PaymentMethodsProps {
  totalAmount: number
  onPaymentSubmit: (paymentData: any) => void
  isProcessing: boolean
}

export function PaymentMethods({ totalAmount, onPaymentSubmit, isProcessing }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card")
  const [paymentData, setPaymentData] = useState({
    // Card details
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    // UPI details
    upiId: "",
    // Net banking
    bank: "",
    // Wallet
    walletType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPaymentSubmit({ method: selectedMethod, ...paymentData })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentData((prev) => ({ ...prev, cardNumber: formatted }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary mb-2">₹{totalAmount.toLocaleString()}</div>
        <p className="text-muted-foreground">Total Amount to Pay</p>
      </div>

      <RadioGroup value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}>
        <div className="grid gap-4">
          {/* Credit/Debit Card */}
          <Card
            className={`cursor-pointer transition-colors ${selectedMethod === "card" ? "ring-2 ring-primary" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <CreditCardIcon className="h-5 w-5" />
                <Label htmlFor="card" className="cursor-pointer font-semibold">
                  Credit/Debit Card
                </Label>
              </div>
            </CardHeader>
            {selectedMethod === "card" && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Month</Label>
                    <select
                      id="expiryMonth"
                      value={paymentData.expiryMonth}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryMonth: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Year</Label>
                    <select
                      id="expiryYear"
                      value={paymentData.expiryYear}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryYear: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <option key={year} value={String(year).slice(-2)}>
                            {String(year).slice(-2)}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* UPI */}
          <Card className={`cursor-pointer transition-colors ${selectedMethod === "upi" ? "ring-2 ring-primary" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <SmartphoneIcon className="h-5 w-5" />
                <Label htmlFor="upi" className="cursor-pointer font-semibold">
                  UPI
                </Label>
              </div>
            </CardHeader>
            {selectedMethod === "upi" && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={paymentData.upiId}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, upiId: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["@paytm", "@phonepe", "@googlepay", "@amazonpay"].map((suffix) => (
                    <Button
                      key={suffix}
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => {
                        const baseId = paymentData.upiId.split("@")[0]
                        setPaymentData((prev) => ({ ...prev, upiId: baseId + suffix }))
                      }}
                    >
                      {suffix}
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Net Banking */}
          <Card
            className={`cursor-pointer transition-colors ${selectedMethod === "netbanking" ? "ring-2 ring-primary" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <BuildingIcon className="h-5 w-5" />
                <Label htmlFor="netbanking" className="cursor-pointer font-semibold">
                  Net Banking
                </Label>
              </div>
            </CardHeader>
            {selectedMethod === "netbanking" && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <select
                    id="bank"
                    value={paymentData.bank}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, bank: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="bob">Bank of Baroda</option>
                    <option value="canara">Canara Bank</option>
                    <option value="union">Union Bank of India</option>
                  </select>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Digital Wallets */}
          <Card
            className={`cursor-pointer transition-colors ${selectedMethod === "wallet" ? "ring-2 ring-primary" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wallet" id="wallet" />
                <WalletIcon className="h-5 w-5" />
                <Label htmlFor="wallet" className="cursor-pointer font-semibold">
                  Digital Wallets
                </Label>
              </div>
            </CardHeader>
            {selectedMethod === "wallet" && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="walletType">Select Wallet</Label>
                  <select
                    id="walletType"
                    value={paymentData.walletType}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, walletType: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="">Choose wallet</option>
                    <option value="paytm">Paytm Wallet</option>
                    <option value="phonepe">PhonePe Wallet</option>
                    <option value="googlepay">Google Pay</option>
                    <option value="amazonpay">Amazon Pay</option>
                    <option value="mobikwik">MobiKwik</option>
                    <option value="freecharge">FreeCharge</option>
                  </select>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </RadioGroup>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          🔒 This is a demo booking system. No actual payment will be processed.
        </p>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isProcessing || !isPaymentDataValid()}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ₹${totalAmount.toLocaleString()}`
        )}
      </Button>
    </div>
  )

  function isPaymentDataValid(): boolean {
    switch (selectedMethod) {
      case "card":
        return !!(
          paymentData.cardNumber &&
          paymentData.cardholderName &&
          paymentData.expiryMonth &&
          paymentData.expiryYear &&
          paymentData.cvv
        )
      case "upi":
        return !!paymentData.upiId && paymentData.upiId.includes("@")
      case "netbanking":
        return !!paymentData.bank
      case "wallet":
        return !!paymentData.walletType
      default:
        return false
    }
  }
}
