"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { onBoardingSchema } from "@/schemas/onBoardingSchema";
import { useAuth, useUser } from "@clerk/nextjs";
import { DEPARTMENTS, FACULTIES, STUDY_YEAR } from "@/constants/index";
import { handleOnboarding } from "@/actions/onboarding";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Loader from "@/components/global/loader";

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
      } else if (user.unsafeMetadata?.onboardingComplete) {
        router.push("/");
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
    <div className="flex min-h-screen items-center justify-center  px-4 py-12 sm:px-6 lg:px-8" style={{ contain: "layout" }}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Join Us</CardTitle>
          <CardDescription className="text-center">Register for your student account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="size-32 overflow-hidden rounded-full bg-gray-100">
                    {imagePreview ? (
                      <Image src={imagePreview} alt="Profile preview" className="size-full object-cover" height={128} width={128} />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute bottom-0 left-0 h-32 w-full cursor-pointer opacity-0" />
                </div>
              </div>

              {/* Text Fields */}
              {[
                { name: "name", label: "Name" },
                { name: "email", label: "Email" },
                { name: "mobile", label: "Mobile" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as "name" | "department" | "email" | "faculty" | "year" | "mobile"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${label}`} {...field}  className="bg-white text-black"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Select Fields */}
              {[
                { name: "department", label: "Department", options: DEPARTMENTS },
                { name: "faculty", label: "Faculty", options: FACULTIES },
                { name: "year", label: "Year", options: STUDY_YEAR },
              ].map(({ name, label, options }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as "name" | "department" | "email" | "faculty" | "year" | "mobile"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${label}`} className="bg-white text-black" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option} value={option} className="bg-white text-black">
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
