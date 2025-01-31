"use client";
import ClubMemberCard from "@/components/image-generator/ClubMembersCard";

export default function ImageGenerator() {
  return (
    <div className="flex justify-center items-center mt-48 pb-44" style={{ contain: "layout" }}>
      <ClubMemberCard />
    </div>
  );
}
