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
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      onClose();
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
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ duration: 0.8 }}
          className="relative flex max-h-[calc(100vh-24px)] w-full max-w-260 flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-[#343434]/90 shadow-[0_40px_100px_rgba(0,0,0,0.85)] sm:max-h-[calc(100vh-32px)] md:min-h-150 md:flex-row"
        >
          {/* x button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/70 transition-all hover:bg-white/15 hover:text-white sm:top-4 sm:right-4 sm:h-10 sm:w-10"
          >
            <TbX size={19}></TbX>
          </button>

          {/* left div */}
          <div className="relative w-full overflow-hidden bg-linear-to-br from-[#021719] to-[#04282f] p-5 sm:p-8 md:w-[52%] md:p-12">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)]"></div>

            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex items-center gap-3 sm:mb-9 sm:gap-4 md:mb-10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] shadow-[0_0_18px_rgba(59,232,255,0.35)] sm:h-12 sm:w-12">
                <TbCircleLetterGFilled size={37} color="#051c20" />
              </div>
              <span
                className="text-xl font-bold tracking-tight text-white sm:text-2xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                GenUI
              </span>
            </motion.div>

            <p className="mb-4 text-xs font-semibold tracking-[3px] text-[#3be8ff] uppercase sm:mb-6">
              How it works
            </p>

            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 md:flex-col md:overflow-x-visible md:pb-0">
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
                    className={`flex min-w-58 shrink-0 items-start gap-3 rounded-xl border px-3.5 py-3 transition-all duration-300 sm:min-w-62 sm:gap-4 sm:px-4 sm:py-3.5 md:min-w-0 md:shrink ${active === i ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20" : "bg-transparent border-transparent"}`}
                  >
                    <div
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg border transition-all duration-300 ${active === i ? "bg-linear-to-br from-[#3be8ff] to-[#0ab8d6] border-transparent text-[#051c20]" : "bg-[#3be8ff]/8 border-[#3be8ff]/20 text-[#3be8ff]"}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white sm:text-base">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">
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
            className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#040f12] px-5 py-8 sm:px-8 sm:py-10 md:w-[48%] md:px-12 md:py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-size-[32px_32px]"></div>
            <div className="relative z-10 w-full max-w-82 text-center mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: easeInOut,
                }}
                className="relative mx-auto mb-5 h-14 w-14 rounded-2xl border border-[#3be8ff]/20 bg-linear-to-br from-[#3be8ff]/15 to-[#040f12] sm:mb-7 sm:h-18 sm:w-18"
              >
                <TbCircleLetterGFilled
                  className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
                  size={36}
                  color="#3be8ff"
                />
              </motion.div>
              <h3
                className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                welcome
              </h3>
              <p className="mb-5 text-base leading-relaxed text-[#96bec8]/55 sm:mb-7 sm:text-[20px]">
                Sign in to generate your AI powered components in seconds
              </p>

              <div className="mb-7 flex justify-center gap-3 sm:mb-10 sm:gap-5">
                {stats.map(([v, l], i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-[#3be8ff]">{v}</div>
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
                className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-none bg-white py-3 text-base font-bold text-[#0a1a1d] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] sm:py-3.5 sm:text-xl"
              >
                <FcGoogle size={33} /> Continue with Google
              </motion.button>

              <p className="mt-5 text-sm text-[#64919b]/89 sm:mt-4 sm:text-[17px]">
                No accounts needed for npm.{" "}
                <span
                  onClick={onClose}
                  className="text-[#3be8ff] border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors"
                >
                  View Docx...
                </span>{" "}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Auth;
