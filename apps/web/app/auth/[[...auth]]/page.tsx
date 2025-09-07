import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-unit-bg animate-fadeIn">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#7b61ff",
              borderRadius: "0.75rem",
            },
            elements: {
              card: "bg-gray-bg!",
              headerTitle: "text-white!",
              headerSubtitle: "text-white!",
              socialButtonsBlockButton: "text-white! border-white! border-2!",
              dividerLine: "bg-white!",
              dividerText: "text-white!",
              formFieldLabel: "text-white!",
              formFieldInput: "text-white! bg-unit-bg! placeholder-gray-dash!",
              formButtonPrimary:
                "bg-gradient-to-r from-indigo-500 via-teal-400 to-yellow-400 text-black font-semibold rounded-lg px-4 py-2 hover:opacity-90 transition shadow-none!",
              footer: "bg-gray-bg!",
            },
          }}
        />
      </div>
    </div>
  );
}
