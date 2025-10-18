import React, { useState } from "react";
import {
  LineChart,
  PiggyBank,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import TipsButton from "./TipsButton";
import Triangledig from "./Triangledig";



const flipCards = [
  {
    title: "Risk Management",
    icon: <ShieldCheck className="w-12 h-12 text-green-700" />,
    description:
      "The process of identifying, assessing, and minimizing potential losses in trading or investment.",
    frontColor: "from-green-100 to-green-200 text-green-700",
    backColor: "from-green-400 to-green-600 text-green-800",
    borderColor: "from-green-400 via-green-500 to-green-600",
  },
  {
    title: "Return Optimization",
    icon: <TrendingUp className="w-12 h-12 text-yellow-700" />,
    description:
      "The strategy of maximizing investment gains while managing risk and resource allocation efficiently.",
    frontColor: "from-yellow-100 to-yellow-200 text-yellow-700",
    backColor: "from-yellow-400 to-yellow-600 text-yellow-800",
    borderColor: "from-yellow-400 via-yellow-500 to-yellow-600",
  },
  {
    title: "Goal-Based Planning",
    icon: <Target className="w-12 h-12 text-blue-700" />,
    description:
      "This financial approach aligns investment strategies with clearly defined individual or organizational objectives.",
    frontColor: "from-blue-100 to-blue-200 text-blue-700",
    backColor: "from-blue-400 to-blue-600 text-blue-800",
    borderColor: "from-blue-400 via-blue-500 to-blue-600",
  },
];

const Investment = () => {
  // Track flips only for mobile/touch devices
  const [flipped, setFlipped] = useState(
    new Array(flipCards.length).fill(false)
  );

  const toggleFlip = (idx) => {
    // Only toggle on mobile view
    if (window.innerWidth < 768) {
      setFlipped((prev) => {
        const copy = [...prev];
        copy[idx] = !copy[idx];
        return copy;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20  space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl text-center sm:text-4xl md:text-5xl font-bold text-blue-800 mb-16">
        <span className="bg-[#4b4d9c] bg-clip-text text-transparent">
        Your Investment Strategy
        </span>
      </h2>
        <p className="text-xl text-gray-600 -mt-10 ">
          Choose the best options tailored to your financial goals.
        </p>
      </div>

      <Triangledig />

      {/* Investment Types */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {investmentData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 border border-gray-200 hover:border-indigo-500"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
              {item.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="text-lg text-gray-700">{item.description}</p>
          </div>
        ))}
      </div> */}

      {/* Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  -mt-24 gap-10 justify-items-center">
  {flipCards.map((card, idx) => (
    <div
      key={idx}
      className={`flip-card cursor-pointer w-82 h-62 ${
        flipped[idx] ? "flipped" : ""
      }`}
      onClick={() => toggleFlip(idx)}
    >
      <div className="flip-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-front absolute inset-0 backface-hidden">
          <div
            className={`relative w-full h-full rounded-2xl p-[2px] bg-gradient-to-r ${card.borderColor}`}
          >
            <div
              className={`flex flex-col items-center justify-center w-full h-full rounded-2xl bg-gradient-to-br ${card.frontColor}`}
            >
              <div className="mb-3">{card.icon}</div>
              <h3
                className={`text-2xl font-semibold text-center ${
                  card.title === "Risk Management"
                    ? "text-green-700"
                    : card.title === "Return Optimization"
                    ? "text-yellow-700"
                    : card.title === "Goal Based Planning"
                    ? "text-blue-700"
                    : "text-blue"
                }`}
              >
                {card.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`flip-back absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.backColor} px-4 text-center backface-hidden`}
        >
          <p className="text-lg font-medium text-white">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>


      <TipsButton />

      {/* Flip Animation Styles */}
      <style>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        /* Hover effect only applies on desktop (>= md) */
        @media (min-width: 768px) {
          .flip-card:hover .flip-inner {
            transform: rotateY(180deg);
          }
        }
        .flip-card.flipped .flip-inner {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-front {
          transform: rotateY(0deg);
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Investment;
