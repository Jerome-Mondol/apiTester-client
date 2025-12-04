import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const { signup, user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const fullName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await signup(email, password, fullName);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* BG Orbs & floating lines... same as before */}

      <motion.div
        className="relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col gap-6 shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-white/70 text-sm md:text-base text-center mb-4">
          Sign up to start using Vector
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center -mt-4">{error}</p>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="bg-white/5 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
            required
          />

          {/* Button with spinner */}
          <button
            type="submit"
            className="relative bg-white/10 text-white py-3 rounded-xl border border-white/20 backdrop-blur-xl hover:bg-white/20 transition font-semibold flex justify-center items-center gap-2"
            disabled={loading} // disable while loading
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
            Sign Up
          </button>

          <div className="flex justify-center text-white/50 text-sm mt-2">
            Already have an account?
            <Link to={'/login'} ><span className="ml-1 hover:text-white/80 transition font-medium">
              Log In
            </span></Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
