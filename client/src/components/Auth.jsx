import { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";
import { TbCopy, TbSettings, TbDownload, TbLogin2, TbX } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { ServerUrl } from "../App";

const steps = [
  {
    icon: TbLogin2,
    title: "Login with Google",
    desc: "Secure OAuth to unlock all AI tools instantly.",
  },
  {
    icon: HiSparkles,
    title: "Get 150 AI Credits",
    desc: "Free credits to generate premium UI components.",
  },
  {
    icon: TbSettings,
    title: "Customize Props",
    desc: "Fine-tune and preview every change live.",
  },
  {
    icon: TbCopy,
    title: "Generate Components",
    desc: "AI builds production-ready JSX components.",
  },
  {
    icon: TbDownload,
    title: "Copy or Save",
    desc: "Export clean code straight into your project.",
  },
];

const stats = [
  ["150", "Tokens"],
  ["Unlimited", "Components"],
  ["JSX", "Ready"],
];

function Auth({ onClose }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2400);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  const googleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      const name = User.displayName;
      const email = User.email;

      const result = await axios.post(
        ServerUrl + "/api/login/google",
        { name, email },
        { withCredentials: true },
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ duration: 0.8 }}
          className="relative flex w-full max-w-260 min-h-150 overflow-hidden rounded-2xl border border-white/10 bg-[#343434]/90 shadow-[0_40px_100px_rgba(0,0,0,0.85)]"
        >
          {/* x button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
          >
            <TbX size={19}></TbX>
          </button>

          {/* left div */}
          <div className="relative w-[52%] overflow-hidden bg-linear-to-br from-[#021719] to-[#04282f] p-8 sm:p-12">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-9 sm:mb-10"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]">
                <TbCircleLetterGFilled size={37} color="#051c20" />
              </div>
              <span
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                GenUI
              </span>
            </motion.div>

            <p className="text-xs font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-5 sm:mb-6">
              How it works
            </p>

            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1">
              {steps.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={i}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`shrink-0 sm:shrink flex items-start gap-4 px-4 py-3.5 rounded-xl border transition-all duration-300 min-w-62 sm:min-w-0 ${active === i ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20" : "bg-transparent border-transparent"}`}
                  >
                    <div
                      className={`min-w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${active === i ? "bg-linear-to-br from-[#3be8ff] to-[#0ab8d6] border-transparent text-[#051c20]" : "bg-[#3be8ff]/8 border-[#3be8ff]/20 text-[#3be8ff]"}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/60">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* right div */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="sm:w-[48%] bg-[#040f12] px-8 sm:px-12 py-10 sm:py-14 flex flex-col justify-center items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(rgba(59,232,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-size-[32px_32px]">
              <div className="relative z-10 w-full max-w-82 text-center mx-auto">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: easeInOut,
                  }}
                  className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl mx-auto mb-6 sm:mb-7 bg-linear-to-br from-[#3be8ff]/15 to-[#040f12] border border-[#3be8ff]/20"
                >
                  <TbCircleLetterGFilled
                    className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
                    size={36}
                    color="#3be8ff"
                  />
                </motion.div>
                <h3
                  className="text-3xl font-bold text-white tracking-tight mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  welcome
                </h3>
                <p className="text-[20px] text-[#96bec8]/55 leading-relaxed mb-6 sm:mb-7">
                  Sign in to generate your AI powered components in seconds
                </p>

                <div className="flex justify-center gap-4 sm:gap-5 mb-10 sm:mb-10">
                  {stats.map(([v, l], i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-[#3be8ff]">
                        {v}
                      </div>
                      <div className="text-[11px] text-[#9fd3dc]/70 uppercase tracking-wider font-medium">
                        {l}
                      </div>
                    </div>
                  ))}
                  {active < 0 &&
                    [
                      ["150", "Tokens"],
                      ["∞", "Components"],
                      ["JSX", "Ready"],
                    ].map(([v, l], i) => {
                      return (
                        <div key={i} className="text-center">
                          <div className="text-base font-bold text-[#3be8ff]">
                            {v}
                          </div>

                          <div className="text-[19px] text-[#78aab4]/45 uppercase tracking-wider font-medium">
                            {l}
                          </div>
                        </div>
                      );
                    })}
                </div>

                <motion.button
                  onClick={googleAuth}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-[#0a1a1d] font-bold text-xl cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] transition-shadow"
                >
                  <FcGoogle size={33} /> Continue with Google
                </motion.button>

                <p className="text-[17px] text-[#64919b]/89 mt-7 sm:mt-4">
                  No accounts needed for npm.{" "}
                  <span
                    onClick={onClose}
                    className="text-[#3be8ff] border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors"
                  >
                    View Docx...
                  </span>{" "}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Auth;
