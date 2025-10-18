import React, { useEffect, useState } from "react";
import { Shield, TrendingUp, Droplets, X } from "lucide-react";

const Investment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const descriptions = {
    liquidity: {
      title: "Liquidity",
      content:
        "Grow your wealth over time by investing in the stock market.",
    },
    returns: {
      title: "Returns",
      content:
        "Diversify your investments through expert guidance.",
    },
    safety: {
      title: "Safety",
      content:
        "Enjoy stable and secure returns with fixed interest rates.",
    },
  };

  const handleClick = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-1 md:py-12 -mt-68 md:-mt-30">


      <div className="max-w-4xl w-full">

        {/* ========================= DESKTOP VIEW ========================= */}
        <div className="hidden md:block relative" style={{ paddingBottom: "66%" }}>
          {/* SVG Triangle lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="50%"
              y1="20%"
              x2="20%"
              y2="85%"
              stroke="#9CA3AF"
              strokeWidth="3"
              strokeDasharray="10,10"
            />
            <line
              x1="50%"
              y1="20%"
              x2="80%"
              y2="85%"
              stroke="#9CA3AF"
              strokeWidth="3"
              strokeDasharray="10,10"
            />
            <line
              x1="20%"
              y1="85%"
              x2="80%"
              y2="85%"
              stroke="#9CA3AF"
              strokeWidth="3"
              strokeDasharray="10,10"
            />
          </svg>

          {/* === LIQUIDITY (Top Center) === */}
          <div
            className={`absolute top-[10%] left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="mb-4 text-3xl font-bold text-gray-900">Liquidity</div>
            <div
              className="relative group cursor-pointer"
              onClick={() => handleClick("liquidity")}
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div
                className={`relative bg-white rounded-full p-8 shadow-2xl transition-all duration-500 ${
                  activePanel === "liquidity"
                    ? "scale-110 ring-4 ring-blue-300"
                    : "hover:scale-110"
                }`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Droplets className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {activePanel === "liquidity" && (
              <div className="absolute top-0 left-full ml-6 w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-blue-500 animate-slideInRight">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-blue-600">
                    {descriptions.liquidity.title}
                  </h3>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700">{descriptions.liquidity.content}</p>
              </div>
            )}
          </div>

          {/* === SAFETY (Bottom Left) === */}
          <div
            className={`absolute bottom-[5%] left-[12%] flex flex-col items-center transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 -translate-x-10"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => handleClick("safety")}
            >
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div
                className={`relative bg-white rounded-full p-8 shadow-2xl transition-all duration-500 ${
                  activePanel === "safety"
                    ? "scale-110 ring-4 ring-emerald-300"
                    : "hover:scale-110"
                }`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-gray-900">Safety</div>

            {activePanel === "safety" && (
              <div className="absolute top-0 right-full mr-6 w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-emerald-500 animate-slideInLeft">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-emerald-600">
                    {descriptions.safety.title}
                  </h3>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700">{descriptions.safety.content}</p>
              </div>
            )}
          </div>

          {/* === RETURNS (Bottom Right) === */}
          <div
            className={`absolute bottom-[5%] right-[12%] flex flex-col items-center transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-x-10"
            }`}
          >
            <div
              className="relative group cursor-pointer"
              onClick={() => handleClick("returns")}
            >
              <div className="absolute inset-0 bg-slate-400 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div
                className={`relative bg-white rounded-full p-8 shadow-2xl transition-all duration-500 ${
                  activePanel === "returns"
                    ? "scale-110 ring-4 ring-slate-300"
                    : "hover:scale-110"
                }`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-3xl font-bold text-gray-900">Returns</div>

            {activePanel === "returns" && (
              <div className="absolute  top-0 left-full ml-6 w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-slate-700 animate-slideInRight">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-slate-700">
                    {descriptions.returns.title}
                  </h3>
                  <button
                    onClick={() => setActivePanel(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-700">{descriptions.returns.content}</p>
              </div>
            )}
          </div>
        </div>

        {/* ========================= MOBILE VIEW ========================= */}
        <div className="block md:hidden relative" style={{ paddingBottom: "100%" }}>
          {/* Triangle lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="50%"
              y1="10%"
              x2="15%"
              y2="80%"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
            <line
              x1="50%"
              y1="10%"
              x2="85%"
              y2="80%"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
            <line
              x1="15%"
              y1="80%"
              x2="85%"
              y2="80%"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="6,6"
            />
          </svg>

          {/* Circles positioned for mobile */}
          <div className="absolute top[20%] -mt-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="text-xl font-semibold text-gray-900 mb-2">
              Liquidity
            </div>
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => handleClick("liquidity")}
            >
              <Droplets className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="absolute bottom-[5%] left-[10%] flex flex-col items-center">
            <div
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => handleClick("safety")}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-semibold text-gray-900 mt-2">
              Safety
            </div>
          </div>

          <div className="absolute bottom-[5%] right-[10%] flex flex-col items-center">
            <div
              className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => handleClick("returns")}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-semibold text-gray-900 mt-2">
              Returns
            </div>
          </div>

          {/* Description at the bottom */}
          {activePanel && (
  <div
    className={`absolute -bottom-30 left-1/2 transform -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-xl p-4 animate-slideInUp
      ${
        activePanel === "liquidity"
          ? "border-t-4 border-blue-500"
          : activePanel === "safety"
          ? "border-t-4 border-emerald-500"
          : "border-t-4 border-slate-700"
      }`}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-bold text-gray-800">
        {descriptions[activePanel].title}
      </h3>
      <button
        onClick={() => setActivePanel(null)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <p className="text-gray-700 text-sm">
      {descriptions[activePanel].content}
    </p>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Investment;
