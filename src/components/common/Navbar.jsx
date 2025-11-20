import { Link } from "react-router";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navElements = [
    { tag: "Home", path: "/" },
    { tag: "Docs", path: "/docs" },
    { tag: "Github", path: "/github" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-5">
      <nav
        className="
          mx-auto max-w-7xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl
          px-6 py-3 mt-4
          flex items-center justify-between
          shadow-[0_0_25px_-10px_rgba(0,0,0,0.7)]
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-white"></div>
          <span className="text-white font-semibold tracking-wide text-lg">
            Vector
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navElements.map(({ tag, path }, i) => (
            <Link key={i} to={path}>
              <span className="text-white/70 hover:text-white transition">
                {tag}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA - Desktop */}
        <div className="hidden md:block">
          <button
            className="
              bg-white/10 text-white 
              px-4 py-1.5 rounded-xl 
              border border-white/20 
              hover:bg-white/20 
              transition
            "
          >
            Join Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <Cross2Icon width={24} height={24} /> : <HamburgerMenuIcon width={24} height={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            md:hidden
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            mt-2 mx-4 p-4
            animate-fadeIn
          "
        >
          <div className="flex flex-col gap-4">
            {navElements.map(({ tag, path }, i) => (
              <Link key={i} to={path} onClick={() => setOpen(false)}>
                <span className="text-white/80 text-lg">{tag}</span>
              </Link>
            ))}

            <button
              className="
                bg-white/10 text-white 
                px-4 py-2 rounded-xl 
                border border-white/20 
                hover:bg-white/20 
                transition
              "
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
