// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import path from 'path';
import fs from 'fs/promises';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File size must be less than 4MB' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Only image files are allowed' },
                { status: 400 }
            );
        }

        // Create unique filename
        const timestamp = Date.now();
        const extension = path.extname(file.name);
        const filename = `${userId}-${timestamp}${extension}`;

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        // Convert File to Buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save file
        const filepath = path.join(uploadDir, filename);
        await fs.writeFile(filepath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}