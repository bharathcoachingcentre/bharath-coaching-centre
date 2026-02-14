"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, User, Users, Phone, BookOpen, Send, GraduationCap } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    candidateName: z.string().min(1, { message: "Candidate name is required." }),
    parentName: z.string().min(1, { message: "Parent's name is required." }),
    photo: z.any().optional(),
    standard: z.string().min(1, { message: "Standard is required." }),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required." }),
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required." }),
    institutionName: z.string().min(1, { message: "Institution name is required." }),
    dob: z.date({ required_error: "Date of birth is required." }),
    gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
    residentialAddress: z.string().min(1, { message: "Residential address is required." }),
    fatherContact: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(10),
    motherContact: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(10),
    whatsappNumber: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(10),
    board: z.enum(["cbse", "samacheer", "other-board"], { required_error: "Please select a board." }),
    subjects: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one subject.",
    }),
    howHeard: z.array(z.string()).optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions.",
    }),
});

const subjectItems = [
    { id: "tamil", label: "Tamil" },
    { id: "english", label: "English" },
    { id: "mathematics", label: "Mathematics" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
];

const howHeardItems = [
    { id: "internet", label: "Internet" },
    { id: "old-student", label: "From an old student" },
    { id: "other", label: "Other" },
];


export default function StudentRegistrationPage() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            candidateName: "",
            parentName: "",
            photo: undefined,
            standard: "",
            motherOccupation: "",
            fatherOccupation: "",
            institutionName: "",
            dob: undefined,
            gender: "" as "male" | "female" | undefined,
            residentialAddress: "",
            fatherContact: "",
            motherContact: "",
            whatsappNumber: "",
            board: "" as "cbse" | "samacheer" | "other-board" | undefined,
            subjects: [],
            howHeard: [],
            terms: false,
        },
    });

    const photoRef = form.register("photo");

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Registration Submitted!",
            description: "Thank you for registering. We will be in touch shortly.",
        });
        form.reset();
    }

  return (
    <div className="font-body-home2">
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Our-result.jpg"
          alt="Student Registration Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Registration
          </h1>
        </div>
      </section>

      <div style={{ backgroundColor: 'rgb(245 250 255)' }} className="py-16 md:py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#182d45] tracking-tight mb-4">
              Registration Form
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">
              Join the Bharath Academy family. Please provide the accurate details below to complete your application.
            </p>
          </div>

          <Card className="shadow-[0_30px_80px_rgba(8,112,184,0.1)] border border-white bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  {/* Candidate Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-[#35a3be]" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#182d45]">Student Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <FormField
                        control={form.control}
                        name="candidateName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#182d45] font-bold">Candidate Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="standard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#182d45] font-bold">Standard *</FormLabel>
                            <FormControl>
                              <Input placeholder="Grade / Class" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="institutionName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-[#182d45] font-bold">Name of the Institution *</FormLabel>
                            <FormControl>
                                <Input placeholder="Current School / College" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-[#182d45] font-bold mb-2">Date of Birth *</FormLabel>
                             <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "h-12 justify-start text-left font-normal bg-gray-50/50 rounded-xl border-gray-200",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden shadow-xl border-none">
                                    <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem className="space-y-3">
                              <FormLabel className="text-[#182d45] font-bold">Gender *</FormLabel>
                              <FormControl>
                                  <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex items-center gap-10 mt-2"
                                  >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                      <RadioGroupItem value="male" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-600">Male</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                      <RadioGroupItem value="female" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-600">Female</FormLabel>
                                  </FormItem>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormItem>
                          <FormLabel className="text-[#182d45] font-bold">Upload Candidate Photo</FormLabel>
                          <FormControl>
                              <div className="flex items-center gap-4">
                                <Input 
                                    type="file"
                                    {...photoRef}
                                    className="h-12 bg-gray-50/50 rounded-xl border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#35a3be]/10 file:text-[#35a3be] hover:file:bg-[#35a3be]/20 cursor-pointer" 
                                />
                              </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Family Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#182d45]">Family Background</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#182d45] font-bold">Parent's / Guardian's Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="fatherOccupation"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold">Father's Occupation *</FormLabel>
                                <FormControl>
                                <Input placeholder="Occupation" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="motherOccupation"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold">Mother's Occupation *</FormLabel>
                                <FormControl>
                                <Input placeholder="Occupation" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="residentialAddress"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel className="text-[#182d45] font-bold">Residential Address *</FormLabel>
                          <FormControl>
                              <Textarea placeholder="Full Postal Address" {...field} className="bg-gray-50/50 rounded-xl border-gray-200 min-h-[100px] resize-none focus:border-[#35a3be] focus:ring-[#35a3be]" />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Contact Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#182d45]">Contact Channels</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      <FormField
                          control={form.control}
                          name="fatherContact"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold">Father's Contact *</FormLabel>
                              <FormControl>
                                  <Input placeholder="10 Digit Number" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="motherContact"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold">Mother's Contact *</FormLabel>
                              <FormControl>
                                  <Input placeholder="10 Digit Number" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="whatsappNumber"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold">WhatsApp Number *</FormLabel>
                              <FormControl>
                                  <Input placeholder="For Updates" {...field} className="h-12 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Academy Details */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#182d45]">Academic & Source</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <FormField
                          control={form.control}
                          name="board"
                          render={({ field }) => (
                              <FormItem className="space-y-4">
                              <FormLabel className="text-[#182d45] font-bold">Board of Education *</FormLabel>
                              <FormControl>
                                  <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="mt-2 space-y-3"
                                  >
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-4 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="cbse" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full">CBSE</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-4 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="samacheer" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full">Samacheer</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-4 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="other-board" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full">Other Board</FormLabel>
                                  </FormItem>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="subjects"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold">Preferred Subjects *</FormLabel>
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                  {subjectItems.map((item) => (
                                  <FormField
                                      key={item.id}
                                      control={form.control}
                                      name="subjects"
                                      render={({ field }) => {
                                      return (
                                          <FormItem
                                          key={item.id}
                                          className="flex flex-row items-center space-x-3 space-y-0 p-3 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all"
                                          >
                                          <FormControl>
                                              <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                  return checked
                                                  ? field.onChange([...(field.value || []), item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                          (value) => value !== item.id
                                                      )
                                                      )
                                              }}
                                              className="border-gray-300 data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                                              />
                                          </FormControl>
                                          <FormLabel className="font-semibold text-gray-600 text-sm cursor-pointer">
                                              {item.label}
                                          </FormLabel>
                                          </FormItem>
                                      )
                                      }}
                                  />
                                  ))}
                              </div>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="howHeard"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold">How did you hear about us?</FormLabel>
                                <div className="flex flex-wrap gap-4 mt-4">
                                {howHeardItems.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="howHeard"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-center space-x-3 space-y-0 p-3 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.id
                                                        )
                                                    )
                                                }}
                                                className="border-gray-300 data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                                            />
                                            </FormControl>
                                            <FormLabel className="font-semibold text-gray-600 text-sm cursor-pointer">
                                            {item.label}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>

                  <div className="pt-8">
                    <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-[1.5rem] border border-gray-100 bg-[#35a3be]/5 p-6 shadow-inner">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 border-[#35a3be] data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                            />
                        </FormControl>
                        <div className="space-y-1 leading-relaxed">
                            <FormLabel className="text-sm font-bold text-[#182d45] cursor-pointer">
                            I agree to the terms and conditions. I verify that all the information provided above is correct to the best of my knowledge.
                            </FormLabel>
                            <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />

                    <div className="mt-12 text-center">
                    <Button type="submit" size="lg" className="w-full md:w-auto min-w-[300px] h-16 text-lg font-black text-white rounded-2xl shadow-xl hover:shadow-[#35a3be]/30 transition-all duration-300 transform active:scale-95 group" style={{ backgroundColor: '#35a3be' }}>
                        <Send className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                        Submit Application
                    </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
