import React from 'react';
import promo from '../assets/promo.png';
import { useNavigate } from 'react-router-dom';
import { ChartBar, TrendingUp, HandCoins } from 'lucide-react';
import { motion } from "framer-motion";
import MarketSection from './MarketSection';
import Investment from './Investment';

// Define the custom colors
const HEADING_COLOR = '#4b4d9c';
const PRIMARY_BUTTON_COLOR = '#4A51A3';

const services = [
  {
    title: "Market Analysis",
    description: "Comprehensive market analysis and insights to help you make informed trading decisions.",
    icon: <ChartBar className="h-10 w-10 text-amber-400" />, // Amber color
    gradient: "from-amber-500/80 to-amber-600/80",
    features: ["Real-time market data", "Technical Analysis", "Trend identification", "Risk assessment"],
  },
  {
    title: "Portfolio Management",
    description: "Professional management of your investment portfolio to optimize returns and minimize risks.",
    icon: <TrendingUp className="h-10 w-10 text-emerald-400" />, // Emerald color
    gradient: "from-emerald-500/80 to-emerald-600/80",
    features: ["Asset allocation", "Diversification strategies", "Regular rebalancing", "Understanding market movements"],
  },
  {
    title: "Capital Growth",
    description: "Track, understand and grow your capital with clarity and confidence.",
    icon: <HandCoins className="h-10 w-10 text-purple-400" />, // Purple color
    gradient: "from-purple-500/80 to-purple-600/80",
    features: ["Weekly P&L overview", "Tip-driven growth Awareness", "Clear Decision View", "Goal-focused Strategy"],
  },
];


const Assistance = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-16 flex flex-col items-center justify-center gap-8 p-6 md:p-12 bg-white text-gray-900">
      
      {/* Image */}
      <div className="w-full flex justify-center">
        <img
          src={promo}
          alt="Trading Dashboard"
          className="w-full max-w-5xl h-auto max-h-[600px] rounded shadow-lg mb-4 mt-6 object-cover"
        />
      </div>

      {/* Heading */}
      <div className="w-full text-center">
        <motion.h2
          className="w-full md:w-2/3 lg:w-1/2 mx-auto text-xl md:text-2xl lg:text-3xl font-bold px-4 text-center"
          style={{ color: HEADING_COLOR }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          “Step into the market with clarity, move forward with confidence and secure your financial future.” 
        </motion.h2>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-x-12 gap-y-10 w-full max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
          key={index}
          className={`w-full flex p-6 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-[1.02]
            ${index === 0
              ? "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white"
              : index === 1
              ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 text-white"
              : "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white"
            }`}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-left h-full w-full">
            {/* Icon Container */}
            <div className="mb-6 flex justify-center">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-white backdrop-blur-sm`}
              >
                {service.icon}
              </div>
            </div>
        
            {/* Card Title */}
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        
            {/* Description */}
            <p className="text-base mb-6 text-white/90">{service.description}</p>
        
            {/* Features */}
            <ul className="text-base space-y-2 inline-block text-left text-white/90">
              {service.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        ))}
      </div>

      {/* Explore More Button */}
      <motion.button
        className="mt-12 px-10 py-4 text-white text-xl font-semibold rounded-lg shadow-xl transition-all duration-300"
        style={{ backgroundColor: PRIMARY_BUTTON_COLOR }}
        onClick={() => navigate('/letstalk')}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 15px -3px rgba(74, 81, 163, 0.6)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Explore More
      </motion.button>

      <MarketSection />
      <Investment />
    </section>  
  );
};

export default Assistance;
