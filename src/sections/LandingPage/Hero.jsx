import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mt-10 relative flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      
      {/* Background subtle orbs */}
      <motion.div
        className="absolute top-10 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-purple-600/10 rounded-full filter blur-3xl animate-slowSpin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 md:right-1/3 w-64 h-64 md:w-80 md:h-80 bg-blue-400/10 rounded-full filter blur-3xl animate-slowSpin"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />

      {/* Floating lines/accents */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[1px] md:w-[2px] h-16 md:h-24 bg-purple-400/10 rounded-full"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-[1px] md:w-[2px] h-24 md:h-32 bg-blue-400/10 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* Main content */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md mb-4">
        Vector
      </h1>
      <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl mb-8">
        Sleek API Testing, Simplified. Send requests, inspect responses, and manage your collections with ease.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button className="bg-white/10 text-white px-6 py-3 rounded-xl border border-white/20 backdrop-blur-xl hover:bg-white/20 transition">
          Get Started
        </button>
        <button className="bg-white/5 text-white px-6 py-3 rounded-xl border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
          Docs
        </button>
      </div>

      {/* App Mockup / Illustration */}
      <motion.div
        className="w-full max-w-md sm:max-w-2xl md:max-w-4xl h-64 sm:h-80 md:h-96 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* App screenshot placeholder */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 w-5 h-10 md:w-6 md:h-12 border-2 border-white/30 rounded-full flex items-start justify-center px-1"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full mt-1" />
      </motion.div>
    </section>
  );
}
