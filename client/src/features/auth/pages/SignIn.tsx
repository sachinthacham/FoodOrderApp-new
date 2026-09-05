import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowLeft } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      
      {/* Left Pane - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1920&auto=format&fit=crop" 
            alt="Delicious food spread" 
            className="object-cover w-full h-full opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
          </div>
          
          <div className="w-full max-w-lg mb-12 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Welcome back to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Premium Dining.</span>
            </h1>
            <p className="text-lg text-slate-300 font-light">
              "The finest food delivery experience I've ever had. Blazing fast and exquisitely curated."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden border-2 border-slate-700">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop" alt="User" />
              </div>
              <div>
                <p className="text-white font-semibold">Sarah Jenkins</p>
                <p className="text-sm text-slate-400">Food Critic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl rounded-tl-none"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md relative z-10">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sign In
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
              Enter your email and password to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 glass-card border-red-500/20 bg-red-50/50 dark:bg-red-900/10 rounded-xl flex items-start gap-3 text-red-600 animate-shake">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 group">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pb-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#" className="text-sm text-red-500 hover:text-red-600 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">{isLoading ? "Authenticating..." : "Sign In"}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:text-red-600 font-bold transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
