import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex pt-10 flex-col items-center text-center min-h-screen bg-white">
      <SignIn />
    </div>
  );
}
