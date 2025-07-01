"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({
  text = "Loading",
  color = "#c4a962",
  size = 200,
  showGrid = true,
  showText = true
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative ${
        mounted ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {showGrid && (
            <div className="grid-background absolute inset-0 opacity-20"></div>
          )}
          
          <div className="ring-outer absolute" style={{ borderColor: color }}></div>
          <div className="ring-inner absolute" style={{ borderColor: color }}></div>
          
          <div className="particles">
            {[...Array.from({length: 12})].map((_, i) => (
              <div
                key={i}
                className="particle absolute"
                style={{
                  backgroundColor: color,
                  transform: `rotate(${i * 30}deg) translateY(-${size / 2}px)`,
                }}
              ></div>
            ))}
          </div>

          {showText && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-effect font-poppins" style={{ color }}>
                {text.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .grid-background {
          background-image: linear-gradient(to right, ${color}20 1px, transparent 1px),
                          linear-gradient(to bottom, ${color}20 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid-move 20s linear infinite;
        }

        .ring-outer {
          width: 100%;
          height: 100%;
          border: 4px solid;
          border-radius: 50%;
          animation: spin 4s linear infinite;
        }

        .ring-inner {
          width: 70%;
          height: 70%;
          border: 4px solid;
          border-radius: 50%;
          top: 15%;
          left: 15%;
          animation: spin-reverse 3s linear infinite;
        }

        .particle {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: float 3s ease-in-out infinite;
        }

        .text-effect span {
          animation: pulse 2s ease-in-out infinite;
          opacity: 0.7;
        }

        @keyframes grid-move {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-20px) translateY(-20px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes float {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse {
          0% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-5px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="p-8 bg-[#0a192f] min-h-screen flex flex-col items-center gap-12">
      <div>
        <h2 className="text-[#c4a962] text-2xl mb-4 font-poppins text-center">
          Default Loader
        </h2>
        <MainComponent />
      </div>

      <div>
        <h2 className="text-[#c4a962] text-2xl mb-4 font-poppins text-center">
          Custom Text & Color
        </h2>
        <MainComponent 
          text="Processing" 
          color="#00ff99"
          size={250}
        />
      </div>

      <div>
        <h2 className="text-[#c4a962] text-2xl mb-4 font-poppins text-center">
          No Grid, No Text
        </h2>
        <MainComponent 
          showGrid={false}
          showText={false}
          color="#a855f7"
          size={150}
        />
      </div>

      <div>
        <h2 className="text-[#c4a962] text-2xl mb-4 font-poppins text-center">
          Minimal Version
        </h2>
        <MainComponent 
          text="Please Wait"
          showGrid={false}
          size={180}
        />
      </div>
    </div>
  );
});
}