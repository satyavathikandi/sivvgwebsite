import React, { useState } from 'react';
import options from '../assets/options.png';
import { motion, AnimatePresence } from "framer-motion";

export default function MarketSection() {
  const [selected, setSelected] = useState('Equity');

  const content = {
    Equity: {
      title: 'Equity Intraday Recommendation',
      description: `At SIVVG, we offer expert-accurate intraday trading tips to help you navigate 
      the stock market with confidence and clarity. In our equity segment we spot real-time 
      opportunities by closely watching market trends and trading volumes. Each tip includes 
      clear entry, target and helping you trade with more confidence and lower risk.`,
    },
    //Derivatives: {
      //title: 'Derivatives Intraday Recommendation',
      //description: `For derivative traders, SIVVG delivers actionable intraday calls in futures and options, 
     // tailored to capitalize on market volatility and momentum. Our team closely monitors 
      //market trends, open interest and price action to generate timely F&O recommendations.
      // Whether you're experienced or beginner in trading, our derivative tips are structured
      //for both opportunity and risk management.`,
   // },
    Futures: {
      title: 'Futures Intraday Recommendation',
      description: `At SIVVG, we provide clear and reliable Futures trading tips to help you make informed decisions in a fast-moving market.
We analyze price action, market direction and trading activity to identify potential opportunities.
"Each tip comes with a clear target, giving you insight into the potential movement of the market.
With SIVVG, Futures trading becomes reliable, and focused on helping you achieve results.`,
    },
     Options: {
      title: 'Options Intraday Recommendation',
      description: `At SIVVG, we provide accurate Options trading tips designed to deliver the best results.
Our experts monitor option prices and key data to identify potential opportunities.
Each tip provides a target, helping you plan your trades with confidence.
Trade smart and stay empowered with SIVVG’s practical Options strategies.`,
    },
//     Options: {
//       title: 'Options Intraday Recommendation',
//       description:`Options trading gives you the right but not the obligation to buy or sell an asset at a specific
//        price within a set time.This effective solution offers traders flexibility to manage risk, speculate or enhance portfolio 
//        strategies.Whether you want to buy calls or puts or hedge your investments our advanced features make it easy to 
//  and execute your plan.Leverage market movements while controlling your risk with clear margin requirements 
//  and risk management functions.Our professional guidance helps beginners understand options basics.Trade options 
//  confidently with SIVVG — where technology meets smart decision-making.`,
//     },
  };

  return (
    <section className="p-4 md:p-12 bg-white text-center">
      <h2 className="text-2xl text-center sm:text-4xl md:text-4xl font-bold text-blue-800 mb-16 mt-10">
        <span className="bg-[#4b4d9c] bg-clip-text text-transparent">
          Explore Our Market Recommendation
        </span>
      </h2>

      {/* Top Icons Row */}
      <div className="flex flex-col md:flex-row items-center text-justify justify-center gap-6 md:gap-22 border p-4 rounded-xl shadow-md max-w-3xl mx-auto border-purple-500">


        {/* Equity */}
        <div
          onClick={() => setSelected('Equity')}
          className={`flex items-center cursor-pointer space-x-3 md:space-x-4 transform transition duration-300 ease-in-out hover:scale-105 hover:text-purple-900 ${selected === 'Equity' ? 'text-green-800' : 'text-purple-600'
            }`}
        >
          <img
            src="https://img.icons8.com/emoji/48/000000/money-bag-emoji.png"
            alt="Equity"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <p className="text-lg md:text-2xl font-semibold">Equity</p>
        </div>

        {/* Futures */}
        <div
          onClick={() => setSelected('Futures')}
          className={`flex items-center cursor-pointer space-x-3 md:space-x-4 transform transition duration-300 ease-in-out hover:scale-105 hover:text-purple-900 ${selected === 'Futures' ? 'text-green-800' : 'text-purple-600'
            }`}
        >
          <img
            src="https://img.icons8.com/color/48/000000/futures.png"
            alt="Futures"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <p className="text-lg md:text-2xl font-semibold">Futures</p>
        </div>

        {/* Options */}
         <div
          onClick={() => setSelected('Options')}
          className={`flex items-center cursor-pointer space-x-3 md:space-x-4 transform transition duration-300 ease-in-out hover:scale-105 hover:text-purple-900 ${selected === 'Options' ? 'text-green-800' : 'text-purple-600'
            }`}
        >
          <img
            src={options}
            alt="Options"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <p className="text-lg md:text-2xl font-semibold">Options</p>
        </div> 
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-10 text-xl md:text-3xl font-bold text-purple-600">
            {content[selected].title}
          </h2>
          <p className="mt-4 mx-auto text-base md:text-2xl text-gray-900 max-w-7xl whitespace-pre-line">
            {content[selected].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}