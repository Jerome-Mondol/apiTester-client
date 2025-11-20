import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
  { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
  { icon: <FaLinkedin />, url: "https://linkedin.com", label: "LinkedIn" }
];

export default function Footer() {
  return (
    <footer className="relative bg-black/95  text-white py-25 px-6 overflow-hidden">
      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div
        className="absolute top-0 left-1/23 w-48 h-48 md:w-72 md:h-72 bg-purple-600/10 rounded-full filter blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
      />
      <motion.div
        className="absolute top--10 right-1/5 w-64 h-64 md:w-80 md:h-80 bg-blue-400/10 rounded-full filter blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
      />
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Vector</h1>
          <p className="text-white/70 text-sm md:text-base max-w-xs text-center md:text-left">
            Sleek API Testing Platform. Build, test, and organize your requests with style.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          <a href="#how-it-works" className="text-white/70 hover:text-white transition">How It Works</a>
          <a href="#docs" className="text-white/70 hover:text-white transition">Docs</a>
          <a href="#pricing" className="text-white/70 hover:text-white transition">Pricing</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          {socials.map((social, i) => (
            <Tooltip.Provider key={i}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition text-xl"
                    whileHover={{ scale: 1.2 }}
                  >
                    {social.icon}
                  </motion.a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white/10 backdrop-blur-xl text-white px-3 py-1 rounded-md text-sm"
                    sideOffset={5}
                  >
                    {social.label}
                    <Tooltip.Arrow className="fill-white/10" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-12 text-center text-white/40 text-sm z-10 relative">
        &copy; {new Date().getFullYear()} Vector. All rights reserved.
      </p>
    </footer>
  );
}
