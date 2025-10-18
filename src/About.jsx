import {
  TrendingUp,
  Shield,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import About from "./assets/about.png";

export default function AboutSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      {/* ==================== WHO WE ARE SECTION ==================== */}
      <motion.section
        className="max-w-7xl mx-auto px-6 md:px-12 py-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        {/* Text Block */}
        <motion.div className="flex flex-col justify-center order-1" variants={fadeUp}>
          {/* 1️⃣ Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#26215f] font-bold mb-6 text-center md:text-left">
            Empower Your Trading Journey
          </h1>

          {/* 2️⃣ Mobile Image (shows after heading, before paragraph) */}
          <motion.div
            className="block md:hidden mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={About}
              alt="About SIVVG"
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </motion.div>

          {/* 3️⃣ Paragraph */}
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-700 text-center md:text-left">
            At SIVVG, we empower traders with clear, reliable and data-driven intraday insights. Our journey began with a
            simple vision — to turn every effort into a path to success. Challenges strengthened our commitment and
            today we stand as a trusted partner for traders at every level.
          </p>
        </motion.div>

        {/* Desktop Image */}
        <motion.div
          className="hidden md:flex order-2 justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={About}
            alt="About SIVVG"
            className="rounded-lg shadow-lg w-full max-w-lg lg:max-w-xl object-cover"
          />
        </motion.div>
      </motion.section>

      {/* ==================== OUR PILLARS SECTION ==================== */}
      <motion.section
        className="bg-purple-50 py-16 px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Our Objective 
        </h2>
        <p className="text-center text-xl sm:text-2xl mb-10 text-gray-700">
          “Guided by Insight, Grounded in Integrity, Growing with Innovation.”
        </p>

        <div className="max-w-6xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-2xl leading-relaxed text-gray-700">
          At SIVVG, we aim to make trading smarter, simpler and more rewarding for every trader. 
          By combining innovation, strategy and real-time insights, we transform opportunities into lasting growth. 
          Our approach is built on trust, discipline and sustainable development, ensuring every trading decision is informed and confident. 
          Through continuous learning and intelligent guidance, we empower traders to achieve consistent progress and long-term success, making trading a journey of clarity, confidence and achievement.
          </p>
        </div>
      </motion.section>

      {/* ==================== OUR VALUES SECTION ==================== */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-16"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          viewport={{ once: true }}
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              icon: <TrendingUp className="text-purple-600 w-12 h-12" />,
              title: "Sustainable Growth",
              text: "Empowering long-term success through discipline, innovation and consistency.",
            },
            {
              icon: <Shield className="text-purple-600 w-12 h-12" />,
              title: "Assurance",
              text: "Smart risk awareness ensures stronger decisions and safer trading outcomes.",
            },
            {
              icon: <HeartHandshake className="text-purple-600 w-12 h-12" />,
              title: "Teamwork",
              text: "Through united efforts, we spark innovation and success — achieving more together.",
            },
            {
              icon: <ShieldCheck className="text-purple-600 w-12 h-12" />,
              title: "Integrity",
              text: "Honest and reliable insights you can trust — every signal, every session.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {item.icon}
              <div>
                <h4 className="font-semibold text-2xl mb-3">{item.title}</h4>
                <p className="text-lg text-gray-700">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== FUTURE / CTA SECTION ==================== */}
      <motion.section
        className="bg-[#6768c9] text-white py-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Join Us To Build Your Future
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg mb-8">
          Take the first step toward trading excellence with SIVVG today.
        </p>

        <a href="/Letstalk">
          <motion.button
            type="button"
            className="w-[200px] bg-white text-[#4B50A5] py-3 rounded-md font-semibold text-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.button>
        </a>
      </motion.section>
    </div>
  );
}
