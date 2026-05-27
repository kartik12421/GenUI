import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbUsers,
  TbCode,
  TbLogout,
  TbPlus,
  TbLayoutDashboard,
  TbPackage,
  TbX,
  TbTrash,
  TbDeviceFloppy,
  TbUpload,
  TbEye,
  TbCodeDots,
  TbLoader,
  TbMenu2,
  TbChevronLeft,
  TbWorld,
  TbSearch,
  TbBoxOff,
} from "react-icons/tb";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { ServerUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-32 rounded-2xl border border-white/8 bg-[#091317]/92 px-4 py-3 text-xs shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <p className="mb-1 text-white/40">{label}</p>
      <p className="font-semibold text-[#b794ff]">
        {payload[0].value} components
      </p>
    </div>
  );
}

function ToolTip(props) {
  return <CustomTooltip {...props} />;
}

function Admin() {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentSearch, setComponentSearch] = useState("");
  const { userData, allUsers, allComponents } = useSelector((s) => s.user);
  const publicComponents =
    allComponents?.filter((c) => c.visibility === "public") || [];
  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Component", Icon: TbPackage },
  ];

  const stats = [
    {
      label: "Total Users",
      value: allUsers?.length || 0,
      icon: TbUsers,
      color: "#3be8ff",
    },
    {
      label: "Components Made",
      value: publicComponents?.length || 0,
      icon: TbCode,
      color: "#a78bfa",
    },
  ];

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter(
        (c) =>
          c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
          c.props?.some((p) =>
            p.toLowerCase().includes(componentSearch.toLowerCase()),
          ),
      )
    : publicComponents;

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
  };

  const chartData = publicComponents.reduce((result, component) => {
    const raw = component.createdAt;
    if (!raw) return result;

    const label = new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    result[label] = (result[label] || 0) + 1;
    return result;
  }, {});

  const formattedChartData = Object.entries(chartData)
    .map(([date, count]) => ({ date, components: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-12);

  const chartHeight = 220;
  const chartWidth = 720;
  const chartPadding = { top: 18, right: 18, bottom: 38, left: 18 };
  const maxComponents = Math.max(
    ...formattedChartData.map((item) => item.components),
    1,
  );
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right;
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const pointGap =
    formattedChartData.length > 1
      ? innerWidth / (formattedChartData.length - 1)
      : 0;

  const chartPoints = formattedChartData.map((item, index) => {
    const x = chartPadding.left + pointGap * index;
    const y =
      chartPadding.top +
      innerHeight -
      (item.components / maxComponents) * innerHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = chartPoints.length
    ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${
        chartHeight - chartPadding.bottom
      } L ${chartPoints[0].x} ${chartHeight - chartPadding.bottom} Z`
    : "";

  const SideBarContent = () => (
    <>
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/7">
        <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] shrink-0">
          <TbCircleLetterGFilled size={18} color="#051c20" />
        </div>
        <div>
          <span className="text-base font-bold block">GenUI</span>
          <span className="text-[10px] text-[#3be8ff]/60 font-semibold tracking-[2px] uppercase">
            Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
        >
          <TbChevronLeft size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer text-left"
              style={{
                background: isActive ? "rgba(59,232,255,0.08)" : "transparent",
                color: isActive ? "#3be8ff" : "rgba(255,255,255,0.45)",
                borderLeft: isActive
                  ? "2px solid #3be8ff"
                  : "2px solid transparent",
              }}
            >
              <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer bg-transparent border-none text-left"
        >
          <TbLogout size={17} />
          LogOut
        </button>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/6 fixed top-0 left-0 z-20">
        <SideBarContent />
      </aside>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen bg-[#040e11] border-r border-white/6 md:hidden"
            >
              <SideBarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* main area */}

      <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto">
        <div className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all shrink-0"
            >
              <TbMenu2 size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-large font-bold truncate">
                {activeView === "dashboard" ? "Dashboard" : "Add Components"}
              </h1>
              <p className="text-white/35 text-xs truncate">
                Welcome back, {userData?.name || "Admin"}
              </p>
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate("/generate")}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#030b0d] bg-linear-to-r from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none shrink-0"
          >
            <TbPlus size={18} />
            <span className="hidden sm:inline">AI Components</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6"
            >
              {/* stats */}

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map(({ label, value, icon: Icon, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.05 }}
                    className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/2 hover:border-white/12 transition-all"
                  >
                    <div className="mb-2.5 sm:mb-3">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${color}15`,
                          border: `1px solid ${color}25`,
                        }}
                      >
                        <Icon size={17} style={{ color }} />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold">
                        {value.toLocaleString()}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* chart */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="rounded-[28px] border border-white/6 bg-[#071014]/95 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      Public Components Published
                    </p>
                    <p className="mt-0.5 text-xs text-white/25">
                      Date-wise breakdown
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#a78bfa]/12 bg-[#a78bfa]/10 px-2.5 py-1 text-[10px] font-semibold text-[#c5a7ff]">
                    Last 12 days
                  </span>
                </div>

                {formattedChartData.length === 0 ? (
                  <div className="h-45 sm:h-55 flex items-center justify-center text-white/20 text-sm">
                    No public components yet
                  </div>
                ) : (
                  <div className="relative w-full overflow-y-visible pt-12">
                    <div className="pointer-events-none absolute inset-x-6 top-12 h-24 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.16),transparent_72%)] blur-2xl" />
                    <div className="relative w-full">
                      <div
                        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full transition-opacity duration-150"
                        style={{
                          left: hoveredPoint?.x ?? 0,
                          top: hoveredPoint ? hoveredPoint.y - 10 : 0,
                          opacity: hoveredPoint ? 1 : 0,
                        }}
                      >
                        <ToolTip
                          active={Boolean(hoveredPoint)}
                          label={hoveredPoint?.date}
                          payload={
                            hoveredPoint
                              ? [{ value: hoveredPoint.components }]
                              : []
                          }
                        />
                      </div>
                      <svg
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        preserveAspectRatio="none"
                        className="h-55 w-full"
                        role="img"
                        aria-label="Public components published over time"
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <defs>
                          <linearGradient
                            id="componentGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#a78bfa"
                              stopOpacity="0.24"
                            />
                            <stop
                              offset="100%"
                              stopColor="#a78bfa"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {[0, 0.33, 0.66, 1].map((step) => {
                          const y = chartPadding.top + innerHeight * step;
                          return (
                            <line
                              key={step}
                              x1={chartPadding.left}
                              y1={y}
                              x2={chartWidth - chartPadding.right}
                              y2={y}
                              stroke="rgba(255,255,255,0.04)"
                            />
                          );
                        })}

                        {areaPath && (
                          <path d={areaPath} fill="url(#componentGradient)" />
                        )}
                        {linePath && (
                          <path
                            d={linePath}
                            fill="none"
                            stroke="#b794ff"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        )}

                        {chartPoints.map((point, index) => (
                          <g key={point.date}>
                            {(hoveredPoint?.date === point.date ||
                              index === chartPoints.length - 1) && (
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="3.5"
                                fill="#8ee7ff"
                              />
                            )}
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="14"
                              fill="transparent"
                              onMouseEnter={() => setHoveredPoint(point)}
                              onMouseMove={() => setHoveredPoint(point)}
                            />
                            <text
                              x={point.x}
                              y={chartHeight - 10}
                              textAnchor="middle"
                              fill="rgba(255,255,255,0.22)"
                              fontSize="10"
                            >
                              {point.date}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* public components */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-2xl border border-white/7 bg-white/2overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(59,232,255,0.1)",
                        border: "1px solid rgba(59,232,255,0.2)",
                      }}
                    >
                      <TbWorld size={17} style={{ color: "#3be8ff" }} />
                    </div>

                    <div>
                      <p className="font-semibold text-sm">Public Components</p>
                      <p className="text-white/35 text-[11px]">
                        {publicComponents.length} components visible to all
                        users
                      </p>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-48">
                    <TbSearch
                      size={13}
                      className="absolute left-3 top-2.5 text-white/30 pointer-event-none"
                    />
                    <input
                      value={componentSearch}
                      onChange={(e) => setComponentSearch(e.target.value)}
                      placeholder="Search components..."
                      className="w-full bg-white/4 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#3be8ff]/40 transition-colors"
                    />
                  </div>
                </div>

                {filteredPublicComponents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/20">
                    <TbBoxOff size={32} />
                    <p className="text-sm">
                      {componentSearch
                        ? "No components match your search"
                        : "No public components yet"}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/4">
                    {filteredPublicComponents.map((c, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/2 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
                            style={{
                              background: "rgba(167,139,250,0.1)",
                              border: "1px solid rgba(167,139,250,0.2)",
                            }}
                          >
                            <TbCode size={15} style={{ color: "#a78bfa" }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {c.name}
                            </p>
                            {c.props?.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {c.props.slice(0, 4).map((p) => (
                                  <div
                                    key={p}
                                    className="px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                                    style={{
                                      background: "rgba(167,139,250,0.1)",
                                      color: "rgba(167,139,250,0.7)",
                                    }}
                                  >
                                    {p}
                                  </div>
                                ))}
                                {c.props?.length > 4 && (
                                  <span className="p-1.5 py-0.5 rounded-md text-{10px} text-white/25">
                                    +{c.props.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                          <span className="text-[11px] text-white/25 whitespace-nowrap">
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              background: "rgba(59,232,255,0.08)",
                              color: "#3be8ff",
                              border: "1px solid rgba(59,232,255,0.2)",
                            }}
                          >
                            <TbWorld size={16}/>public
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Admin;
