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
            <span className="text-lg font-bold tracking-tight">GenUI</span>
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
          </motion.div>
        </motion.div>
      </section>

      {/* <button className="bg-black text-white p-4" onClick={() => { setShowAuth(true) }}>Open</button> */}

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
