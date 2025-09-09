export interface ProblemStatement {
  code: string;
  title: string;
  category: string;
  by: string;
  description: string;
}

export const problemStatements: ProblemStatement[] = [
  {
    code: "PS001",
    title: "AI-Powered Learning Assistant",
    category: "Artificial Intelligence",
    by: "TechInnovate Solutions",
    description: "Design and develop an AI-powered learning assistant that can help students understand complex topics by breaking them down into simpler concepts. The assistant should be able to generate customized learning paths based on the student's learning style and pace."
  },
  {
    code: "PS002",
    title: "Blockchain-Based Voting System",
    category: "Blockchain",
    by: "ADSC Club",
    description: "Create a secure and transparent voting system using blockchain technology that ensures the integrity of votes while maintaining voter anonymity. The system should be resistant to tampering and provide a way to verify that votes have been counted correctly."
  },
  {
    code: "PS003",
    title: "Smart Campus Energy Management",
    category: "IoT",
    by: "GreenTech Innovations",
    description: "Develop an IoT solution to monitor and optimize energy consumption across campus buildings. The system should collect real-time data on energy usage, identify patterns, suggest optimizations, and allow for remote control of connected devices to reduce energy waste."
  }
];

export const categories = [
  "All Categories",
  "Artificial Intelligence",
  "Blockchain",
  "IoT",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science"
];
