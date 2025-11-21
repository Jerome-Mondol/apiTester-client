import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      console.log("Logged in!");
      toast.success("Logged in successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        className="absolute top-10 left-1/6 w-48 h-48 md:w-72 md:h-72 bg-purple-600/10 rounded-full filter blur-3xl animate-slowSpin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-100 right-1/2 md:right-1/3 w-64 h-64 md:w-80 md:h-80 bg-blue-400/10 rounded-full filter blur-3xl animate-slowSpin"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      />

      {/* Floating lines */}
      

      {/* Login Card */}
      <motion.div
        className="relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6 shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-white/70 text-sm md:text-base text-center mb-4">
          Sign in to continue to Vector
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center -mt-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            required
          />

          {/* Button with spinner */}
          <button
            type="submit"
            className="relative bg-white/10 text-white py-3 rounded-xl border border-white/20 backdrop-blur-xl hover:bg-white/20 transition font-semibold flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            Log In
          </button>

          <div className="flex justify-between text-white/50 text-sm mt-2">
            <a href="#" className="hover:text-white/80 transition">Forgot password?</a>
            <Link to={'/sign-up'} ><span className="hover:text-white/80 transition">Sign Up</span></Link>
          </div>
        </form>
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
