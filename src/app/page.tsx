"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  formatPinInput,
  formatCurrencyInput,
  formatCurrency,
  formatPhoneInput,
  formatNameInput
} from "@/lib/formatting";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .regex(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in format (XXX) XXX-XXXX"
    ),
  email: z.email("Invalid email address").min(1, "Email is required"),
  airFryerCost: z
    .string()
    .min(1, "Air fryer cost guess is required")
    .refine(
      (val) => !isNaN(Number(val.replace(/[$,]/g, ""))),
      "Must be a valid dollar amount"
    ),
  spidrPin: z
    .string()
    .regex(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "PIN must be 16 digits in format ####-####-####-####"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      airFryerCost: "",
      spidrPin: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      airFryerCost: formatCurrency(data.airFryerCost),
    };
    console.log("Form Data:", formattedData);
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-[#56ACBD] text-white">
      <h1 className="text-2xl font-bold mb-6 text-center font-light">Spidr Registration Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatNameInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatNameInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(123) 456-7890"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatPhoneInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    maxLength={14}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    type="email"
                    {...field}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="airFryerCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guess the Air Fryer&apos;s Cost</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      placeholder="0.00"
                      className={`pl-8 rounded-none ${form.formState.errors.airFryerCost ? "border-red-500" : ""}`}
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCurrencyInput(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spidrPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Very, Very Secret 16-digit Spidr PIN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="####-####-####-####"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatPinInput(e.target.value);
                      field.onChange(formatted);
                    }}
                    maxLength={19}
                    className="rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-none bg-[#56ACBD] text-white border border-white">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
