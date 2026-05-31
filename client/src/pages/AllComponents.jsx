import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbCode,
  TbEye,
  TbBox,
  TbCopy,
  TbCheck,
  TbPackage,
  TbBrandNpm,
  TbChevronRight,
  TbSearch,
  TbLayoutSidebarLeftExpand,
  TbX,
  TbMenu2,
} from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { ServerUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SidebarCompnent({
  publicComponents,
  selected,
  onSelect,
  search,
  setSearch,
}) {
  return (
    <>
      {/* search */}
      <div className="px-3 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 border border-white/6">
          <TbSearch size={15} className="text-white/25 shrink-0" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className="bg-transparent text-xs text-white/70 palceholder-white/20 outline-none w-full"
          />
        </div>
      </div>

      <div className="px-4 pt-3 pb-1.5">
        <p className="text-[9px] font-bold tracking-[2.5px] uppercase text-white/40">
          Public - {publicComponents.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-1 px-2">
        {publicComponents.length === 0 ? (
          <p className="text-white/20 text-xs text-center py-8 px-3">
            Currently no public components available
          </p>
        ) : (
          publicComponents.map((c) => (
            <button
              onClick={() => onSelect(c)}
              key={c._id}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer border text-left mb-0.5 ${
                selected?._id === c._id
                  ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/18 text-[#3be8ff]"
                  : "bg-transparent border-transparent text-white/50"
              }`}
            >
              <span className="truncate font-medium text-xs">{c.name}</span>
              {selected?._id === c._id && (
                <TbChevronRight size={15} className="shrink-0 ml-1" />
              )}
            </button>
          ))
        )}
      </div>
    </>
  );
}

function AllComponents() {
  const { allComponents } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const publicComponents = (allComponents || [])
    .filter((c) => c.visibility === "public")
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const handleSelect = (c) => {
    setSelected(c);
    setSidebarOpen(false);
  };
  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white flex flex-col overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* navbar */}

      <nav className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/5 bg-[#030b0d]/90 backdrop-blur-md shrink-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 sm:gap:2.5 bg-transparent border-none curser-pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.35)]">
            <TbCircleLetterGFilled size={17} color="#051c20" />
          </div>
          <span
            className="text-sm sm:text-base font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            GenUI
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/30">
            <TbLayoutSidebarLeftExpand size={16} />
            <span>Explorer</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/4 border border-white/8 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          >
            <TbMenu2 size={18} />
          </button>
        </div>
      </nav>

      {/* sidebar */}

      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 57px)" }}
      >
        <aside className="hidden sm:flex w-52 md:w-56 shrink-0 flex-col border-r border-white/6 bg-[#040e11] overflow-hidden">
          <SidebarCompnent
            selected={selected}
            search={search}
            setSearch={setSearch}
            publicComponents={publicComponents}
            onSelect={handleSelect}
          />
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSidebarOpen(false)}
                className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="sm:hidden fixed top-0 left-0 z-60 h-full w-72 flex flex-col bg-[#040e11] border-r border-white/8"
              >
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/6">
                  <span className="text-xs font-bold text-white/40 tracking-widest uppercase">
                    Components
                  </span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/6 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <TbX size={15} />
                  </button>
                </div>

                <SidebarCompnent
                  selected={selected}
                  search={search}
                  setSearch={setSearch}
                  publicComponents={publicComponents}
                  onSelect={handleSelect}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AllComponents;
