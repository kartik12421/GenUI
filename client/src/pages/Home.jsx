import React, { useState } from "react";
import Auth from "../components/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import { HiSparkles } from "react-icons/hi2";
import {
  TbArrowRight,
  TbBrandNpm,
  TbCode,
  TbLayout,
  TbAdjustments,
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbMenu2,
  TbX,
  TbLogout,
  TbComponents,
} from "react-icons/tb";
import { ServerUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: TbLayout,
    title: "Prebuilt UI Components",
    text: "Install VirtualUI and use ready-made, production-grade components instantly.",
  },
  {
    icon: HiSparkles,
    title: "AI Component Generator",
    text: "Describe your UI in plain English and generate React components in seconds.",
  },
  {
    icon: TbAdjustments,
    title: "Customizable Props",
    text: "Modify component props and preview changes in real-time without rebuilding.",
  },
  {
    icon: TbCode,
    title: "Clean JSX Code",
    text: "Copy production-ready JSX directly into your project — zero boilerplate.",
  },
  {
    icon: TbBrandNpm,
    title: "NPM Library",
    text: "Import VirtualUI components with a simple npm install command.",
  },
  {
    icon: TbPlayerPlay,
    title: "Live Preview",
    text: "Instantly preview AI-generated components before exporting your code.",
  },
];

const steps = [
  {
    n: "01",
    title: "Install Library",
    text: "npm install genui-library to access all prebuilt UI components.",
  },
  {
    n: "02",
    title: "Use Components",
    text: "Import and customize with props for any design requirement.",
  },
  {
    n: "03",
    title: "Generate with AI",
    text: "Describe your UI and let AI build the component for you.",
  },
  {
    n: "04",
    title: "Copy & Use",
    text: "Paste the clean JSX code straight into your project.",
  },
];

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLetters = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogOut = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setProfileOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install genui-library");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleGenerateAiComponentsClick = () => {
    if (userData) {
      navigate("/generate");
    } else {
      setShowAuth(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white overflow-x-hidden "
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px,transparent_1px)] bg-size-[26px_26px]"></div>
      <div className="pointer-events-none fixed top-0 left-1/2 z-0 h-64 w-[min(700px,100vw)] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)]"></div>

      <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#030b0d]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] shadow-[0_0_14px_rgba(59,232,255,0.4)]">
              <TbCircleLetterGFilled size={15} color="#051c20" />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              GenUI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl border border-white/15 bg-transparent px-6 py-2.5 text-sm text-white/70 transition-colors duration-200 hover:border-white/25 hover:text-white md:block">
              Components
            </button>

            {userData ? (
              <div className="relative hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3.5 bg-white/6 border border-white/10 hover:border-[#3be8ff]/30 px-3 py-1 rounded-xl transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold">
                    {getLetters(userData.name)}
                  </div>
                  <span className="text-white/80 text-sm font-medium max-w-25 truncate">
                    {userData.name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-12 w-52 bg-[#0a1a1e] border border-white/9 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                    >
                      <div className="px-4 py-3.5 border-b border-white/[0.07]">
                        <p className="text-white/90 font-semibold text-sm truncate">
                          {userData.name}
                        </p>

                        <p className="text-white/40 text-xs truncate mt-0.5">
                          {userData.email}
                        </p>
                      </div>

                      <div className="py-1.5 ">
                        <button
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/4 transition-colors cursor-pointer bg-transparent border-none text-left"
                        >
                          <TbComponents
                            size={15}
                            className="text-[#3be8ff]/70"
                          />{" "}
                          My Components
                        </button>
                      </div>

                      <div className="border-t border-white/[0.07] py-1.5">
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/6 transition-colors cursor-pointer bg-transparent border-none text-left"
                        >
                          <TbLogout size={16}></TbLogout>Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.25)] hover:shadow-[0_0_30px_rgba(59,232,255,0.4)] transition-shadow text-nowrap"
              >
                <HiSparkles size={14} /> Generate AI Components
              </motion.button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer border-none bg-transparent text-white/60 transition-colors hover:text-white md:hidden"
            >
              {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden sticky top-16.25 z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex flex-col gap-3"
          >
            <button className="rounded-xl border border-white/15 bg-transparent px-6 py-2.5 text-sm text-white/70 transition-colors duration-200 hover:border-white/25 hover:text-white">
              Components
            </button>

            {userData ? (
              <>
                <div className="flex items-center gap-2.5 py-2 border-t border-white/[0.07]">
                  <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold">
                    {getLetters(userData.name)}
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {userData.name}
                  </span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors py-1 bg-transparent border-none cursor-pointer text-left"
                >
                  <TbComponents size={16} className="text-[#3be8ff]/70" /> My
                  Components
                </button>

                <button
                  onClick={() => {
                    handleLogOut();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-red-400/80 hover:text-red-400 transition-colors py-1 bg-transparent border-none cursor-pointer text-left"
                >
                  <TbLogout size={16} /> LogOut
                </button>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* hero section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/5 rounded-full px-4 py-1.5 mb-6 sm:mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#3be8ff] animate-pulse" />{" "}
          AI powered React UI Library
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.6 }}
          className="text-4xl sm:text:5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 sm:mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Build React UI <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3be8ff] to-[#0ab5d4]">
            Faster With AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.21, duration: 0.6 }}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-light px-2"
        >
          Use prebuild GenUI components or generate custom ones with AI. Copy
          clean JSX directly into your projects in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.29, duration: 0.6 }}
          className="mb-7 flex flex-col items-center justify-center gap-4 px-3 sm:mb-8"
        >
          <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3.5 font-mono text-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:max-w-fit sm:px-5 sm:py-3 sm:text-sm">
            <span className="text-[#3be8ff]/60">$</span>
            <span className="min-w-0 flex-1 truncate text-left text-white/80">
              npm install genui-library
            </span>
            <button
              onClick={handleCopy}
              className="ml-2 shrink-0 cursor-pointer border-none bg-transparent text-white/30 transition-colors hover:text-[#3be8ff]"
            >
              {copied ? (
                <TbCheck size={15} className="text-[#3be8ff]" />
              ) : (
                <TbCopy size={15} />
              )}
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto"
            >
              Get Started <TbArrowRight size={15} />
            </motion.button>

            <motion.button
              onClick={handleGenerateAiComponentsClick}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent w-full sm:w-auto"
            >
              <HiSparkles size={14} />
              Generate AI Components
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 33 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07, duration: 0.7 }}
          className="mt-12 sm:mt-16 mx-auto max-w-2xl bg-[#0a1a1e]/80 border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-x-auto"
        >
          {/* mac style */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[11px] text-white/20 font-mono">
              App.jsx
            </span>
          </div>

          <div className="font-mono text-[11px] sm:text-[12.5px] leading-6 space-y-0.6 min-w-70">
            <p>
              <span className="text-[#3be8ff]/60">import </span>
              <span className="text-white/80">{"{ Card, Button}"} </span>
              <span className="text-[#3be8ff]/80">from </span>
              <span className="text-[#aaff80]/70">genui-library</span>
              <span className="text-white/30">;</span>
            </p>
            <p> </p>

            <p>
              <span className="text-[#3be8ff]/60">export default function</span>{" "}
              <span className="text-[#ffd580]/80">App</span>
              <span className="text-white/50">(){" {"}</span>
            </p>

            <p>
              <span className="text-white/30">{" return ("}</span>
            </p>

            <p>
              <span className="text-white/30">{"<"}</span>
              <span className="text-[#3be8ff]/70">Card</span>{" "}
              <span className="text-[#aaff80]/60">title</span>{" "}
              <span className="text-white/30">{"="}</span>
              <span className="text-[#aaff80]/70">{'"Dashboard"'}</span>
              <span className="text-white/30">{">"}</span>
            </p>

            <p>
              <span className="text-white/30">{"   <"}</span>
              <span className="text-[#3be8ff]/70">Button</span>{" "}
              <span className="text-[#aaff80]/60">text</span>{" "}
              <span className="text-white/30">{"="}</span>
              <span className="text-[#aaff80]/70">{'"hello"'}</span>
              <span className="text-white/30">{" />"}</span>
            </p>

            <p>
              <span className="text-white/30">{"  <"}</span>
              <span className="text-[#3be8ff]/70">Card</span>
              <span className="text-white/30">{" />"}</span>
            </p>

            <p>
              <span className="text-white/30">{"  );"}</span>
            </p>
            <p>
              <span className="text-white/50">{"}"}</span>
            </p>
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-0 py-10 sm:py-24">
        <motion.div
          initial={{ opactity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.57 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3">
            What's inside
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sens-serif" }}
          >
            Everything you need
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((items, i) => (
            <motion.div
              key={i}
              initial={{ opactity: 0, y: 21 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.57 }}
              className="group p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-white/2 hover:bg-[#3be8ff]/04 hover:border-[#3be8ff]/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#3be8ff]/8 border border-[#3be8ff]/15 flex items-center justify-center mb-4 group-hover:bg-[#3be8ff]/15 transition-colors">
                <items.icon size={18} className="text-[#3be8ff]" />
              </div>
              <h3 className="font-semibold text-white/90 text-[15px]">
                {items.title}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed">
                {items.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opactity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.57 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3">
            Simple process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sens-serif" }}
          >
            how it works
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-[#3be8ff]/20 to-transparent" />

          {steps.map((items, i) => (
            <motion.div
              key={i}
              className="relative text-center group"
              initial={{ opactity: 0, y: 21 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.16, duration: 0.57 }}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-linear-to-br from-[#0e2528] to-[#071518] border border-[#3be8ff]/20 flex items-center justify-center overflow-hidden group-hover:border-[#3be8ff]/40 group-hover:shadow-[0_0_20px_rgba(59,232,255,0.1)] transition-all duration-300">
                <span className="absolute text-l sm:text-3xl text-[#3be8ff]/60 font-black tracking-tighter select-none">
                  {items.n}
                </span>
              </div>

              <h3 className="font-semibold text-white/90 mb-2 text-[13px] sm:text-[14px]">
                {items.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed">
                {items.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.63 }}
          className="relative rounded-2xl sm:rounded-3xl border border-[#3be8ff]/15 bg-linear-to-br from-[#071518] to-[#040f12] p-8 sm:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,232,255,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 sm:mb-4">
              Start building
            </p>
            <h3
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ fontFamily: "'Syne', sens-serif" }}
            >
              Ready to generate
              <br />
              your new components ?
            </h3>

            {userData ? (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
                  Welcome back,{" "}
                  <span className="text-[#3be8ff]/70">{userData.name}</span>!
                  Continue building amazing components.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow"
                  >
                    <HiSparkles size={14} />
                    Generate AI Components
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent"
                  >
                    <TbComponents size={15} className="text-[#3be8ff]/70" /> My
                    Components
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mz-auto leading-relaxed">
                  Sign in with google and get 150 free AI credits, and start
                  generating production-ready UI components instantly.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    onClick={() => setShowAuth(true)}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow"
                  >
                    <HiSparkles size={14} />
                    Get started for free
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent"
                  >
                    <TbComponents size={15} className="text-[#3be8ff]/70" />{" "}
                    Components
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] shadow-[0_0_14px_rgba(59,232,255,0.4)]">
                <TbCircleLetterGFilled size={15} color="#051c20" />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                GenUI
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-xs text-white/30">
            <span className="hover:text-white/60 transition-color">
              Components
            </span>
            <span className="hover:text-white/60 transition-color">
              kartikjoshi842@gmail.com
            </span>
          </div>
          <p className="text-xs text-white/25 order-last sm:order-0">
            © {new Date().getFullYear()} GenUI. All rights reserved.
          </p>
        </div>
      </footer>

      
      {showAuth && (
        <Auth
          onClose={() => {
            setShowAuth(false);
          }}
        ></Auth>
      )}
    </div>
  );
}

export default Home;
