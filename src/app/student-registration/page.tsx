
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

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
    const photoRef = React.useRef<HTMLInputElement>(null);

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
            gender: undefined,
            residentialAddress: "",
            fatherContact: "",
            motherContact: "",
            whatsappNumber: "",
            board: undefined,
            subjects: [],
            howHeard: [],
            terms: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Registration Submitted!",
            description: "Thank you for registering. We will be in touch shortly.",
        });
        form.reset();
        if (photoRef.current) {
          photoRef.current.value = "";
        }
    }

  return (
    <div style={{ backgroundColor: '#e8effe' }} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
            Student Registration Form
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Please fill out the form below to register.
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <FormField
                      control={form.control}
                      name="candidateName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Candidate Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Candidate Name *" {...field} className="bg-blue-50/50" />
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
                          <FormLabel>Standard *</FormLabel>
                          <FormControl>
                            <Input placeholder="Standard *" {...field} className="bg-blue-50/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fatherOccupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Occupation *</FormLabel>
                          <FormControl>
                            <Input placeholder="Father's Occupation *" {...field} className="bg-blue-50/50" />
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
                            <FormLabel>Name of the Institution *</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of the Institution *" {...field} className="bg-blue-50/50" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Gender *</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex items-center gap-8 mt-2"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="male" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    Male
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="female" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    Female
                                    </FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormLabel>Upload your photo</FormLabel>
                                <FormControl>
                                    <Input 
                                      type="file" 
                                      onChange={(e) => onChange(e.target.files)}
                                      ref={photoRef}
                                      {...rest}
                                      className="bg-blue-50/50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent's / Guardian's Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Parent's / Guardian's Name *" {...field} className="bg-blue-50/50" />
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
                          <FormLabel>Mother's Occupation *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mother's Occupation *" {...field} className="bg-blue-50/50" />
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
                          <FormLabel>Date of Birth *</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                  variant={"outline"}
                                  className={cn(
                                      "w-full justify-start text-left font-normal bg-blue-50/50",
                                      !field.value && "text-muted-foreground"
                                  )}
                                  >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : <span>Date of Birth *</span>}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
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
                  </div>
                </div>

                <FormField
                    control={form.control}
                    name="residentialAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Residential Address *</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Residential Address *" {...field} className="bg-blue-50/50 h-24" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormField
                    control={form.control}
                    name="fatherContact"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Father's Contact Number *</FormLabel>
                        <FormControl>
                            <Input placeholder="Father's Contact Number *" {...field} className="bg-blue-50/50" />
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
                        <FormLabel>Mother's Contact Number *</FormLabel>
                        <FormControl>
                            <Input placeholder="Mother's Contact Number *" {...field} className="bg-blue-50/50" />
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
                        <FormLabel>WhatsApp Number *</FormLabel>
                        <FormControl>
                            <Input placeholder="WhatsApp Number *" {...field} className="bg-blue-50/50" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="board"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Board of Education *</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="mt-2 space-y-2"
                            >
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <RadioGroupItem value="cbse" />
                                </FormControl>
                                <FormLabel className="font-normal">CBSE</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <RadioGroupItem value="samacheer" />
                                </FormControl>
                                <FormLabel className="font-normal">Samacheer</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <RadioGroupItem value="other-board" />
                                </FormControl>
                                <FormLabel className="font-normal">Other</FormLabel>
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
                        <div className="mb-4">
                            <FormLabel>Subjects *</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                            {subjectItems.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="subjects"
                                render={({ field }) => {
                                return (
                                    <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
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
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
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
                            <div className="mb-4">
                                <FormLabel>How did you hear about us?</FormLabel>
                            </div>
                            <div className="mt-2 space-y-2">
                            {howHeardItems.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="howHeard"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
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
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
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
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        I agree to the terms and conditions
                        </FormLabel>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
              />


              <div className="text-center pt-4">
                <Button type="submit" size="lg" className="bg-[#43b9ea] hover:bg-[#38a8d6] text-white">
                  Submit Application
                </Button>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
