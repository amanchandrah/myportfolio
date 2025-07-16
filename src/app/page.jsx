"use client";
import React, { useState, useEffect , useCallback} from "react";

function MainComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedProject, setExpandedProject] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [cipherMode, setCipherMode] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [cipherTheme, setCipherTheme] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const imageRef = React.useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const getSectionMessage = (section) => {
    switch (section) {
      case "hidden":
        return "Searching for hidden secrets...";
      case "skills":
        return "Have a look at my skills...";
      case "projects":
        return "Here are few of my projects...";
      case "experience":
        return "Let's have a look at my experiences...";
      case "contact":
        return "Wanna get in touch?";
      default:
        return "Loading...";
    }
  };

  const handleSectionChange = async (section) => {
    if (section === activeSection) return;

    setShowPopup(true);
    setPopupMessage(getSectionMessage(section));
    setMenuOpen(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setActiveSection(section);
    setShowPopup(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const quotes = [
    "Sometimes all you believe is just a hope. A small hope can make huge changes in life.",
    "Life is a journey, not a destination.",
    "Consistency is the master key to any door of success.",
  ];

  const themes = ["matrix", "terminal", "vaporwave"];

  const activateCipherMode = useCallback(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setCipherTheme(randomTheme);
    setCipherMode(true);
    setShowTerminal(true);
    setCurrentQuote(0);
    setIsTyping(true);
  }, []);

  const deactivateCipherMode = useCallback(() => {
    setCipherMode(false);
    setShowTerminal(false);
    setCipherTheme(null);
    setTypedText("");
    setCurrentQuote(0);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!showTerminal || !isTyping) return;

    const currentQuoteText = quotes[currentQuote];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentQuoteText.length) {
        setTypedText(currentQuoteText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          if (currentQuote < quotes.length - 1) {
            setCurrentQuote((prev) => prev + 1);
            setTypedText("");
            setIsTyping(true);
          } else {
            setCurrentQuote(0);
            setTypedText("");
            setIsTyping(true);
          }
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentQuote, isTyping, showTerminal, quotes]);

  const sections = {
    hero: {
      title: "Aman Chandra ",
      subtitle: [
        "Turning lines of code and abstract models into real-world impact — I build, present, and lead with purpose.",
      ],
      status: [
        "Junior at RV University (B.Tech Computer Science - Honors)",
        "BS Student at IIT Madras (Data Science and Applications)",
        "Software Development Intern at Ganglia Technologies",
        "Co-founder of Panda Scoop",
      ],
    },
    skills: {
      categories: {
        "Programming Languages": [
          { name: "Python", icon: "fa-python" },
          { name: "JavaScript", icon: "fa-js" },
          { name: "C", icon: "fa-code" },
          { name: "Java", icon: "fa-java" },
        ],
        "Tools & Technologies": [
          { name: "React.js", icon: "fa-react" },
          { name: "HTML5", icon: "fa-html5" },
          { name: "CSS3", icon: "fa-css3-alt" },
          { name: "MongoDB", icon: "fa-database" },
          { name: "Git", icon: "fa-git-alt" },
          { name: "GitHub", icon: "fa-github" },
          { name: "Arduino", icon: "fa-microchip" },
        ],
        Frameworks: [
          { name: "Express.js", icon: "fa-node-js" },
          { name: "Node.js", icon: "fa-node" },
        ],
        Concepts: [
          { name: "Web Development", icon: "fa-globe" },
          { name: "Machine Learning", icon: "fa-brain" },
          { name: "Generative AI", icon: "fa-robot" },
          { name: "Signal Processing", icon: "fa-wave-square" },
        ],
      },
    },
    projects: {
  items: [
    {
      title: "Panda Scoop",
      icon: "fa-rocket",
      description:
        "An early-stage startup focused on innovative solutions.",
      stack: ["Business Plan", "Market Research", "Startup"],
      role: "Entrepreneurship",
      image: "/images/Panda.jpg",
      expandedDetails: `Panda scoop is a early idea stage startup executed beautifully with multiple demos and presentations. The startup won 4th place in Manthan 2024, a business plan competition organised by Federation of Karnataka Chambers of Commerce and Industry, one of the highest honoured business competitions in the Karnataka state known for its startup culture.

With over 300+ teams all over state, various ages, and varied backgrounds, the startup won overall cash prize of ~1 Lakh rupees.`,
    },
    {
      title: "IV Bag Monitoring System",
      icon: "fa-heartbeat",
      description:
        "IoT-based remote monitoring system for intravenous fluids.",
      stack: ["IoT", "Healthcare", "Research"],
      role: "IoT and Research",
      image: "/images/IV.jpg",
      expandedDetails: `An IoT Project that manages IV fluids monitoring remotely, this project got shortlisted into top 29 teams of FKCCI business plan competition.

A research paper titled "Intravenous Bag Monitoring and Alert System - A Prototype" was written and got selected at over 5+ International reputed conferences across the globe. The paper was presented at International Conference on Biomedical Engineering Science and Technology and is currently under publication with Springer.`,
    },
    {
      title: "Eventify",
      icon: "fa-ticket",
      description:
        "A comprehensive event management platform — create, host, ticket.",
      stack: ["React", "MongoDB", "Node.js"],
      role: "Full-Stack Development",
      image: "/images/Eventify.png",
      url: "eventify14.created.app",
    },
    {
      title: "Genreize",
      icon: "fa-music",
      description:
        "A music genre classification platform using HuBERT transformer model.",
      stack: ["PyTorch", "TorchAudio", "Deep Learning"],
      role: "Machine learning",
      image: "/images/Genreize.png",
      url: "genreize.created.app",
    },
    {
      title: "IITM Outreach Portal",
      icon: "fa-bullseye",
      description:
        "An internal AI-powered guest handling & request system for Paradox Fest, IITM.",
      stack: ["React", "MongoDB", "Node.js"],
      role: "Full Stack Development",
      status: "In Progress",
      image: "/images/Unified.png",
      url: "unified.created.app",
    },
  ],
},

    experience: {
      items: [
        {
          role: "Software Development Intern",
          company: "Ganglia Technologies Pvt Ltd",
          subtitle: "Incubated at MAHE",
          period: "June 2025 – Present",
          description: "Role: Backend Dev, API Integration",
          icon: "fa-laptop-code",
        },
        {
          role: "Super-Coordinator, Outreach",
          company: "Paradox 2025 (IIT Madras)",
          description: "Led departmental tech efforts and volunteer management",
          icon: "fa-users-gear",
        },
        {
          role: "Event Head, GenAI",
          company: "IITM BS Margazhi 2025",
          description:
            "Over 300+ participants | Featured Top AI Artists in India",
          icon: "fa-robot",
        },
      ],
    },
    contact: {
      email: "amanchandrah@gmail.com",
      linkedin: "linkedin.com/in/aman-chandra-h",
      instagram: "amanchandrah",
      x: "AmanChandraH",
      location: "Bengaluru / Chennai",
    },
    systemLogs: {
      quotes: [
        "Sometimes all you believe is just a hope. A small hope can make huge changes in life.",
        "Life is a journey, not a destination.",
        "Consistency is the master key to any door of success.",
      ],
    },
  };

  useEffect(() => {
    if (!showSystemLogs) {
      setActiveQuoteIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) =>
        prev < sections.systemLogs.quotes.length - 1 ? prev + 1 : prev
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [showSystemLogs]);

  const handleImageHover = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - imgCenterX;
    const deltaY = e.clientY - imgCenterY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;
    const scale = Math.min(maxDistance / (distance || 1), 2);

    setImagePosition({
      x: -deltaX * scale,
      y: -deltaY * scale,
    });

    setShowMessage(true);

    setTimeout(() => setShowMessage(false), 1000);
  };

  const resetImagePosition = () => {
    setImagePosition({ x: 0, y: 0 });
    setShowMessage(false);
  };

  return (
    <div className={`min-h-screen bg-[#0a192f] text-[#c4a962]`}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px]">
              <div className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"></div>
              <div
                className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
          <div className="absolute inset-0 grid-lines"></div>
          <div className="absolute inset-0">
            {[...Array.from({ length: 20 })].map((_, i) => (
              <div
                key={i}
                className="particle-fly"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
          <div className="relative z-10 text-center w-full max-w-[90vw] mx-auto flex flex-col items-center justify-center">
            <div className="typewriter-container overflow-hidden text-center w-full">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-poppins text-[#c4a962] mb-4 animate-typing mx-auto break-words">
                {popupMessage}
              </h2>
              <div className="flex flex-col items-center justify-center w-full">
                <p className="text-xs sm:text-sm text-[#c4a962]/60 mt-2 animate-typing-delayed text-center break-words">
                  Initializing system...
                </p>
                <div className="mt-4 flex justify-center space-x-1 sm:space-x-2">
                  {[...Array.from({ length: 8 })].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 sm:w-2 h-6 sm:h-8 bg-[#c4a962] animate-eq"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="energy-beam left-beam"></div>
            <div className="energy-beam right-beam"></div>
          </div>
        </div>
      )}

      {showHiddenMessage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[600px] h-[600px]">
              <div className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"></div>
              <div
                className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute inset-0 border-2 border-[#c4a962] rounded-full animate-expand-ring"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
          <div className="absolute inset-0 grid-lines"></div>
          <div className="absolute inset-0">
            {[...Array.from({ length: 20 })].map((_, i) => (
              <div
                key={i}
                className="particle-fly"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
          <div className="relative z-10 text-center w-full max-w-[90vw] mx-auto flex flex-col items-center justify-center">
            <div className="typewriter-container overflow-hidden text-center w-full">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-poppins text-[#c4a962] mb-4 animate-typing mx-auto break-words">
                Nothing hidden here... but did you try clicking the AC icon?
              </h2>
              <p className="text-sm sm:text-base text-[#c4a962]/70 mt-2 animate-typing-delayed break-words">
                btw, it's in the top left of homepage
              </p>
              <button
                onClick={() => setShowHiddenMessage(false)}
                className="mt-8 px-6 py-3 bg-[#c4a962] text-[#0a192f] rounded-lg font-inter font-semibold hover:bg-[#c4a962]/90 transition-colors duration-300"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed w-full bg-[#0a192f]/90 backdrop-blur-sm z-50 border-b border-[#c4a962]/10">
        <div className="w-full px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <div className="relative flex items-center justify-between">
                <div className="absolute inset-0 bg-[#c4a962]/5 backdrop-blur-md rounded-xl border border-[#c4a962]/20"></div>
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962]/0 via-[#c4a962]/5 to-[#c4a962]/0 animate-gradient-x"></div>
                  {[...Array.from({ length: 20 })].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#c4a962]/20 rounded-full animate-float-particle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative flex items-center justify-between w-full px-6 py-2">
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        setShowPopup(true);
                        setPopupMessage(
                          "Opening System Logs: Personal Insights"
                        );
                        setTimeout(() => {
                          setShowPopup(false);
                          setShowSystemLogs(true);
                        }, 2000);
                      }}
                      className="relative group"
                    >
                      <div className="relative flex items-center">
                        <div className="w-16 h-16 relative">
                          <div className="absolute inset-0">
                            {[...Array.from({ length: 12 })].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-full h-full origin-center"
                                style={{
                                  transform: `rotate(${i * 30}deg)`,
                                }}
                              >
                                <div className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-[#c4a962]/30 transform -translate-x-1/2 group-hover:h-2 group-hover:bg-[#c4a962] transition-all duration-300"></div>
                              </div>
                            ))}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0a192f] relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                              <div className="flex items-center justify-center">
                                <span className="text-xl font-bold font-poppins text-[#c4a962] relative z-10 group-hover:animate-glitch">
                                  AC
                                </span>
                              </div>
                              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold font-poppins text-[#ff0000]/50 opacity-0 group-hover:animate-glitch-overlay-1">
                                AC
                              </span>
                              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold font-poppins text-[#0000ff]/50 opacity-0 group-hover:animate-glitch-overlay-2">
                                AC
                              </span>
                            </div>
                          </div>
                          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#c4a962]/30 group-hover:bg-[#c4a962] transition-colors duration-300 relative">
                              <div className="absolute inset-0 rounded-full bg-[#c4a962]/0 group-hover:bg-[#c4a962]/30 transition-colors duration-300 blur-sm scale-150"></div>
                              <div className="absolute inset-0 rounded-full bg-[#c4a962]/0 group-hover:bg-[#c4a962]/20 transition-colors duration-300 blur-md scale-200"></div>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-[#c4a962]/10 to-transparent animate-scan-vertical"></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center space-x-12">
                      {[
                        ["hero", "Home"],
                        "skills",
                        "projects",
                        "experience",
                        "contact",
                        "hidden",
                      ].map((section) => (
                        <button
                          key={
                            typeof section === "string" ? section : section[0]
                          }
                          onClick={() => {
                            if (
                              (typeof section === "string"
                                ? section
                                : section[0]) === "hidden"
                            ) {
                              setShowPopup(true);
                              setPopupMessage(
                                "Searching for hidden secrets..."
                              );
                              setTimeout(() => {
                                setShowPopup(false);
                                setShowHiddenMessage(true);
                              }, 2000);
                              return;
                            }
                            handleSectionChange(
                              typeof section === "string" ? section : section[0]
                            );
                          }}
                          className={`
                            relative group px-4 py-2
                            ${
                              activeSection ===
                              (typeof section === "string"
                                ? section
                                : section[0])
                                ? "text-[#c4a962]"
                                : "text-[#c4a962]/70"
                            }
                            hover:text-[#c4a962] transition-colors duration-300
                            font-inter text-sm uppercase tracking-wider
                          `}
                        >
                          <div className="relative">
                            {(typeof section === "string"
                              ? section
                              : section[1]
                            )
                              .split("")
                              .map((letter, index) => (
                                <span
                                  key={index}
                                  className="inline-block group-hover:animate-letter-wake"
                                  style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                  {letter}
                                </span>
                              ))}
                            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#c4a962]/0 group-hover:bg-[#c4a962]/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                          </div>
                          {activeSection ===
                            (typeof section === "string"
                              ? section
                              : section[0]) && (
                            <div className="absolute -inset-1">
                              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#c4a962] animate-corner-tl"></div>
                              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#c4a962] animate-corner-tr"></div>
                              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#c4a962] animate-corner-bl"></div>
                              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#c4a962] animate-corner-br"></div>
                              <div className="absolute inset-0 bg-[#c4a962]/5 rounded-lg blur-sm"></div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-[#c4a962]/0 group-hover:bg-[#c4a962]/5 rounded-lg transition-all duration-300">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c4a962]/10 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="md:hidden flex-shrink-0">
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="text-[#c4a962] hover:text-[#c4a962]/80 transition-colors p-2"
                      aria-label="Toggle menu"
                    >
                      <i
                        className={`fas ${
                          menuOpen ? "fa-times" : "fa-bars"
                        } text-2xl`}
                      ></i>
                    </button>
                  </div>
                  <div className="hidden md:block flex-shrink-0 w-16"></div>
                </div>
              </div>
              {menuOpen && (
                <div className="md:hidden mt-4 pb-4">
                  <div className="flex flex-col space-y-4">
                    {[
                      ["hero", "Home"],
                      "skills",
                      "projects",
                      "experience",
                      "contact",
                      "hidden",
                    ].map((section) => (
                      <button
                        key={typeof section === "string" ? section : section[0]}
                        onClick={() => {
                          if (
                            (typeof section === "string"
                              ? section
                              : section[0]) === "hidden"
                          ) {
                            setShowPopup(true);
                            setPopupMessage("Searching for hidden secrets...");
                            setTimeout(() => {
                              setShowPopup(false);
                              setShowHiddenMessage(true);
                            }, 2000);
                            return;
                          }
                          handleSectionChange(
                            typeof section === "string" ? section : section[0]
                          );
                          setMenuOpen(false);
                        }}
                        className={`
                          py-2 px-4 text-left font-inter uppercase tracking-widest
                          ${
                            activeSection ===
                            (typeof section === "string" ? section : section[0])
                              ? "text-[#c4a962] bg-[#c4a962]/10"
                              : "text-[#c4a962]/70"
                          }
                          hover:text-[#c4a962] hover:bg-[#c4a962]/5 transition-all duration-300
                          rounded-lg
                        `}
                      >
                        {typeof section === "string" ? section : section[1]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showSystemLogs && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl">
          <button
            onClick={() => {
              setShowPopup(true);
              setPopupMessage("Returning to Aman's Portfolio");
              setTimeout(() => {
                setShowPopup(false);
                setShowSystemLogs(false);
                setActiveSection("hero");
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 2000);
            }}
            className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20 group"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-[#c4a962] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center gap-2 sm:gap-4 bg-[#131631]/80 rounded-xl px-4 sm:px-6 py-2 sm:py-3 border border-[#c4a962]/10 hover:border-[#c4a962]/30">
                <div className="w-8 sm:w-10 h-8 sm:h-10 relative">
                  <div className="absolute inset-0 border-2 border-[#c4a962]/30 rounded-full group-hover:rotate-180 transition-transform duration-1000"></div>
                  <div className="absolute inset-1 border-2 border-dashed border-[#c4a962]/20 rounded-full group-hover:rotate-[-180deg] transition-transform duration-700"></div>
                  <div className="absolute inset-2 border-2 border-dotted border-[#c4a962]/10 rounded-full group-hover:rotate-90 transition-transform duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-arrow-left text-[#c4a962] text-base sm:text-lg group-hover:scale-110 transition-all duration-300"></i>
                  </div>
                </div>
                <span className="text-[#c4a962] font-inter text-base sm:text-lg group-hover:translate-x-[-4px] transition-transform duration-300">
                  Back
                </span>
              </div>
            </div>
          </button>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a192f] to-black">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNjNGE5NjIiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
            {[...Array.from({ length: 30 })].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#c4a962] rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                  opacity: 0.4 + Math.random() * 0.6,
                }}
              />
            ))}
          </div>
          <div className="relative w-full h-full overflow-y-auto pt-20 sm:pt-24 pb-8">
            <div className="max-w-4xl mx-auto px-4">
              <div className="relative mb-8 sm:mb-16 overflow-hidden">
                <h2 className="text-3xl sm:text-4xl font-poppins text-center text-[#c4a962] animate-title-entrance px-2">
                  System Logs: Personal Insights
                </h2>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#c4a962]/30 to-transparent animate-line-expand"></div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {sections.systemLogs.quotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`opacity-0 ${
                      index <= activeQuoteIndex && "animate-quote-reveal"
                    }`}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <div className="bg-[#131631] rounded-lg p-4 sm:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c4a962]/20 to-transparent animate-scan-line"></div>
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-[#c4a962]/20 via-transparent to-[#c4a962]/20 animate-scan-line-reverse"></div>
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-4 sm:gap-6">
                          <div className="relative">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-500 relative overflow-hidden">
                              <i className="fas fa-terminal text-lg sm:text-xl text-[#c4a962] group-hover:rotate-180 transition-transform duration-500"></i>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c4a962]/20 to-transparent animate-glow-slide"></div>
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-[#c4a962]/20 animate-pulse-ring"></div>
                            <div
                              className="absolute inset-0 rounded-full border-2 border-[#c4a962]/10 animate-pulse-ring"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p
                              className="text-base sm:text-xl font-crimson-text leading-relaxed text-white/90 animate-text-reveal"
                              style={{
                                animationDelay: `${index * 0.2 + 0.2}s`,
                              }}
                            >
                              {quote}
                            </p>
                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#c4a962]/50 to-transparent transition-all duration-1000 mt-4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-[#c4a962]/30 rounded-tl"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-[#c4a962]/30 rounded-br"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <section
          id="hero"
          className={`min-h-screen px-4 flex items-center relative ${
            activeSection === "hero" ? "block" : "hidden"
          }`}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/images/bg.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            
          >
            <div className="absolute inset-0 bg-[#0a192f]/70"></div>
          </div>

          <div className="container mx-auto relative z-10 pt-40">
            <div className="max-w-4xl">
              <div className="flex flex-col items-start mb-8 pl-4 md:pl-8">
                <div
                  ref={imageRef}
                  className="relative w-48 h-48 group mb-8 mt-20 sm:mt-0"
                  onMouseMove={handleImageHover}
                  onMouseLeave={resetImagePosition}
                >
                  <div
                    className="rounded-full overflow-hidden border-4 border-[#c4a962]/20 shadow-lg transition-all duration-300 ease-out"
                    style={{
                      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    }}
                  >
                    <img
                      src="/images/Aman.JPG"
                      alt="Aman Chandra"
                      className="w-full h-full object-cover"
                    />

                  </div>
                  <div
                    className={`absolute top-[-4rem] sm:top-[-5rem] left-1/2 transform -translate-x-1/2 w-full sm:w-auto transition-all duration-300 px-4 sm:px-0 z-[51] ${
                      showMessage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="relative bg-[#131631] rounded-xl px-4 sm:px-6 py-2 sm:py-3 border border-[#c4a962]/30 shadow-[0_0_15px_rgba(196,169,98,0.1)] backdrop-blur-sm max-w-[200px] mx-auto">
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#c4a962]/0 via-[#c4a962]/20 to-[#c4a962]/0 animate-shine"></div>
                      </div>

                      <span className="relative z-10 text-[#c4a962] font-inter text-sm tracking-wide block text-center">
                        Stay away!
                      </span>

                      <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-[#131631] border-r border-b border-[#c4a962]/30"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 font-poppins">
                    <span className="text-[#c4a962] relative inline-block">
                      {sections.hero.title}
                      <div className="absolute left-0 -bottom-2 w-full h-1 bg-[#c4a962]/30"></div>
                    </span>
                  </h1>
                </div>

                <div className="space-y-1 mb-12">
                  {sections.hero.subtitle.map((line, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-base font-crimson-text text-white/90 text-left tracking-wide italic"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="space-y-2 relative">
                  <div className="absolute inset-0 bg-[#131631]/30 backdrop-blur-sm rounded-lg border border-[#c4a962]/10"></div>
                  <div className="relative p-4 space-y-3">
                    {sections.hero.status.map((status, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-[#c4a962] hover:text-[#c4a962] transition-colors duration-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c4a962]"></div>
                        <p className="text-base text-white/80">{status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex gap-6">
                  <button
                    onClick={() => handleSectionChange("projects")}
                    className="px-8 py-3 bg-[#c4a962] text-[#0a192f] rounded-lg font-inter font-semibold hover:bg-[#c4a962]/90 transition-colors duration-300"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => handleSectionChange("contact")}
                    className="px-8 py-3 border-2 border-[#c4a962] text-[#c4a962] rounded-lg font-inter font-semibold hover:bg-[#c4a962]/10 transition-colors duration-300"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className={`min-h-screen px-4 py-20 ${
            activeSection === "skills" ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto pt-20">
            <div className="relative mb-20 w-fit mx-auto md:mx-0">
              <div className="absolute inset-0 bg-[#c4a962]/5 backdrop-blur-sm rounded-lg -skew-x-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#c4a962] text-center md:text-left font-poppins relative px-8 py-4">
                Skills Matrix
              </h2>
            </div>
            <div className="space-y-16">
              {Object.entries(sections.skills.categories).map(
                ([category, skills]) => (
                  <div
                    key={category}
                    className="transform hover:scale-[1.01] transition-transform duration-300"
                  >
                    <h3 className="text-2xl font-inter font-light mb-8 pl-4 border-l-2 border-[#c4a962]">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-[#131631] rounded-lg p-3 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 group hover:bg-[#131631]/80"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <i
                                className={`fas ${skill.icon} text-lg text-[#c4a962] group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 ease-in-out transform hover:text-[#c4a962] relative z-10`}
                              ></i>
                              <div className="absolute inset-0 bg-[#c4a962]/0 group-hover:bg-[#c4a962]/20 rounded-full blur-lg transition-all duration-700 transform scale-0 group-hover:scale-150 -z-10"></div>
                            </div>
                            <p className="text-sm text-gray-300 font-roboto whitespace-nowrap overflow-hidden text-ellipsis">
                              {skill.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`min-h-screen px-4 py-20 ${
            activeSection === "projects" ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto pt-20">
            <div className="relative mb-20 w-fit mx-auto md:mx-0">
              <div className="absolute inset-0 bg-[#c4a962]/5 backdrop-blur-sm rounded-lg -skew-x-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#c4a962] text-center md:text-left font-poppins relative px-8 py-4">
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {sections.projects.items.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-500 relative overflow-hidden">
                      <i
                        className={`fas ${project.icon} text-2xl text-[#c4a962] group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 ease-in-out`}
                      ></i>
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c4a962]/30 rounded-full group-hover:animate-spin-slow"></div>
                    </div>
                    <h3 className="text-2xl font-inter font-bold">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-6 font-crimson-text">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                    {project.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-[#0a0d1f] text-xs md:text-sm text-[#c4a962] border border-[#c4a962]/20 hover:border-[#c4a962]/40 transition-colors duration-300 font-roboto"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#c4a962] font-inter">{project.role}</p>
                    <div className="flex items-center gap-4">
                      {project.url && (
                        <a
                          href={`https://${project.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#c4a962] text-[#0a192f] rounded-lg font-inter font-semibold hover:bg-[#c4a962]/90 transition-colors duration-300 text-sm"
                        >
                          View here
                        </a>
                      )}
                      {project.expandedDetails && (
                        <button
                          onClick={() =>
                            setExpandedProject(
                              expandedProject === index ? null : index
                            )
                          }
                          className="text-[#c4a962] flex items-center gap-2 hover:text-[#c4a962]/80 transition-colors duration-300 font-roboto"
                        >
                          <span>
                            {expandedProject === index
                              ? "Show less"
                              : "View more"}
                          </span>
                          <i
                            className={`fas fa-chevron-${
                              expandedProject === index ? "up" : "down"
                            }`}
                          ></i>
                        </button>
                      )}
                    </div>
                  </div>
                  {expandedProject === index && project.expandedDetails && (
                    <div className="mt-6 pt-6 border-t border-[#c4a962]/10">
                      <p className="text-gray-300 whitespace-pre-line font-crimson-text leading-relaxed">
                        {project.expandedDetails}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className={`min-h-screen px-4 py-20 ${
            activeSection === "experience" ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto pt-20">
            <div className="relative mb-20 w-fit mx-auto md:mx-0">
              <div className="absolute inset-0 bg-[#c4a962]/5 backdrop-blur-sm rounded-lg -skew-x-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#c4a962] text-center md:text-left font-poppins relative px-8 py-4">
                Professional Journey
              </h2>
            </div>
            <div className="space-y-6 md:space-y-8">
              {sections.experience.items.map((exp, index) => (
                <div
                  key={index}
                  className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20">
                      <i
                        className={`fas ${exp.icon} text-2xl text-[#c4a962]`}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-inter font-bold">
                        {exp.role}
                      </h3>
                      <p className="text-[#c4a962] mt-1 text-sm md:text-base">
                        {exp.company}
                      </p>
                    </div>
                    {exp.period && (
                      <p className="text-gray-400 text-sm md:text-base">
                        {exp.period}
                      </p>
                    )}
                  </div>
                  {exp.subtitle && (
                    <p className="text-gray-400 text-sm md:text-base mt-2">
                      {exp.subtitle}
                    </p>
                  )}
                  <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`min-h-screen px-4 py-20 ${
            activeSection === "contact" ? "block" : "hidden"
          }`}
        >
          <div className="container mx-auto pt-20">
            <div className="relative mb-20 w-fit mx-auto">
              <div className="absolute inset-0 bg-[#c4a962]/5 backdrop-blur-sm rounded-lg -skew-x-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#c4a962] text-center font-poppins relative px-8 py-4">
                Connect
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <a
                href={`mailto:${sections.contact.email}`}
                className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.05] group"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-14 h-14 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-300">
                    <i className="fas fa-envelope text-2xl text-[#c4a962] group-hover:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2 font-inter">
                      Email
                    </h3>
                    <p className="text-gray-400 font-roboto">
                      {sections.contact.email}
                    </p>
                  </div>
                </div>
              </a>
              <a
                href={`https://${sections.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.05] group"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-14 h-14 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-300">
                    <i className="fab fa-linkedin-in text-2xl text-[#c4a962] group-hover:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2 font-inter">
                      LinkedIn
                    </h3>
                    <p className="text-gray-400 font-roboto">Connect with me</p>
                  </div>
                </div>
              </a>
              <a
                href={`https://instagram.com/${sections.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.05] group"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-14 h-14 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-300">
                    <i className="fab fa-instagram text-2xl text-[#c4a962] group-hover:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2 font-inter">
                      Instagram
                    </h3>
                    <p className="text-gray-400 font-roboto">
                      @{sections.contact.instagram}
                    </p>
                  </div>
                </div>
              </a>
              <a
                href={`https://x.com/${sections.contact.x}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#131631] rounded-lg p-6 md:p-8 border border-[#c4a962]/10 hover:border-[#c4a962]/30 transition-all duration-300 transform hover:scale-[1.05] group"
              >
                <div className="flex items-center gap-6 w-full">
                  <div className="w-14 h-14 rounded-full bg-[#0a0d1f] flex items-center justify-center border border-[#c4a962]/20 group-hover:border-[#c4a962]/40 transition-colors duration-300">
                    <i className="fab fa-x-twitter text-2xl text-[#c4a962] group-hover:scale-110 transition-transform duration-300"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl mb-2 font-inter">X</h3>
                    <p className="text-gray-400 font-roboto">
                      @{sections.contact.x}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0d1f;
        }

        ::-webkit-scrollbar-thumb {
          background: #c4a962;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #e9d5a7;
        }

        @keyframes highlightIn {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: 0 0;
          }
        }

        .group:hover {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(196, 169, 98, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: highlightIn 0.8s ease forwards;
        }

        .grid-lines {
          background-image: linear-gradient(
              to right,
              #c4a962 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, #c4a962 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.2;
          animation: gridFade 2s ease-in-out;
        }

        @keyframes gridFade {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
        }

        @keyframes expand-ring {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-expand-ring {
          animation: expand-ring 2s ease-out infinite;
        }

        .particle-fly {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #c4a962;
          border-radius: 50%;
          filter: blur(1px);
          animation: particleFly 1.5s ease-out forwards;
        }

        @keyframes particleFly {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-eq {
          animation: equalize 0.8s ease-in-out infinite;
        }

        @keyframes equalize {
          0%,
          100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }

        .energy-beam {
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            #c4a962,
            transparent
          );
          filter: blur(3px);
        }

        .left-beam {
          left: 20%;
          animation: beamMove 2s ease-in-out infinite;
        }

        .right-beam {
          right: 20%;
          animation: beamMove 2s ease-in-out infinite reverse;
        }

        @keyframes beamMove {
          0% {
            transform: translateY(-100%) rotate(20deg);
            opacity: 0;
          }
          50% {
            transform: translateY(0) rotate(-20deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100%) rotate(20deg);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-typing {
          overflow: hidden;
          white-space: normal;
          border-right: 2px solid #c4a962;
          animation: typing 2s ease-out, blink-caret 0.75s step-end infinite;
          margin: 0 auto;
          text-align: center;
          max-width: 100%;
        }

        .animate-typing-delayed {
          overflow: hidden;
          white-space: normal;
          border-right: 2px solid #c4a962;
          opacity: 0;
          animation: typing 1.5s ease-out 0.5s forwards,
            blink-caret 0.75s step-end infinite;
          margin: 0 auto;
          text-align: center;
          max-width: 100%;
        }

        @keyframes typing {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #c4a962;
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }

        @keyframes quote-entrance {
          0% {
            opacity: 0;
            transform: translate3d(100vw, 0, 0) rotate(10deg);
          }
          60% {
            opacity: 1;
            transform: translate3d(-20px, 0, 0) rotate(-5deg);
          }
          80% {
            transform: translate3d(10px, 0, 0) rotate(2deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        .animate-quote-entrance {
          animation: quote-entrance 0.8s
            cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes quote-bounce-in {
          0% {
            opacity: 0;
            transform: translateY(-50vh);
          }
          40% {
            opacity: 1;
            transform: translateY(20px);
          }
          60% {
            transform: translateY(-10px);
          }
          75% {
            transform: translateY(5px);
          }
          85% {
            transform: translateY(-2px);
          }
          92% {
            transform: translateY(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 1s cubic-bezier(0.68, -0.55, 0.3, 1.55) forwards;
          animation-fill-mode: both;
        }

        .animate-slide-down,
        .animate-slide-right,
        .animate-slide-left {
          animation: none;
        }

        @keyframes quote-reveal {
          0% {
            opacity: 0;
            transform: translate3d(40px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-quote-reveal {
          animation: quote-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 2px #c4a962);
          }
          50% {
            filter: drop-shadow(0 0 10px #c4a962);
          }
        }

        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-overlay-1 {
          0% {
            opacity: 0;
            transform: translate(0);
          }
          20% {
            opacity: 0.3;
            transform: translate(-4px, 2px);
          }
          40% {
            opacity: 0;
            transform: translate(-2px, -2px);
          }
          60% {
            opacity: 0.3;
            transform: translate(4px, 2px);
          }
          80% {
            opacity: 0;
            transform: translate(2px, -4px);
          }
          100% {
            opacity: 0;
            transform: translate(0);
          }
        }

        @keyframes glitch-overlay-2 {
          0% {
            opacity: 0;
            transform: translate(0);
          }
          20% {
            opacity: 0.3;
            transform: translate(4px, -2px);
          }
          40% {
            opacity: 0;
            transform: translate(2px, 2px);
          }
          60% {
            opacity: 0.3;
            transform: translate(-4px, -2px);
          }
          80% {
            opacity: 0;
            transform: translate(-2px, 4px);
          }
          100% {
            opacity: 0;
            transform: translate(0);
          }
        }

        .animate-glitch {
          animation: glitch 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite
            both;
        }

        .animate-glitch-overlay-1 {
          animation: glitch-overlay-1 0.9s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both;
        }

        .animate-glitch-overlay-2 {
          animation: glitch-overlay-2 0.9s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both;
        }

        @keyframes scan-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scan-vertical {
          animation: scan-vertical 2s linear infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
