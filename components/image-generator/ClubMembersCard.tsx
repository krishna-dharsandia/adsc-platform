"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ClubMemberCard() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const cardRef = useRef(null);
  const toast = useToast();

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download Image
  const handleDownload = () => {
    if (!image) {
      toast.toast({
        title: "Image Required",
        description: "Please upload an image to generate the card.",
      });
      return;
    }
    if (!name) {
      toast.toast({
        title: "Name Required",
        description: "Please enter your name to generate the card.",
      });
      return;
    }
    if (cardRef.current) {
      toPng(cardRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "club_member_card.png";
          link.click();
        })
        .catch((err) => console.error("Error generating image:", err));
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ contain: "layout" }}>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Create Your Club Member Card</h1>

        {/* Image Upload */}
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

        {/* Name Input */}
        <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />

        {/* Card Preview */}
        <div ref={cardRef} className="relative w-[400px] h-[400px] bg-white shadow-lg rounded-lg">
          {/* Background Template */}
          <img src="/images/club-member-template.jpeg" alt="Template" className="w-full h-full absolute" />

          {/* User Image */}
          {typeof image === "string" && <img src={image} alt="User" className="absolute top-[140px] left-[100px] w-[200px] h-[200px] rounded-full object-cover" />}

          {/* User Name */}
          <p className="absolute bottom-[36px] left-0 right-0 text-center text-xl font-bold text-red-700">{name}</p>
        </div>

        {/* Download Button */}
        {/* <Button onClick={handleDownload}>Download Image</Button> */}
        <Button className="transition-all bg-[rgba(154,52,18,0.5)] hover:bg-[rgba(67,20,7)] mt-4 w-full" onClick={handleDownload}>
          Download Image
        </Button>
      </div>
    </div>
  );
}
