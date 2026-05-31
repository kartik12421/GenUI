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
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { ServerUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LiveComponentPreview from "../components/LiveComponentPreview";

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

function Toast({ message, type, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="fixed top-4 right-6 z-50 flex min-w-55 items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl"
        style={{
          background:
            type === "success"
              ? "#0d9f6e"
              : type === "error"
                ? "#e02424"
                : "#1c1c2e",
          color: "#fff",
        }}
      >
        {type === "success" ? (
          <FiCheckCircle size={18} />
        ) : (
          <FiAlertCircle size={18} />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto cursor-pointer text-white/60 transition-colors hover:text-white"
          type="button"
        >
          <TbX size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

function PropsInput({ props, setProps }) {
  const [input, setInput] = useState("");

  const addProps = () => {
    const trimmed = input.trim();
    if (trimmed && !props.includes(trimmed)) {
      setProps([...props, trimmed]);
    }
  };

  const addPropsFromInput = () => {
    const nextProps = input
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (nextProps.length === 0) return;

    setProps((current) => [...new Set([...current, ...nextProps])]);
    setInput("");
  };

  const removeProp = (propToRemove) => {
    setProps((current) => current.filter((prop) => prop !== propToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addPropsFromInput();
    }
  };

  return (
    <div className="rounded-[26px] border border-white/6 bg-[#091014] px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="mb-3 flex flex-wrap gap-2 min-h-7 items-center">
        {props.length === 0 && (
          <span className="text-[13px] text-white/28">No props added yet</span>
        )}
        {props.map((p) => (
          <span
            key={p}
            className="flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
            style={{
              background: "rgba(137, 92, 255, 0.14)",
              color: "#cdb7ff",
              borderColor: "rgba(167, 139, 250, 0.24)",
            }}
          >
            {p}
            <button
              onClick={() => {
                removeProp(p);
              }}
              className="border-none bg-transparent p-0 leading-none text-inherit opacity-65 transition-opacity hover:opacity-100 cursor-pointer"
            >
              <TbX size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g. "title", "onClick", "children"'
          className="min-w-0 flex-1 rounded-[18px] border border-white/6 bg-[#121a20] px-4 py-3 text-sm text-white placeholder-white/16 outline-none transition-colors focus:border-[#8d6bff]/55"
        />
        <button
          onClick={addPropsFromInput}
          className="px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all whitespace-nowrap"
          style={{
            background: "rgba(167,139,250,0.15)",
            color: "#a78bfa",
            border: "1px solid rgba(167,139,250,0.25)",
          }}
        >
          Add Props
        </button>
      </div>
      <p className="mt-2.5 text-[11px] text-white/22">
        Press{" "}
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
          Enter
        </span>{" "}
        or comma to add a prop
      </p>
    </div>
  );
}

function AddComponentForm() {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [props, setProps] = useState([]);
  const [code, setCode] = useState("");
  const [codeTab, setCodeTab] = useState("code");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [toast, setToast] = useState(null);
  const trimmedName = name.trim();
  const hasCode = Boolean(code.trim());
  const canSave = Boolean(trimmedName && hasCode);
  const canPublish =
    Boolean(savedId) && !isPublished && userData?.role === "admin";

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const resetSavedState = () => {
    setSavedId(null);
    setIsPublished(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (savedId || isPublished) resetSavedState();
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    if (savedId || isPublished) resetSavedState();
  };

  const handlePropsChange = (nextProps) => {
    setProps(nextProps);
    if (savedId || isPublished) resetSavedState();
  };

  const handleReset = () => {
    setName("");
    setProps([]);
    setCode("");
    setSavedId(null);
    setIsPublished(false);
    setPublishing(false);
    setCodeTab("code");
    setToast(null);
  };

  const handleSave = async () => {
    if (!canSave) {
      showToast("Add a component name and code first.", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post(
        ServerUrl + "/api/component/save",
        {
          name: trimmedName,
          code,
          props,
        },
        { withCredentials: true },
      );
      setSavedId(res.data._id);
      setIsPublished(false);
      showToast("Component saved successfully !", "success");
    } catch (error) {
      console.log(error);
      showToast("Component saved failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedId) return;
    if (userData?.role !== "admin") {
      showToast("Only admins can publish components.", "error");
      return;
    }

    setPublishing(true);
    try {
      await axios.post(
        ServerUrl + "/api/component/publish",
        {
          componentId: savedId,
        },
        { withCredentials: true },
      );
      setIsPublished(true);
      showToast("Published to npm successfully", "success");
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || "Published failed";
      showToast(message, "error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-5xl w-full mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="mb-5 rounded-[28px] border border-white/7 bg-white/2 p-4 sm:mb-6 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="mb-1 text-base font-bold sm:text-lg">
              Add Component
            </h2>
            <p className="text-sm text-white/35">
              Add components manually, document their props, preview the output,
              and save or publish when everything looks right.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="rounded-full border border-[#3be8ff]/18 bg-[#3be8ff]/10 px-3 py-1 text-[#8ee7ff]">
              Manual entry
            </span>
            <span className="rounded-full border border-[#a78bfa]/18 bg-[#a78bfa]/10 px-3 py-1 text-[#c9b3ff]">
              Live preview
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-5">
        <div className="space-y-4 sm:space-y-5">
        <div className="p-3.5 sm:p-4 rounded-2xl border border-white/7 bg-white/2 space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold text-white/50 uppercase tracking-wider block"
          >
            Component Name
          </label>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            id="name"
            placeholder='e.g. "PricingCard", "HeroSection"'
            className="w-full bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#3be8ff]/40 transition-colors"
          />
          <p className="text-[11px] text-white/24">
            Use the same PascalCase name that your React component exports.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Props
          </label>
          <PropsInput props={props} setProps={handlePropsChange} />
        </div>
        <div className="rounded-2xl border border-white/7 bg-white/2 overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-3 border-b border-white/6 sm:px-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                Component Code
              </label>
              <p className="mt-1 text-[11px] text-white/24">
                Paste the full component so preview and save stay in sync.
              </p>
            </div>
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              {["code", "preview"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCodeTab(tab)}
                  type="button"
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border-none cursor-pointer"
                  style={{
                    background:
                      codeTab === tab ? "rgba(59,232,255,0.2)" : "transparent",
                    color:
                      codeTab === tab ? "#3be8ff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {tab === "code" ? <TbCode size={14} /> : <TbEye size={14} />}
                  <span className="hidden xs:inline">{tab}</span>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            {codeTab === "code" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <textarea
                  value={code}
                  onChange={handleCodeChange}
                  rows={12}
                  placeholder={`export default function MyComponent({ title }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                  className="w-full bg-[#0d1117] px-4 sm:px-5 py-4 text-xs leading-relaxed text-green-300 font-mono resize-none outline-none placeholder-white/10"
                  style={{ minHeight: 260 }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3.5 sm:p-4"
              >
                {code.trim() ? (
                  <LiveComponentPreview code={code} />
                ) : (
                  <div className="h-36 sm:h-40 flex items-center justify-center text-white/20 text-sm rounded-xl border border-dashed border-white/8">
                    Paste some code first to see the preview
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1">
          <motion.button
            onClick={handleSave}
            disabled={saving || savedId}
            type="button"
            whileHover={
              saving || savedId
                ? undefined
                : { y: -1, boxShadow: "0 14px 28px rgba(59,232,255,0.14)" }
            }
            whileTap={{ scale: 0.95 }}
            className="inline-flex min-w-42 items-center justify-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all disabled:cursor-not-allowed disabled:opacity-80"
            style={{
              background: savedId
                ? "rgba(16, 185, 129, 0.16)"
                : "rgba(59, 232, 255, 0.12)",
              color: savedId ? "#34d399" : "#3be8ff",
              border: `1px solid ${
                savedId
                  ? "rgba(16, 185, 129, 0.34)"
                  : "rgba(59, 232, 255, 0.28)"
              }`,
              boxShadow: savedId
                ? "0 12px 28px rgba(16,185,129,0.12)"
                : "0 10px 24px rgba(59,232,255,0.08)",
            }}
          >
            {saving ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <TbDeviceFloppy size={17} />
              </motion.span>
            ) : (
              <span className="flex items-center justify-center rounded-full bg-black/10 p-1">
                <TbDeviceFloppy size={15} />
              </span>
            )}
            <span>
              {saving ? "Saving..." : savedId ? "Saved" : "Save Component"}
            </span>
          </motion.button>
          <AnimatePresence>
            {savedId && !isPublished && (
              <motion.button
                onClick={handlePublish}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                whileTap={{ scale: 0.95 }}
                disabled={publishing || !canPublish}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all border-none cursor-pointer text-white ${
                  publishing
                    ? "shadow-none"
                    : "shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                }`}
                style={{
                  background:
                    userData?.role === "admin"
                      ? "linear-gradient(to bottom right, #06b6d4, #0891b2)"
                      : "rgba(255,255,255,0.06)",
                }}
              >
                {publishing ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <TbLoader size={15} />
                  </motion.span>
                ) : (
                  <TbUpload size={15} />
                )}
                {publishing
                  ? "Publishing..."
                  : userData?.role === "admin"
                    ? "Publish to npm"
                    : "Admin only"}
              </motion.button>
            )}

            {isPublished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#34d399",
                }}
              >
                <FiCheckCircle size={14} />
                Published
              </motion.div>
            )}
          </AnimatePresence>

          {(savedId || name || code || props.length > 0) && (
            <button
              onClick={handleReset}
              type="button"
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all bg-transparent border-none cursor-pointer"
            >
              <TbTrash size={13} /> Reset
            </button>
          )}
        </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/7 bg-white/2 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Readiness
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Name added",
                  ready: Boolean(trimmedName),
                  hint: "Give the component a clear exported name.",
                },
                {
                  label: "Code pasted",
                  ready: hasCode,
                  hint: "Preview depends on valid React component code.",
                },
                {
                  label: "Props documented",
                  ready: props.length > 0,
                  hint: "Optional, but useful for discoverability.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/6 bg-[#091014] p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white/80">
                      {item.label}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{
                        background: item.ready
                          ? "rgba(16,185,129,0.12)"
                          : "rgba(255,255,255,0.06)",
                        color: item.ready
                          ? "#34d399"
                          : "rgba(255,255,255,0.45)",
                        border: `1px solid ${
                          item.ready
                            ? "rgba(16,185,129,0.24)"
                            : "rgba(255,255,255,0.08)"
                        }`,
                      }}
                    >
                      {item.ready ? "Ready" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/28">
                    {item.hint}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/7 bg-white/2 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Snapshot
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/6 bg-[#091014] p-3">
                <p className="text-white/35">Current name</p>
                <p className="mt-1 font-semibold text-white">
                  {trimmedName || "Untitled component"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/6 bg-[#091014] p-3">
                  <p className="text-white/35">Props</p>
                  <p className="mt-1 text-lg font-bold text-[#c9b3ff]">
                    {props.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/6 bg-[#091014] p-3">
                  <p className="text-white/35">Status</p>
                  <p className="mt-1 font-semibold text-white">
                    {isPublished ? "Published" : savedId ? "Saved" : "Draft"}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/6 bg-[#091014] p-3">
                <p className="text-white/35">Next step</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/65">
                  {!canSave
                    ? "Add a component name and valid code to unlock saving."
                    : !savedId
                      ? "Save the component to create a reusable library record."
                      : !isPublished && userData?.role === "admin"
                        ? "Publish it when you're ready to make it public."
                        : !isPublished
                          ? "An admin can publish this after it has been saved."
                          : "This component is already saved and published."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

  const last30Days = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (29 - index));

    const dateKey = date.toISOString().slice(0, 10);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return { dateKey, label };
  });

  const chartData = publicComponents.reduce((result, component) => {
    if (!component.createdAt) return result;

    const createdAt = new Date(component.createdAt);
    createdAt.setHours(0, 0, 0, 0);
    const dateKey = createdAt.toISOString().slice(0, 10);

    result[dateKey] = (result[dateKey] || 0) + 1;
    return result;
  }, {});

  const formattedChartData = last30Days.map(({ dateKey, label }) => ({
    date: label,
    dateKey,
    components: chartData[dateKey] || 0,
  }));

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

  const getSmoothLinePath = (points) => {
    if (points.length === 0) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    return points.reduce((path, point, index, currentPoints) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previousPoint = currentPoints[index - 1];
      const controlX = (previousPoint.x + point.x) / 2;

      return `${path} C ${controlX} ${previousPoint.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, "");
  };

  const linePath = getSmoothLinePath(chartPoints);

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
                    Last 30 days
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
                className="rounded-2xl border border-white/7 bg-white/2 overflow-hidden"
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
                      className="absolute left-3 top-2.5 text-white/30 pointer-events-none"
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
                                  <span className="p-1.5 py-0.5 rounded-md text-[10px] text-white/25">
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
                            <TbWorld size={16} />
                            public
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* add components */}
          {activeView === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AddComponentForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Admin;
