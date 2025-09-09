import { Trophy, BookText, Image } from "lucide-react";

export const COLOR = {
  pink: "#C44772",
  lightpink: "#E37198",
};

export const timelineData = [
  {
    phase: "Phase 1",
    date: "15th to 30th Sept",
    title: "Registration",
    description: "Register your team and get ready to code."
  },
  {
    phase: "Phase 2",
    date: "2nd to 3rd Oct",
    title: "Hacking",
    description: "Build your innovative solutions."
  },
  {
    phase: "Phase 3",
    date: "3rd Oct",
    title: "Judging",
    description: "Present your projects to the judges."
  },
  {
    phase: "Phase 4",
    date: "3rd Oct",
    title: "Winners",
    description: "Announce the winners and celebrate."
  }
];

export const whoCanJoinData = [
  {
    title: "Hackathon Alumni",
    description: "Every hacker is a potential builder."
  },
  {
    title: "Solo & Teams",
    description: "Individual developers or full teams welcome."
  },
  {
    title: "All Builders",
    description: "Web3, AI, Mobile or any development projects."
  }
];

export const howToParticipateData = [
  {
    number: "1",
    title: "Register Yourself On Events Website",
    description: "Sign up on the events portal to get started."
  },
  {
    number: "2",
    title: "Create / Join Your Team In Hackathon",
    description: "Form a new team or join an existing one for the hackathon."
  },
  {
    number: "3",
    title: "Invite Other Members Using Email In Team",
    description: "Invite teammates via email. They must register on the events website before joining your team."
  },
  {
    number: "4",
    title: "Watch Demo Video For How To Register In Hackathon",
    description: "View the demo video for step-by-step registration guidance."
  }
];

export const baselineRewardsData = [
  {
    icon: <BookText className="w-4 h-4" />,
    title: "Resource Kit",
    subtitle: "Curated documentation with learning resources & project guides."
  },
  {
    icon: <Image className="w-4 h-4" />,
    title: "Themed Digital Wallpapers",
    subtitle: "Custom ADSC x Code Carnival digital wallpaper designs."
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Participation Certificate",
    subtitle: "Code Carnival 2.0 participation certificate."
  }
];

export const seasonalPrizesData = [
  {
    rank: "#1",
    prize: "10,000 INR",
    gradient: "linear-gradient(135deg, #E9B2B2 60%, #FFE4E4 100%)",
  },
  {
    rank: "#2",
    prize: "5,000 INR",
    gradient: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
  },
  {
    rank: "#3",
    prize: "2,000 INR",
    gradient: "linear-gradient(135deg, #5A4A4A 60%, #E9B2B2 100%)",
  }
];
