import Link from "next/link";
import Head from "next/head";
import SectionAnimation from "./components/SectionAnimation";
import { motion } from "framer-motion";

export default function Custom404() {
  const sentence = "The page you're looking for doesn't exist.";
  const letters = sentence.split("");
  const charSpace = <span className="inline-block w-[0.4rem]"></span>;
  return (
    <>
      <Head>
        <title>404 – Page Not Found</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="not-found-header text-6xl font-bold mb-4">404</h1>
        <div className="not-found-dolphin-animation">
          <SectionAnimation menuIsActive={true} media={"mobile"} />
        </div>
        <div className="text-2xl mb-6">
          <div className="sentence w-full flex align-center justify-center text-[1.5rem] mb-[5px]">
            {letters.map((char, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: "75%", skewX: 15 }}
                  whileInView={{ opacity: 1, y: 0, skewX: 0 }}
                  transition={{
                    duration: 0.25,
                    type: "spring",
                    delay: i * 0.025,
                  }}
                >
                  {char === " " ? charSpace : char}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
          transition={{
            delay: 1.35,
            duration: 0.75,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Link
            href="/"
            className="back-home text-2xl text-blue-300 hover:text-blue-200"
          >
            ← Back to Home
          </Link>
        </motion.span>
      </div>
    </>
  );
}
