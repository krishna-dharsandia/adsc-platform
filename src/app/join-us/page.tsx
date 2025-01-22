"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useUser } from "@clerk/nextjs"

const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering'
];

const faculties = [
    'Engineering',
    'Science',
    'Arts',
    'Business',
    'Medicine'
];

const studyYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];


const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

// Form schema
const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().min(10, 'Invalid phone number'),
    department: z.string().min(1, 'Please select a department'),
    faculty: z.string().min(1, 'Please select a faculty'),
    year: z.string().min(1, 'Please select a year'),
});

const StudentRegistration = () => {
    const router = useRouter();
    const { toast } = useToast();
    const createStudent = useMutation(api.students.create);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [isUploading, setIsUploading] = React.useState(false);
    const { user, isSignedIn } = useUser();

    const generateUploadUrl = useMutation(api.students.generateUploadUrl);;

    // const convertToBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result as string);
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //     });
    // };

    // Initialize react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            department: '',
            faculty: '',
            year: '',
        },
    });

    const validateImage = (file: File) => {
        if (file.size > MAX_FILE_SIZE) {
            return {
                isValid: false,
                error: "Image size must be less than 4MB"
            };
        }

        if (!file.type.startsWith('image/')) {
            return {
                isValid: false,
                error: "Only image files are allowed"
            };
        }

        return {
            isValid: true,
            error: null
        };
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file
            const validation = validateImage(file);

            if (!validation.isValid) {
                toast({
                    title: "Invalid Image",
                    description: validation.error,
                    variant: "destructive"
                });
                e.target.value = ''; // Reset input
                return;
            }

            // Create preview
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
            setImageFile(file);
        }
    };

    const generateEnrollmentId = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${year}${random}`;
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsUploading(true);

            if (!isSignedIn || !user) {
                toast({
                    title: 'Authentication Required',
                    description: 'Please sign in to register',
                    variant: 'destructive',
                });
                router.push('/login');
                return;
            }

            // let base64Image = user.imageUrl;

            // if (imageFile) {
            //     // Convert selected image to base64
            //     base64Image = await convertToBase64(imageFile);
            // }

            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": imageFile!.type },
                body: imageFile,
            });
            
            const { storageId } = await result.json();

            const enrollmentId = generateEnrollmentId();

            // Create student with image
            await createStudent({
                ...values,
                enrolmentIno: enrollmentId,
                profilePicture: storageId,
                clerkId: user.id,
            });

            toast({
                title: 'Registration Successful!',
                description: `Welcome ${values.name}! Your enrollment ID is ${enrollmentId}`,
            });

            router.push('/');

            setIsUploading(false);
        } catch {
            toast({
                title: 'Registration Failed',
                description: 'Please try again later',
                variant: 'destructive',
            });

            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Join Us</CardTitle>
                    <CardDescription className="text-center">
                        Register for your student account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                                        {imagePreview ? (
                                            <Image
                                                src={imagePreview}
                                                alt="Profile preview"
                                                className="w-full h-full object-cover"
                                                height={128}
                                                width={128}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-gray-400">No image</span>
                                            </div>
                                        )}
                                    </div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute bottom-0 left-0 w-full opacity-0 cursor-pointer h-32"
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@university.edu"
                                                {...field}
                                            />
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
                                            <Input
                                                type="tel"
                                                placeholder="+1 (123) 456-7890"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem key={dept} value={dept}>
                                                        {dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="faculty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Faculty</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Faculty" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {faculties.map((faculty) => (
                                                    <SelectItem key={faculty} value={faculty}>
                                                        {faculty}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year of Study</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {studyYears.map((year) => (
                                                    <SelectItem key={year} value={year}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting || isUploading}
                            >
                                {form.formState.isSubmitting || isUploading ? 'Processing...' : 'Register'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentRegistration;