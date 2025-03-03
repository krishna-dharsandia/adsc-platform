interface Project {
  id: string;
  screenshot: string;
  title: string;
  subTitle: string;
  stack: string[];
  description: string;
  date: string;
  github: string;
  live: string;
  color: string;
  btnBg: string;
  btnBgHover: string;
  cardBg: string;
}

export const projects: Project[] = [
  {
    id: "1",
    screenshot: "/images/events/inter-college-hackthon.JPG",
    title: "Inter College Hackathon",
    subTitle: "Technical fest/academic fests",
    stack: ["next.js", "typescript", "clerck", "tailwindcss", "mongodb", "mongoose", "clerck webhooks"],
    description: `Inter College Hackathon is a competitive event where students from various colleges come together to solve real-world problems using technology. This project showcases a platform built to manage and display the hackathon details, participants, and their projects. The application leverages modern web technologies to provide a seamless and interactive experience for users.`,
    date: "Sep 29, 2023",
    github: "",
    live: "",
    color: "rgba(59,130,246)", // Blue
    btnBg: "rgba(29,78,216,0.5)",
    btnBgHover: "rgba(30,58,138)",
    cardBg: "rgba(29,78,216,0.05)",
  },
  {
    id: "2",
    screenshot: "/images/events/code-carnival.jpg",
    title: "Code Carnival - The Open Hackathon",
    subTitle: "Technical fest/academic fests",
    stack: ["react", "typescript", "tailwindcss", "nx", "rollup", "Module Federation", "vitest", "playwright", "storybook", "svgr", "lint-staged", "husky", "ci/cd", "aws"],
    description: "Code Carnival - The Open Hackathon is an inclusive event designed to bring together developers, designers, and tech enthusiasts from all backgrounds to collaborate on innovative projects. Participants are encouraged to push the boundaries of technology and creativity, working on projects that range from web applications to AI-driven solutions. This hackathon emphasizes learning, networking, and the spirit of open-source collaboration, providing a platform for individuals to showcase their skills and make meaningful contributions to the tech community.",
    date: "Feb 03, 2024",
    github: "",
    live: "",
    color: "rgba(234,88,12)", // Orange
    btnBg: "rgba(154,52,18,0.5)",
    btnBgHover: "rgba(124,45,18)",
    cardBg: "rgba(154,52,18,0.05)",
  },
  {
    id: "3",
    screenshot: "/images/events/orientenation-session.jpg",
    title: "ADSC - Orientenation Session",
    subTitle: "Orientation and introductory session",
    stack: ["typescript", "tailwindcss", "tamagui", "nextjs", "clerk", "convex", "vercel"],
    description: " The ADSC - Orientation Session is an event designed to introduce new members to the ADSC community and provide an overview of the club's activities, initiatives, and opportunities. The session covers topics such as the club's mission, vision, and values, as well as the various projects, workshops, and events that members can participate in. The goal of the orientation session is to welcome new members, help them get acquainted with the club, and inspire them to get involved and make a positive impact in the tech community.",
    date: "Feb 01, 2025",
    github: "",
    live: "https://www.youtube.com/live/7gSnJTBxVjc?si=pIaO7ygLLaQGprul",
    color: "rgba(34,197,94)", // Green
    btnBg: "rgba(21,128,61,0.5)",
    btnBgHover: "rgba(20,83,45)",
    cardBg: "rgba(21,128,61,0.05)",
  },
  {
    id: "4",
    screenshot: "/images/events/web-dev-seminar.jpeg",
    title: "Web Development Seminar",
    subTitle: "Technical Fest / Academic Fests",
    stack: ["HTML", "CSS", "JavaScript", "API", "JSON", "Tenor API"],
    description: "An interactive hands-on web development seminar where participants learned to build 'Meme Blast' - a dynamic web application that fetches and displays memes using the Tenor API. The session covered fundamental web technologies including HTML, CSS, and JavaScript, with practical examples of API integration, JSON data handling, and DOM manipulation. Participants gained real-world experience in building responsive web applications while creating an engaging meme search interface.",
    date: "Feb 27, 2025",
    github: "https://github.com/Jenil-Desai/Meme-Blast",
    live: "https://www.youtube.com/live/JpZph22bF4E?si=L8MS0Rv56Eu-gjjsa",
    color: "rgba(168,85,247)", // Purple
    btnBg: "rgba(126,34,206,0.5)",
    btnBgHover: "rgba(88,28,135)",
    cardBg: "rgba(126,34,206,0.05)",
  },
];
