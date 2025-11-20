import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Configure Request",
    desc: "Enter API URL, select method, add headers, params, and body."
  },
  {
    number: "2",
    title: "Send & Inspect",
    desc: "Send the request and instantly view status, headers, and response body."
  },
  {
    number: "3",
    title: "Save & Organize",
    desc: "Save history and organize requests into collections."
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 px-6 bg-black/95 overflow-hidden z-30">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
        How It Works
      </h2>
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center text-center z-10"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
          >
            {/* Step circle */}
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
              {step.number}
            </div>

            {/* Step content */}
            <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-white/70 max-w-xs">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
