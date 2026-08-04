import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiCheck, FiLock, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const plans = [
  {
    name: "Free",
    amount: null,
    aiCredits: 150,
    tag: "Current Plan",
    description: "Get started with AI-powered component generation.",
    features: [
      "150 AI Credits included",
      "Save components",
      "Preview & export code",
      "Community support",
    ],
    cta: "Active",
    disabled: true,
    highlight: false,
  },
  {
    name: "Pro",
    amount: 99,
    aiCredits: 200,
    tag: "Most Popular",
    description: "More credits to build faster with no interruptions.",
    features: [
      "200 AI Credits added",
      "Save components",
      "Preview & export code",
      "Priority support",
    ],
    cta: "Buy for ₹99",
    disabled: false,
    highlight: true,
  },
];

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async (plan) => {
    try {
      const amount = plan.amount;

      const result = await axios.post(
        ServerUrl + "/api/payment/create",
        {
          amount,
          aiCredits: plan.aiCredits,
        },
        {
          withCredentials: true,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Gen.UI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (res) {
          const verifyPay = await axios.post(
            ServerUrl + "/api/payment/verify",
            res,
            { withCredentials: true },
          );

          dispatch(setUserData(verifyPay.data.user));

          alert(
            "Payment Successful 🥳... Everything is 🆗 and AICredits Added to your account.",
          );
          navigate("/generate");
        },
        theme: {
          color: "8B5CF6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #05050a 0%, #0d0c1d 60%, #05050a 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* dots */}
      <div
        className="absolute top-[-8%] left-[10%] w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="absolute bottom-[-6%] right-[5%] w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, #EC4899 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-14 w-full">
        <motion.button
          onClick={() => navigate("/generate")}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-all mb-10 cursor-pointer bg-transparent border-none"
        >
          <FiArrowLeft size={15} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-13"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <FiZap size={15} className="text-purple-400" />
            <span className="text-xs font-semibold tracking-widest text-purple-300 uppercase">
              AI Credits
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            Credits{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pricing
            </span>
          </h1>

          <p className="text-white/35 text-sm max-w-sm mx-auto">
            Choose a plan that fits your needs. Credits are used per component.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.highlight
                  ? "linear-gradient(145deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlight
                  ? "1px solid rgba(139,92,246,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(139,92,246,0.12)"
                  : "none",
              }}
            >
              {/* tag */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: plan.highlight
                      ? "rgba(139,92,246,0.2)"
                      : "rgba(255,255,255,0.06)",
                    color: plan.highlight ? "#a78bfa" : "rgba(255,255,255,0.4)",
                    border: plan.highlight
                      ? "1px solid rgba(139,92,246,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {plan.tag}
                </span>
                {plan.disabled && (
                  <FiLock size={15} className="text-white/20" />
                )}
              </div>

              <h2
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {plan.name}
              </h2>
              <p className="text-white/40 text-xs mb-5">{plan.description}</p>

              <div className="mb-6">
                {plan.amount ? (
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-extrabold"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Rs {plan.amount}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span
                      className="text-4xl font-extrabold"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Free
                    </span>
                  </div>
                )}

                <div
                  className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg"
                  style={{
                    background: plan.highlight
                      ? "rgba(236,72,153,0.1)"
                      : "rgba(255,255,255,0.05)",
                    border: plan.highlight
                      ? "1px solid rgba(236,72,153,0.2)"
                      : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <FiZap
                    size={11}
                    style={{
                      color: plan.highlight
                        ? "#ec4899"
                        : "rgba(255,255,255,0.4)",
                    }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: plan.highlight
                        ? "#ec4899"
                        : "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    {plan.aiCredits} AI Credits
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 yexy-sm text-white/60"
                  >
                    <FiCheck
                      size={15}
                      style={{
                        color: plan.highlight
                          ? "#a78bfa"
                          : "rgba(255, 255, 255, 0.3)",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.disabled}
                onClick={() => handlePayment(plan)}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  cursor: plan.disabled ? "not-allowed" : "pointer",
                  background: plan.disabled
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  color: plan.disabled ? "rgba(255,255,255,0.25)" : "#fff",
                  border: plan.disabled
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
                  boxShadow: plan.disabled
                    ? "none"
                    : "0 0 24px rgba(139,92,246,0.35)",
                }}
              >
                {plan.disabled ? (
                  <div className="flex items-center justify-center gap-2">
                    <FiCheck size={15} /> {plan.cta}
                  </div>
                ) : (
                  plan.cta
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/50 text-xs my-8"
        >
          AI Credits are added to your account instantly after payment.
        </motion.p>
      </div>
    </div>
  );
}

export default Pricing;
