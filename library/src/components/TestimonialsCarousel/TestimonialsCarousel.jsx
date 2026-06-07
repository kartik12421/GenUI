import React, { useState, useRef } from "react";

const testimonialsData = [
  {
    name: "Sarah Thompson",
    role: "Marketing Manager",
    text: "This product has completely transformed our workflow. The efficiency gains are incredible!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "CTO",
    text: "A game-changer for our tech stack. The integration was seamless and the support is top-notch.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Product Designer",
    text: "The intuitive interface and powerful features have made this our go-to tool for design projects.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    rating: 5
  }
];

export const TestimonialsCarousel = ({
  bg = "#0f172a",
  accent = "#6366f1",
  textColor = "#fff",
  cardBg = "#1e293b",
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(nextSlide, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval]);

  return (
    <div style={{ background: bg, borderRadius: "24px", width: "100%", maxWidth: "800px", padding: "40px 20px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "20px", border: "1px solid " + alpha(accent, 0.1) }}>
        <div style={{ display: "flex", transition: "transform 0.5s", transform: "translateX(" + (-currentIndex * 100) + "%)" }}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} style={{ minWidth: "100%", padding: "40px", background: cardBg, borderRadius: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                <img src={testimonial.image} alt={testimonial.name} style={{ width: "60px", height: "60px", borderRadius: "50%", border: "2px solid " + accent }} />
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: textColor }}>{testimonial.name}</div>
                  <div style={{ fontSize: "14px", color: alpha(textColor, 0.6) }}>{testimonial.role}</div>
                </div>
              </div>
              <div style={{ fontSize: "16px", lineHeight: 1.6, color: alpha(textColor, 0.8), marginBottom: "20px" }}>{testimonial.text}</div>
              <div style={{ display: "flex", gap: "4px" }}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={accent} stroke={accent} strokeWidth="1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={prevSlide} style={{ background: alpha(accent, 0.1), border: "1px solid " + alpha(accent, 0.3), padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} style={{ background: alpha(accent, 0.1), border: "1px solid " + alpha(accent, 0.3), padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};