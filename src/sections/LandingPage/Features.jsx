import { CheckIcon, CodeIcon, ClockIcon, PersonIcon } from "@radix-ui/react-icons"; // ✅
import { motion } from "framer-motion";

const features = [
  {
    title: "Send Requests",
    desc: "GET, POST, PUT, PATCH, DELETE with ease.",
    icon: <CheckIcon className="w-6 h-6 text-white" />
  },
  {
    title: "Inspect Responses",
    desc: "View body, headers, and status of API responses.",
    icon: <CodeIcon className="w-6 h-6 text-white" />
  },
  {
    title: "Save History & Collections",
    desc: "Keep track of all your API requests and organize them.",
    icon: <ClockIcon className="w-6 h-6 text-white" />
  },
  {
    title: "User Accounts (Optional)",
    desc: "Optional authentication for personalized collections.",
    icon: <PersonIcon className="w-6 h-6 text-white" />
  }
];


export default function Features() {
  return (
    <section className="relative py-20 px-6 bg-black/90">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-white/70 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
