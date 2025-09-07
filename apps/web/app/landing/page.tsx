"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { BottomSection } from "./components/bottom-section";
import { MainSection } from "./components/main-section";

export default function Landing() {
  const { scrollYProgress } = useScroll();

  const maskSize = useTransform(scrollYProgress, [0, 1], [4800, 400]);
  const maskPosition = useTransform(scrollYProgress, [0, 1], [-1900, 0]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const whiteFillOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const bottomOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);
  return (
    <div className="bg-black animate-fadeIn">
      <div className="pointer-events-none h-[250vh] bg-black">
        <motion.div
          className="fixed inset-0 h-full w-full bg-[url('/background.png')] bg-fixed bg-cover text-white"
          style={{ opacity: outerImageOpacity }}
        >
          <MainSection />
        </motion.div>
        <motion.div
          className="fixed flex m-auto w-full h-full inset-0 [mask-image:url('/freeflow.svg')] [mask-repeat:no-repeat]"
          style={{
            opacity: maskOpacity,
            maskSize: useMotionTemplate`${maskSize}px`,
            maskPosition: useMotionTemplate`center ${maskPosition}px`,
          }}
        >
          <motion.div className="fixed inset-0 h-full w-full bg-[url('/background.png')] bg-fixed bg-cover"></motion.div>
          <motion.div
            style={{ opacity: whiteFillOpacity }}
            className="fixed inset-0 h-full w-full bg-white"
          ></motion.div>
        </motion.div>
      </div>
      <BottomSection bottomOpacity={bottomOpacity} />
    </div>
  );
}
