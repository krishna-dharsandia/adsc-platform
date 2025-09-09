import { ReactNode } from "react";

export const COLOR = {
  pink: "#FF69B4",
  lightpink: "#FFB6C1",
};

export interface TimelineItem {
  phase: string;
  date: string;
  title: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    phase: "PHASE 1",
    date: "15-20 Sept",
    title: "Registration",
    description: "Form your team of 2-4 members and register for the hackathon",
  },
  {
    phase: "PHASE 2",
    date: "21-22 Sept",
    title: "Problem Selection",
    description: "Choose a problem statement from the available options",
  },
  {
    phase: "PHASE 3",
    date: "23-29 Sept",
    title: "Build Phase",
    description: "Work on your solution with mentorship from industry experts",
  },
  {
    phase: "PHASE 4",
    date: "30 Sept",
    title: "Judging & Awards",
    description: "Present your solution to judges and win exciting prizes",
  },
];

export interface WhoCanJoinItem {
  title: string;
  description: string;
}

export const whoCanJoinData: WhoCanJoinItem[] = [
  {
    title: "College Students",
    description: "Open to all undergraduate and postgraduate students from any college in India",
  },
  {
    title: "Teams of 2-4",
    description: "Form a team with 2-4 members who are passionate about technology",
  },
  {
    title: "All Skill Levels",
    description: "Whether you're a beginner or expert, everyone is welcome to participate",
  },
];

export interface HowToParticipateItem {
  number: string;
  title: string;
  description: string;
}

export const howToParticipateData: HowToParticipateItem[] = [
  {
    number: "1",
    title: "Register Your Team",
    description: "Sign up your team on our registration portal before September 20th",
  },
  {
    number: "2",
    title: "Choose a Problem Statement",
    description: "Select a problem statement that excites your team",
  },
  {
    number: "3",
    title: "Build Your Solution",
    description: "Develop a working prototype or solution within the hackathon timeline",
  },
  {
    number: "4",
    title: "Present to Judges",
    description: "Showcase your solution to our panel of expert judges",
  },
];

export interface BaselineReward {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export const baselineRewardsData: BaselineReward[] = [
  {
    icon: "🏅",
    title: "Participation Certificates",
    subtitle: "For all hackathon participants",
  },
  {
    icon: "👥",
    title: "Networking Opportunities",
    subtitle: "Connect with industry professionals",
  },
  {
    icon: "💼",
    title: "Internship Opportunities",
    subtitle: "For outstanding performers",
  },
  {
    icon: "🎓",
    title: "Learning Resources",
    subtitle: "Access to exclusive workshops and resources",
  },
];

export interface SeasonalPrize {
  rank: string;
  prize: string;
  gradient: string;
}

export const seasonalPrizesData: SeasonalPrize[] = [
  {
    rank: "🥇",
    prize: "₹10,000 + Internship Opportunities",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
  },
  {
    rank: "🥈",
    prize: "₹5,000 + Swag Kits",
    gradient: "linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%)",
  },
  {
    rank: "🥉",
    prize: "₹2,000 + Exclusive Merchandise",
    gradient: "linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)",
  },
];
