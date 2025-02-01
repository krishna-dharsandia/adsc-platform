"use client";

import type React from "react";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { onBoardingSchema } from "@/schemas/onBoardingSchema";
import { useAuth, useUser } from "@clerk/nextjs";
import { FACULTIES, DEPARTMENTS, PROGRAMS, YEARS } from "@/constants/index";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/global/loader";
import { handleOnboarding } from "@/actions/onboarding";
import { MagicCard } from "@/components/ui/magic-card";
import DotPattern from "@/components/ui/dot-pattern";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded } = useAuth();
  const { user } = useUser();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, startTransition] = useTransition();

  const generateUploadUrl = useMutation(api.students.generateUploadUrl);
  const createStudent = useMutation(api.students.create);
  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      department: "",
      faculty: "",
      year: "",
    },
  });

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push("/sign-in");
      }
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        {" "}
        <Loader />
      </div>
    );
  }

  const validateImage = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 4MB";
    }
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const error = validateImage(file);
      if (error) {
        toast({ title: "Invalid Image", description: error, variant: "destructive" });
        e.target.value = "";
        return;
      }
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setImageFile(file);
    }
  };

  const generateEnrollmentId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${year}${random}`;
  };

  const onSubmit = async (values: z.infer<typeof onBoardingSchema>) => {
    if (!imageFile) {
      toast({ title: "No image selected", description: "Please select a profile picture", variant: "destructive" });
      return;
    }
    startTransition(async () => {
      const postUrl = await generateUploadUrl();
      const enrollmentId = generateEnrollmentId();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": imageFile!.type },
        body: imageFile,
      });

      const { storageId } = await result.json();

      if (!user) {
        toast({
          title: "User not found",
          description: "Please log in to continue.",
          variant: "destructive",
        });
        return;
      }

      await createStudent({
        ...values,
        enrolmentIno: enrollmentId,
        profilePicture: storageId,
        clerkId: user?.id,
      });

      await user.update({
        unsafeMetadata: {
          onboardingComplete: true,
        },
      });

      const res = await handleOnboarding({ values, userId: user.id });
      toast({
        title: res.title,
        description: res.description,
        variant: "default",
      });
      if (res.variant !== "destructive") {
        router.push("/");
      }
    });
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 md:px-9">
      <MagicCard className="w-full cursor-pointer border-none bg-background p-4 text-white">
        <div className="relative w-full p-4 md:p-6">
          <h2 className="mb-6 text-center text-2xl font-bold">Complete Your Profile</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* <div className="flex items-center justify-center">
                  <div
                    className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-200 md:h-40 md:w-40"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    {imagePreview ? (
                      <Image src={imagePreview || "/placeholder.svg"} alt="Profile preview" layout="fill" objectFit="cover" />
                    ) : (
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                </div> */}

              {/* Profile Image Section */}
              <div className="mx-auto mb-6 w-full max-w-xs">
                <div
                  className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-200 md:h-40 md:w-40"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid w-full gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enrolmentIno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enrollment ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enrollment ID" {...field} />
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
                      <FormLabel>Email ID</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Mobile Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "faculty", label: "Faculty", options: FACULTIES },
                  { name: "department", label: "Department", options: DEPARTMENTS },
                  { name: "program", label: "Program", options: PROGRAMS },
                  { name: "year", label: "Year", options: YEARS },
                ].map(({ name, label, options }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as "faculty" | "department" | "program" | "year"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${label}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="col-span-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader className="mr-2 h-4 w-4" /> : null}
                  Complete Registration
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </MagicCard>
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} className="dot-pattern opacity-50" />
    </div>
  );
}
