import { motion, MotionValue } from "motion/react";
import { useRouter } from "next/navigation";

export const BottomSection = ({
  bottomOpacity,
}: {
  bottomOpacity: MotionValue<number>;
}) => {
  const router = useRouter();

  return (
    <motion.div
      className="-my-[60vh] container flex flex-col justify-center gap-8 items-center mx-auto bg-black text-white max-w-3xl z-50"
      style={{ opacity: bottomOpacity }}
    >
      <div className="text-2xl md:text-3xl tracking-tighter font-medium mb-20">
        Start creating with your team today
      </div>
      <div className="flex justify-center gap-4 items-center font-semibold text-lg md:text-xl tracking-tight">
        <motion.button
          className="rounded-lg px-4 py-1 text-white shadow-white/40 shadow-md"
          style={{
            background: "linear-gradient(90deg, #7b61ff, #00ccb1, #ffc414)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          onClick={() => router.push("/auth")}
        >
          Sign Up Free
        </motion.button>
        <button
          className="rounded-lg px-4 py-1 text-lg font-medium border border-white/40 text-white/90 hover:bg-white/10 transition"
          onClick={() => router.push("/auth")}
        >
          Log In
        </button>
      </div>
    </motion.div>
  );
};
