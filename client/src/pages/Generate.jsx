import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import {
  FiZap,
  FiSave,
  FiEye,
  FiCode,
  FiUploadCloud,
  FiArrowRight,
  FiLoader,
  FiPackage,
  FiAlertCircle,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiArrowLeft,
  FiRefreshCw,
  FiPlus,
} from "react-icons/fi";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import LiveComponentPreview from "../components/LiveComponentPreview";

const Toast = ({ message, type, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="fixed top-4 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
        style={{
          background:
            type === "success"
              ? "#0d9f6e"
              : type === "error"
                ? "#e02424"
                : "#1c1c2e",
          color: "#fff",
          minWidth: "220px",
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
          className="ml-auto text-white/60 hover:text-white text-xs"
        >
          <TbX size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

function Generate() {
  const { userData } = useSelector((state) => state.user);
  const userRole = userData?.role;
  const aiCredits = userData?.aiCredits;
  const lowCredits = userRole === "user" && aiCredits <= 50;
  const navigate = useNavigate();
  const [prompt, setprompt] = useState("");
  const [generate, setGenerate] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("preview");
  const [savedComponentId, setSavedComponentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || lowCredits) return;
    setGenerate(null);
    setGenerating(true);
    try {
      const { data } = await axios.post(
        ServerUrl + "/api/component/generate",
        { prompt },
        { withCredentials: true },
      );
      // console.log(data.parsed);
      setGenerate(data.parsed);
      dispatch(
        setUserData({
          ...userData,
          aiCredits: data.remainingCredits,
        }),
      );
      setGenerating(false);
      showToast("AI Component Generated", "success");
    } catch (error) {
      showToast("Generating Error", "error");
      setGenerating(false);
    }
  };

  const handleCtrlEnter = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  const handleSave = async () => {
    if (!generate) return;
    setSaving(true);
    try {
      const res = await axios.post(
        ServerUrl + "/api/component/save",
        {
          name: generate.name,
          code: generate.code,
          props: generate.props,
        },
        { withCredentials: true },
      );
      setSavedComponentId(res.data._id);
      showToast("Component saved successfully !", "success");
      setSaving(false);
    } catch (error) {
      showToast("Component saved failed", "error");
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedComponentId) return;
    setPublishing(true);
    try {
      await axios.post(
        ServerUrl + "/api/component/publish",
        {
          componentId: savedComponentId,
        },
        {
          withCredentials: true,
        },
      );

      setPublished(true);
      showToast("Published to npm successfully", "success");
      setPublishing(false);
    } catch (error) {
      showToast("Published failed", "error");
      setPublishing(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
      }}
    >
      <div
        className="absolute insert-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none opacity-16"
        style={{
          background: "radial-gradient(circle, #06b684 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          className="text-center mb-7 md:mb-8"
          initial={{ opacity: 0, y: -17 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py: 2 rounded-full mb-4"
            style={{
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
            }}
          >
            <FiCpu size={14} className="text-indigo-400" />
            <span className="text-s font-semibold tracking-widest text-indigo-300 uppercase">
              AI Componenet Studio
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-2 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="text-white">Build with </span>
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI
            </span>
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-md mx-auto">
            Describe your React Componenet in plane English. Preview, save, and
            publish - all in one place.
          </p>
        </motion.div>

        {userRole === "user" && (
          <motion.div
            className="flex justify-end mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{
                background: lowCredits
                  ? "rgba(239,68,68,0.1)"
                  : "rgba(99,102,241,0.1)",
                border: `1px solid ${lowCredits ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.25)"}`,
              }}
            >
              <FiZap
                size={14}
                style={{ color: lowCredits ? "#fb7171" : "#818cf8" }}
              />
              <span
                style={{ color: lowCredits ? "#fb7171" : "#818cf8" }}
                className="text-s font-semibold"
              >
                {aiCredits} AI Credits
              </span>
              <button
                className="flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none"
                style={{
                  background: lowCredits
                    ? "rgba(239,68,68,0.2)"
                    : "rgba(99,102,241,0.2)",
                }}
                onClick={() => navigate("/pricing")}
              >
                <FiPlus
                  size={12}
                  style={{ color: lowCredits ? "#f87171" : "#818cf8" }}
                />
              </button>
            </div>
          </motion.div>
        )}

        {lowCredits && (
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-4"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba((239, 68, 68, 0.2)",
            }}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiAlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-sm text-red-300">
              You need at least{" "}
              <span className="font-bold text-red-400">50 Credits</span> to
              generate a Component.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #e14b57 0%, #c93644 100%)",
                color: "#fff",
                boxShadow: "0 9px 20px rgba(201, 54, 68, 0.2)",
              }}
            >
              Buy Credits <FiArrowRight size={12} />
            </button>
          </motion.div>
        )}

        {/* prompt box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-1 mb-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${lowCredits ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.08)"}`,
            opacity: lowCredits ? 0.6 : 1,
          }}
        >
          <div className="flex items-centergap-3 p-4">
            <FiZap size={20} className="text-indigo-400 mt-1 shrink-0 mr-3" />
            <textarea
              onKeyDown={handleCtrlEnter}
              onChange={(e) => setprompt(e.target.value)}
              value={prompt}
              placeholder={
                lowCredits
                  ? "Not enough credits to generate..."
                  : "A glassmorphism pricing card with a toggle for monthly/annual billing..."
              }
              disabled={lowCredits}
              rows={3}
              className="w-full bg-transparent text-white placeholder-white/20 text-[15px] resize-none outline-none leading-relaxed disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="text-xs text-white/30">
              Ctrl + Enter to generate
            </span>
            <motion.button
              onClick={handleGenerate}
              whileTap={{ scale: 0.9 }}
              disabled={generating || lowCredits || !prompt.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{
                background: generating
                  ? "rgba(99,102,241,0.3)"
                  : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: generating
                  ? "none"
                  : "0 0 24px rgba(99,102,241,0.4)",
              }}
            >
              {generating ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block"
                >
                  <FiLoader size={15} />
                </motion.span>
              ) : (
                <FiZap size={15} />
              )}

              {generating ? "Generating..." : "Generate"}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {generate && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(99, 102, 241, 0.2)" }}
                  >
                    <FiLayers size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {generate.name}
                    </p>
                    <p className="text-xs text-white/40">
                      {generate.props?.length > 0
                        ? `Props: ${generate.props.join(", ")}`
                        : "No props"}
                    </p>
                  </div>
                </div>

                <div
                  className="flex gap-1 rounded-xl p-1"
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {["preview", "code"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize"
                      style={{
                        background:
                          activeTab === tab
                            ? "rgba(99,102,241,0.5)"
                            : "transparent",
                        color:
                          activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {tab === "preview" ? (
                        <FiEye size={12} />
                      ) : (
                        <FiCode size={12} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  {activeTab === "preview" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="preview"
                    >
                      {generate?.code && (
                        <LiveComponentPreview code={generate.code} />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="code"
                      className="rounded-xl overflow-auto"
                      style={{
                        background: "#0d1117",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        maxHeight: "340px",
                      }}
                    >
                      <pre className="p-5 text-xs leading-relaxed text-green-300 font-mono whitespace-pre-wrap">
                        {generate.code}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 px-5 pb-5 pt-1 flex-wrap">
                {userRole === "admin" && (
                  <>
                    <motion.button
                      onClick={handleSave}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving || savedComponentId}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: savedComponentId
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(255,255,255,0.06)",
                        border: savedComponentId
                          ? "1px solid rgba(16,185,129,0.3)"
                          : "1px solid rgba(255,255,255,0.1)",
                        color: savedComponentId ? "#34d399" : "#fff",
                      }}
                    >
                      {saving ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <FiLoader size={14} />
                        </motion.span>
                      ) : savedComponentId ? (
                        <FiCheckCircle size={14} />
                      ) : (
                        <FiSave size={14} />
                      )}
                      {saving
                        ? "Saving..."
                        : savedComponentId
                          ? "Saved"
                          : "Save Component"}
                    </motion.button>

                    {savedComponentId && !published && (
                      <motion.button
                        onClick={handlePublish}
                        whileTap={{ scale: 0.97 }}
                        disabled={publishing}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                        style={{
                          background: publishing
                            ? "rgba(6,182,212,0.2)"
                            : "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                          boxShadow: publishing
                            ? "none"
                            : "0 0 20px rgba(6,182,212,0.3)",
                          color: "#fff",
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
                            <FiLoader size={14} />
                          </motion.span>
                        ) : (
                          <FiUploadCloud size={14} />
                        )}
                        {publishing ? "Publishing..." : "Publish to npm"}
                      </motion.button>
                    )}

                    {published && (
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
                        <FiCheckCircle size={14} /> Published
                      </motion.div>
                    )}

                    {savedComponentId && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 ml-auto"
                      >
                        <motion.button
                          onClick={() => navigate("/")}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <FiArrowLeft size={15} />
                          back
                        </motion.button>

                        <motion.button
                          onClick={() => {
                            setprompt("");
                            setGenerate(null);
                            setSavedComponentId(null);
                            setPublished(false);
                            setActiveTab("preview");
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                          style={{
                            background:
                              "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                            color: "#fff",
                          }}
                        >
                          <FiRefreshCw size={15} />
                          Generate Now
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}

                {userRole === "user" && (
                  <>
                    <motion.button
                      onClick={handleSave}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving || savedComponentId}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: savedComponentId
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(255,255,255,0.06)",
                        border: savedComponentId
                          ? "1px solid rgba(16,185,129,0.3)"
                          : "1px solid rgba(255,255,255,0.1)",
                        color: savedComponentId ? "#34d399" : "#fff",
                      }}
                    >
                      {saving ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <FiLoader size={14} />
                        </motion.span>
                      ) : savedComponentId ? (
                        <FiCheckCircle size={14} />
                      ) : (
                        <FiSave size={14} />
                      )}
                      {saving
                        ? "Saving..."
                        : savedComponentId
                          ? "Saved"
                          : "Save Component"}
                    </motion.button>

                    {savedComponentId && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 ml-auto"
                      >
                        <motion.button
                          onClick={() => navigate("/")}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <FiArrowLeft size={15} />
                          back
                        </motion.button>

                        <motion.button
                          onClick={() => {
                            setprompt("");
                            setGenerate(null);
                            setSavedComponentId(null);
                            setPublished(false);
                            setActiveTab("preview");
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                          style={{
                            background:
                              "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                            color: "#fff",
                          }}
                        >
                          <FiRefreshCw size={15} />
                          Generate Now
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium traansition-all"
                          style={{
                            background: "rgba(99, 102, 241, 0.15)",
                            border: "1px solid rgba(99, 102, 241, 0.32)",
                            color: "#818cf8",
                          }}
                        >
                          <FiPackage size={15} />
                          My Components
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!generate && !generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-8 md:py-10"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <FiCpu size={18} className="text-indigo-400" />
            </div>
            <p className="text-white/40 text-sm">
              Describe your component above and hit Generate
            </p>
          </motion.div>
        )}
      </div>

      {generating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ borderTopColor: "#6366f1", borderRightColor: "#86b6d4" }}
            className="w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-4"
          />
          <p className="text-white/30 text-sm">generating your component</p>
        </motion.div>
      )}

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Generate;
