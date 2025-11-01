"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import React from "react"

export default function StudentRegistrationPage() {
    const [date, setDate] = React.useState<Date>()

  return (
    <div style={{ backgroundColor: '#e8effe' }} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Student Registration Form
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Please fill out the form below to register.
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <Label htmlFor="candidateName">Candidate Name *</Label>
                    <Input id="candidateName" placeholder="Candidate Name *" className="bg-blue-50/50" />
                  </div>
                  <div>
                    <Label htmlFor="parentName">Parent's / Guardian's Name *</Label>
                    <Input id="parentName" placeholder="Parent's / Guardian's Name *" className="bg-blue-50/50" />
                  </div>
                   <div>
                    <Label htmlFor="standard">Standard *</Label>
                    <Input id="standard" placeholder="Standard *" className="bg-blue-50/50" />
                  </div>
                  <div>
                    <Label htmlFor="motherOccupation">Mother's Occupation *</Label>
                    <Input id="motherOccupation" placeholder="Mother's Occupation *" className="bg-blue-50/50" />
                  </div>
                  <div>
                    <Label htmlFor="institutionName">Name of the Institution *</Label>
                    <Input id="institutionName" placeholder="Name of the Institution *" className="bg-blue-50/50" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <div>
                        <Label htmlFor="photo">Upload your photo</Label>
                        <Input id="photo" type="file" className="bg-blue-50/50" />
                    </div>
                  <div>
                    <Label htmlFor="fatherOccupation">Father's Occupation *</Label>
                    <Input id="fatherOccupation" placeholder="Father's Occupation *" className="bg-blue-50/50" />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal bg-blue-50/50",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Date of Birth *</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

                <div>
                    <Label>Gender *</Label>
                    <RadioGroup defaultValue="male" className="flex items-center gap-8 mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                        </div>
                    </RadioGroup>
                </div>
              
              <div>
                <Label htmlFor="residentialAddress">Residential Address *</Label>
                <Textarea id="residentialAddress" placeholder="Residential Address *" className="bg-blue-50/50 h-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <Label htmlFor="fatherContact">Father's Contact Number *</Label>
                  <Input id="fatherContact" placeholder="Father's Contact Number *" className="bg-blue-50/50" />
                </div>
                <div>
                  <Label htmlFor="motherContact">Mother's Contact Number *</Label>
                  <Input id="motherContact" placeholder="Mother's Contact Number *" className="bg-blue-50/50" />
                </div>
                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                  <Input id="whatsappNumber" placeholder="WhatsApp Number *" className="bg-blue-50/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label>Board of Education *</Label>
                  <RadioGroup defaultValue="cbse" className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cbse" id="cbse" />
                      <Label htmlFor="cbse">CBSE</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="samacheer" id="samacheer" />
                      <Label htmlFor="samacheer">Samacheer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other-board" id="other-board" />
                      <Label htmlFor="other-board">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Subjects *</Label>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tamil" />
                      <Label htmlFor="tamil">Tamil</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="english" />
                      <Label htmlFor="english">English</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="mathematics" />
                      <Label htmlFor="mathematics">Mathematics</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="science" />
                      <Label htmlFor="science">Science</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="social" />
                      <Label htmlFor="social">Social</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="physics" />
                      <Label htmlFor="physics">Physics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="chemistry" />
                      <Label htmlFor="chemistry">Chemistry</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label>How did you hear about us?</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="internet" />
                    <Label htmlFor="internet">Internet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="old-student" />
                    <Label htmlFor="old-student">From an old student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="other-source" />
                    <Label htmlFor="other-source">Other</Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>

              <div className="text-center pt-4">
                <Button type="submit" size="lg" className="bg-[#43b9ea] hover:bg-[#38a8d6] text-white">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
