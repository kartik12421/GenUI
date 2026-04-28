import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { TbX } from "react-icons/tb";

function Auth() {
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
          transition={{duration: 0.8}}

          className="relative flex w-full max-w-220 min-h-62.5 overflow-hidden rounded-2xl border border-white/10 bg-[#343434]/90 shadow-[0_40px_100px_rgba(0,0,0,0.85)]"
        >
          {/* x button */}
          <button className="absolute top-3 right-3 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white">
            <TbX size={15}></TbX>
          </button>

          {/* left div */}
          <div className="relative w-[52%] overflow-hidden bg-linear-to-br from-[#021719] to-[#04282f] p-6 sm:p-10">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
          </div>

          {/* right div */}
          <motion.div className="flex-1 bg-white/5 p-6 sm:p-10"></motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Auth;
